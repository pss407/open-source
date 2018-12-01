"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const https = require("https");
const mkdirp = require("mkdirp");
const path = require("path");
const tmp = require("tmp");
const url_1 = require("url");
const yauzl = require("yauzl");
const util = require("./common");
const packages_1 = require("./packages");
const proxy_1 = require("./proxy");
class PackageManager {
    constructor(platformInfo, packageJSON) {
        this.platformInfo = platformInfo;
        this.packageJSON = packageJSON;
        // Ensure our temp files get cleaned up in case of error.
        tmp.setGracefulCleanup();
    }
    DownloadPackages(logger, status, proxy, strictSSL) {
        return this.GetPackages()
            .then((packages) => {
            return util.buildPromiseChain(packages, (pkg) => maybeDownloadPackage(pkg, logger, status, proxy, strictSSL));
        });
    }
    InstallPackages(logger, status) {
        return this.GetPackages()
            .then((packages) => {
            return util.buildPromiseChain(packages, (pkg) => installPackage(pkg, logger, status));
        });
    }
    GetAllPackages() {
        return new Promise((resolve, reject) => {
            if (this.allPackages) {
                resolve(this.allPackages);
            }
            else if (this.packageJSON.runtimeDependencies) {
                this.allPackages = this.packageJSON.runtimeDependencies;
                // Convert relative binary paths to absolute
                for (const pkg of this.allPackages) {
                    if (pkg.binaries) {
                        pkg.binaries = pkg.binaries.map((value) => path.resolve(getBaseInstallPath(pkg), value));
                    }
                }
                resolve(this.allPackages);
            }
            else {
                reject(new packages_1.PackageError("Package manifest does not exist."));
            }
        });
    }
    GetPackages() {
        return this.GetAllPackages()
            .then((list) => {
            return list.filter((pkg) => {
                if (pkg.architectures && pkg.architectures.indexOf(this.platformInfo.architecture) === -1) {
                    return false;
                }
                if (pkg.platforms && pkg.platforms.indexOf(this.platformInfo.platform) === -1) {
                    return false;
                }
                return true;
            });
        });
    }
}
exports.PackageManager = PackageManager;
function getBaseInstallPath(pkg) {
    let basePath = util.getExtensionPath();
    if (pkg.installPath) {
        basePath = path.join(basePath, pkg.installPath);
    }
    return basePath;
}
function getNoopStatus() {
    return {
        setDetail: (text) => { },
        setMessage: (text) => { },
    };
}
function maybeDownloadPackage(pkg, logger, status, proxy, strictSSL) {
    return doesPackageTestPathExist(pkg).then((exists) => {
        if (!exists) {
            return downloadPackage(pkg, logger, status, proxy, strictSSL);
        }
        else {
            logger.appendLine(`Skipping package "${pkg.description}" (already downloaded).`);
        }
    });
}
function downloadPackage(pkg, logger, status, proxy, strictSSL) {
    status = status || getNoopStatus();
    logger.append(`Downloading package "${pkg.description}" `);
    status.setMessage("$(cloud-download) Downloading packages");
    status.setDetail(`Downloading package "${pkg.description}"...`);
    return new Promise((resolve, reject) => {
        tmp.file({ prefix: "package-" }, (err, filePath, fd, cleanupCallback) => {
            if (err) {
                return reject(new packages_1.PackageError("Error from tmp.file", pkg, err));
            }
            resolve({ name: filePath, fd, removeCallback: cleanupCallback });
        });
    }).then((tmpResult) => {
        pkg.tmpFile = tmpResult;
        let result = downloadFile(pkg.url, pkg, logger, status, proxy, strictSSL)
            .then(() => logger.appendLine(" Done!"));
        // If the package has a fallback Url, and downloading from the primary Url failed, try again from
        // the fallback. This is used for debugger packages as some users have had issues downloading from
        // the CDN link.
        if (pkg.fallbackUrl) {
            result = result.catch((primaryUrlError) => {
                logger.append(`\tRetrying from "${pkg.fallbackUrl}" `);
                return downloadFile(pkg.fallbackUrl, pkg, logger, status, proxy, strictSSL)
                    .then(() => logger.appendLine(" Done!"))
                    .catch(() => primaryUrlError);
            });
        }
        return result;
    });
}
function downloadFile(urlString, pkg, logger, status, proxy, strictSSL) {
    const url = url_1.parse(urlString);
    const options = {
        agent: proxy_1.getProxyAgent(url, proxy, strictSSL),
        host: url.host,
        path: url.path,
        rejectUnauthorized: util.isBoolean(strictSSL) ? strictSSL : true,
    };
    return new Promise((resolve, reject) => {
        if (!pkg.tmpFile || pkg.tmpFile.fd === 0) {
            return reject(new packages_1.PackageError("Temporary package file unavailable", pkg));
        }
        const request = https.request(options, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                // Redirect - download from new location
                return resolve(downloadFile(response.headers.location, pkg, logger, status, proxy, strictSSL));
            }
            if (response.statusCode !== 200) {
                // Download failed - print error message
                logger.appendLine(`failed (error code "${response.statusCode}")`);
                return reject(new packages_1.PackageError(response.statusCode.toString(), pkg));
            }
            // Downloading - hook up events
            const packageSize = parseInt(response.headers["content-length"], 10);
            let downloadedBytes = 0;
            let downloadPercentage = 0;
            let dots = 0;
            const tmpFile = fs.createWriteStream(null, { fd: pkg.tmpFile.fd });
            logger.append(`(${Math.ceil(packageSize / 1024)} KB) `);
            response.on("data", (data) => {
                downloadedBytes += data.length;
                // Update status bar item with percentage
                const newPercentage = Math.ceil(100 * (downloadedBytes / packageSize));
                if (newPercentage !== downloadPercentage) {
                    status.setDetail(`Downloading package "${pkg.description}"... ${downloadPercentage}%`);
                    downloadPercentage = newPercentage;
                }
                // Update dots after package name in output console
                const newDots = Math.ceil(downloadPercentage / 5);
                if (newDots > dots) {
                    logger.append(".".repeat(newDots - dots));
                    dots = newDots;
                }
            });
            response.on("end", () => {
                resolve();
            });
            response.on("error", (err) => {
                reject(new packages_1.PackageError(`Reponse error: ${err.message || "NONE"}`, pkg, err));
            });
            // Begin piping data from the response to the package file
            response.pipe(tmpFile, { end: false });
        });
        request.on("error", (err) => {
            reject(new packages_1.PackageError(`Request error: ${err.message || "NONE"}`, pkg, err));
        });
        // Execute the request
        request.end();
    });
}
function installPackage(pkg, logger, status) {
    if (!pkg.tmpFile) {
        // Download of this package was skipped, so there is nothing to install
        return Promise.resolve();
    }
    status = status || getNoopStatus();
    logger.appendLine(`Installing package "${pkg.description}"`);
    status.setMessage("$(desktop-download) Installing packages...");
    status.setDetail(`Installing package "${pkg.description}"`);
    return new Promise((resolve, baseReject) => {
        const reject = (err) => {
            // If anything goes wrong with unzip, make sure we delete the test path (if there is one)
            // so we will retry again later
            const testPath = getPackageTestPath(pkg);
            if (testPath) {
                fs.unlink(testPath, (unlinkErr) => {
                    baseReject(err);
                });
            }
            else {
                baseReject(err);
            }
        };
        if (pkg.tmpFile.fd === 0) {
            return reject(new packages_1.PackageError("Downloaded file unavailable", pkg));
        }
        yauzl.fromFd(pkg.tmpFile.fd, { lazyEntries: true }, (err, zipFile) => {
            if (err) {
                return reject(new packages_1.PackageError("Immediate zip file error", pkg, err));
            }
            zipFile.readEntry();
            zipFile.on("entry", (entry) => {
                const absoluteEntryPath = path.resolve(getBaseInstallPath(pkg), entry.fileName);
                if (entry.fileName.endsWith("/")) {
                    // Directory - create it
                    mkdirp(absoluteEntryPath, { mode: 0o775 }, (error) => {
                        if (error) {
                            return reject(new packages_1.PackageError("Error creating directory for zip directory entry:" + error.code || "", pkg, error));
                        }
                        zipFile.readEntry();
                    });
                }
                else {
                    // File - extract it
                    zipFile.openReadStream(entry, (error, readStream) => {
                        if (error) {
                            return reject(new packages_1.PackageError("Error reading zip stream", pkg, error));
                        }
                        mkdirp(path.dirname(absoluteEntryPath), { mode: 0o775 }, (mkdirpError) => {
                            if (mkdirpError) {
                                return reject(new packages_1.PackageError("Error creating directory for zip file entry", pkg, mkdirpError));
                            }
                            // Make sure executable files have correct permissions when extracted
                            const fileMode = pkg.binaries && pkg.binaries.indexOf(absoluteEntryPath) !== -1
                                ? 0o755
                                : 0o664;
                            readStream.pipe(fs.createWriteStream(absoluteEntryPath, { mode: fileMode }));
                            readStream.on("end", () => zipFile.readEntry());
                        });
                    });
                }
            });
            zipFile.on("end", () => {
                resolve();
            });
            zipFile.on("error", (error) => {
                reject(new packages_1.PackageError("Zip File Error:" + error.code || "", pkg, error));
            });
        });
    }).then(() => {
        // Clean up temp file
        pkg.tmpFile.removeCallback();
    });
}
function doesPackageTestPathExist(pkg) {
    const testPath = getPackageTestPath(pkg);
    if (testPath) {
        return util.fileExists(testPath);
    }
    else {
        return Promise.resolve(false);
    }
}
function getPackageTestPath(pkg) {
    if (pkg.installTestPath) {
        return path.join(util.getExtensionPath(), pkg.installTestPath);
    }
    else {
        return null;
    }
}
//# sourceMappingURL=packageManager.js.map