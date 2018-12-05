# 4조 Project
<H3>1. 프로젝트 이름</H3>
- <H5>Visual Studio Code를 이용한 Markdown 편집기</H5>

![Alt Text](https://user-images.githubusercontent.com/45596085/49505684-a37b2a00-f8bf-11e8-96cb-032df145166d.PNG)


## <H3>2. 팀멤버 및 각 역할</H3>
|이름  |역할  |
|---------|---------|
|김창희   |오픈소스 코드 기능 변경 및 개선, README 파일 제작|
|박승세   |오픈소스 코드 기능 변경 및 개선, README 파일 제작|
|정소희   |아이디어 제공, 자료조사, ppt및 README 파일 제작|
|서동훈   |아이디어 제공, 자료조사, README 파일 제작 

## <H3>3. 개발 동기 및 과정</H3>

## <H3>4. 프로젝트 내용</H3>

### <H4>기존 Markdown의 불편함</H4>

    1. Preview기능
    - git에서 Markdwon작성시 Preview 창을 보고 다시 Write 창을 봐야하는 불편함이 존재하며, commit시에
      실제 git에 나타나는 형식이 다르게 표현되는 불편함이 존재한다.
      
![Alt Text](https://user-images.githubusercontent.com/45596085/49508068-2783e080-f8c5-11e8-9e56-30fb8a2b4245.PNG)

    2. Markdown문법의 어려움
    - Markdown을 사용하다 보면 image, video삽입 등 문법의 어려움이 존재하여 구글을 통해 찾아야하는 
      불편함이 존재한다.
    
![Alt Text](https://user-images.githubusercontent.com/45596085/49508159-5d28c980-f8c5-11e8-98c5-0e6dde5a4fb9.PNG)

### <H4>기능 설명</H4>

    1. Preview
    - Vscode에서 현재 자신이 작성하고 있는 Markdown의 변경 내용을 별도의 처리 없이 Preview를 통해 
      실시간으로 확인 가능
     
    - Markdown preview 지원으로 github와 동일하게 작동하여 편리하게 사용 가능

    2. Word 기능 추가
    - Word의 글꼴 편집, table 삽입 등의 기능 추가로 문서의 스타일을 편집하는 기능을 지원

    3. 기능 설명 한글화
    - 기존의 영어로 되어있던 함수 설명, 기능 설명 등을 한글화하여, 평소 영어 해석에 어려움을 느꼈던 
      사용자도 손쉽게 기능 이해
    
    4. 문법 간소화
    - 기존 Markdown의 문법을 간소화 시킴으로써 Markdown의 문법을 몰라도 최소한 학습으로 사용 가능
    
    5. Word 저장기능
    - 작성한 Markdown을 Preview에서 보여지는 그대로 간편하게 Word로 저장 가능
    
### <H4>기대 효과</H4>

    1. Markdown 작성에 대한 실시간 동기화를 통해 개발자의 Markdown사용 편리함을 극대화
    
    2. Markdown 입문 개발자들이 겪는 Markdown 문법의 어려움을 최소화, Word 기능을 추가해 
       간편하게 문서의 스타일 편집 가능
    
    3. Mac OS의 Markdown 편집기 유료화에 대한 문제점 해소
    
    4. Preview를 보기 위해 Github에 접속할 필요가 없어서 별도의 네트워크 연결이 없이도 작성 후 문서화 가능
    
### <H4>오픈소스 사용하는 법</H5>

    1. docs기능 사용법
    - Docs Markdown에 접그한기 위해 type `ALT+M` 입력. 
    
    - 원하는 기능을 선택하기 위해 클릭하거나 위쪽/아래쪽 화살표를 사용하여 필터링을 시작한 다음,
      메뉴에서 원하는 기능이 강조 표시되면 'ENTER'를 누르십시오.
    - DOCS 오픈소스 제공되는 기능은 아래와 같습니다.
|Function     |Command             |Description           |
|-------------|--------------------|----------------------|
|굵게쓰기         |`formatBold`        |Formats text **bold**.|
|기울임체       |`formatItalic`      |Formats text *italic*.|
|블록화         |`formatCode`        |If one line or less is selected, formats text as `inline code`.<br><br>If multiple lines are selected, formats them as a fenced code block, and allows you to optionally select a programming language supported by OPS.<br><br>If no language is selected, inserts an empty fenced code block.|
|알림기능        |`insertAlert`       |Inserts a Note, Important, Warning, or Tip.<br><br>Select Alert from the menu, then select the alert type. If you have previously selected text, it will be surrounded with the selected alert syntax. If no text is selected, a new alert will be added with placeholder text.|
|번호 목록|`insertNumberedList` |Inserts a new numbered list.<br><br> If multiple lines are selected, each will be a list item. Note that numbered lists show in the Markdown as all 1s, but will render on docs.microsoft.com as sequential numbers or, for nested lists, letters. To create a nested numbered list, tab from within the parent list.|
|점 목록|`insertBulletedList` |Inserts a new bulleted list.|
|테이블        |`insertTable`        |Inserts a Markdown table structure.<br><br>After you select the table command, specify the number of columns and rows in the format columns:rows, such as 3:4. Note that the maximum number of columns you can specify via this extension is 5, which is the recommended maximum for readability.|
|저장소 파일과 연결         |`selectLinkType`      |Inserts a link. When you select this command, the following sub-menu appears.<br><br>`External`: Link to a web page by URI. Must include "http" or "https".<br>`Internal`: Insert a relative link to another file in the same repo. After selecting this option, type in the command window to filter files by name, then select the file you want. <br>`Bookmark in this file`: Choose from a list of headings in the current file to insert a properly formatted bookmark.<br>`Bookmark in another file`: First, filter by file name and select the file to link to, then choose the appropriate heading within the selected file.|
|이미지 삽입        |`insertImage`     |Type alternate text (required for accessibility) and select it, then call this command to filter the list of supported image files in the repo and select the one you want. If you haven't selected alt text when you call this command, you will be prompted for it before you can select an image file.|
|파일 포함시키기      |`insertInclude`   |Find a file to embed in the current file.|
|스니펫      |`insertSnippet`   |Find a code snippet in the repo to embed in the current file.|
|비디오 삽입        |`insertVideo`     |Add an embedded video.|
|미리보기      |`previewTopic`    |Preview the active topic in a side-by-side window using the DocFX extension.  If the DocFX extension is not installed or is installed but disabled, the topic will not render.


    2. Preview기능 사용법
    - 파일 형식 .md로 지정
    
    - 다음 그림 파일에 표시되는 아이콘 클릭
![Alt Text](https://user-images.githubusercontent.com/45596085/49510480-b4ca3380-f8cb-11e8-817c-06be42bf5ddb.PNG)
    
    3. Word기능 저장 사용법
        1.마크다운 파일이 열려있어야 하며, 기능을 돌리는 방법을 아래 두가지가 존재합니다.
        2.`F1` 윈도우에서 입력(`shift+cmd+P` Mac에서 입력), `pandoc`입력 후 + `Enter'
        3. 또는 -`ctrl+K` then `P` 입력(맥에서는 `cmd+K` 입력 후 `P` 입력)

### <H4>오픈소스 사용시 팁</H4>

> The <kbd>cmd</kbd> key for _Windows_ is <kbd>ctrl</kbd>.

| Shortcuts                                   | Functionality              |
| ------------------------------------------- | -------------------------- |
| <kbd>cmd-k v</kbd>                          | Open preview               |
| <kbd>ctrl-shift-s</kbd>                     | Sync preview / Sync source |
| <kbd>shift-enter</kbd>                      | Run Code Chunk             |
| <kbd>ctrl-shift-enter</kbd>                 | Run all Code Chunks        |
| <kbd>cmd-=</kbd> or <kbd>cmd-shift-=</kbd>  | Preview zoom in            |
| <kbd>cmd--</kbd> or <kbd>cmd-shift-\_</kbd> | Preview zoom out           |
| <kbd>cmd-0</kbd>                            | Preview reset zoom         |
| <kbd>esc</kbd>                              | Toggle sidebar TOC         |

### <H4>기존 오픈소스에 issue 제안</H4>
    
    1. Microsoft/vscode-docs-authoring 기존 오프소스 에러에 pont의 크기 조절 기능 제시
    
![Alt Text](https://user-images.githubusercontent.com/45596085/49508577-69615680-f8c6-11e8-9f52-b238579ffa16.PNG)

    2. dfinke/vscode-pandoc 기존 오픈소스 사용시 에러 발생 및 원인 제시
    
![Alt Text](https://user-images.githubusercontent.com/45596085/49508719-c52bdf80-f8c6-11e8-92f3-5e72567accdd.PNG)

    3. shd101wyy/vscode-markdown-preview-enhanced 기존 오픈소스에 DOCS기능 추가 제시

![Alt Text](https://user-images.githubusercontent.com/45596085/49508835-15a33d00-f8c7-11e8-9ab9-93cc3a0521a1.PNG)

## <H3>5. 실행 예시
1. preview를 통해 번호매기기, 테이블생성하기, 사진 추가하기
![Alt Text](https://user-images.githubusercontent.com/45034295/49389212-1625c180-f769-11e8-9e55-56cff083089d.gif)

2. docx 파일로 변환
<img src = "https://i.imgur.com/nXCgSs3.mp4">

## <H3>6. 사용되는 Github 오픈소스 SW 목록</H3>
- Microsoft/vscode-docs-authoring: https://github.com/Microsoft/vscode-docs-authoring
- shd101wyy/vscode-markdown-preview-enhanced: https://github.com/shd101wyy/vscode-markdown-preview-enhanced
- dfinke/vscode-pandoc: https://github.com/dfinke/vscode-pandoc

## <H3>7. 이 작업 이후, 추가적으로 진행되면 좋을 작업들</H3>
- android, ios 앱 
- 가장 표준화된 markdown 문법 확보 후 tutorial 서버지원
- H 및 #에 따른 숫자 크기 변환을 자율조절 가능하게 지원
- Visual Studio Code로 작성한 MarkDown을 pdf형식으로 저장 지원

## LICENSE
- MIT
- University of Illinois/NCSA Open Source License