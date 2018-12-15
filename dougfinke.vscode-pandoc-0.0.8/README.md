# vscode-pandoc

The vscode-pandoc [Visual Studio Code](https://code.visualstudio.com/) extension lets you quickly render markdown files as a `word document` file.

## Prerequisites

You need to [**install Pandoc**](http://pandoc.org/installing.html) - a universal document converter.

## Usage

Two ways to run the extension. You need to have a markdown file open.

1. press `F1` on Windows (`shift+cmd+P` on Mac), type `pandoc`, press `Enter`
1. Or - press the key chord `ctrl+K` then `P` (`cmd+K` then `P` on Mac)

Then choose from the list what document type you want to render and press `enter` (you can also type in the box rather than cursor around).

[Enlarged version of the video](https://raw.githubusercontent.com/dfinke/vscode-pandoc/master/images/vscodePandoc.gif).

![](https://raw.githubusercontent.com/dfinke/vscode-pandoc/master/images/vscodePandoc.gif)

## Releases

* July 9, 2016
  * Update package.json and launch.json
  * Add PR #11
  * Add output of the error (use OutputChannel and showErrorMessage)

* January 17, 2016
  * Set pandoc options for document types

* January 16, 2016
  * Handling of the path that contains spaces
  * Add the open command (xdg-open) in linux

## **Setting additional pandoc options**

1. choose 'Preference -> UserSettings'
1. Find: pandoc in Default Settings
1. Copy and paste
1. to settings.json

example:

```json
//-------- Pandoc Option Configuration --------


// pandoc .docx output option template that you would like to use
"pandoc.docxOptString": ""

```

* if necessary to set options for each output format.
  * default: `$ pandoc inFile.md -o outFile.{word}`

## Example: Setting for Japanese document

* Word(docx)

  `pandoc.docxOptString": "",`
  * It will work even if you do not set the options.


For more information please refer to the [Pandoc User's Guide](http://pandoc.org/README.html).