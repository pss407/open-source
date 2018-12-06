# 4조 Project
<H3>1. 프로젝트 이름</H3>
- <H5>Visual Studio Code를 이용한 Markdown 편집기</H5>

![Alt Text](https://user-images.githubusercontent.com/43747079/49585711-7ce1ef80-f9a2-11e8-8308-ceeecb6cb277.png)


## <H3>2. 팀멤버 및 각 역할</H3>
|이름  |역할  |
|---------|---------|
|김창희   |오픈소스 코드 기능 변경 및 개선, README 파일 제작|
|박승세   |오픈소스 코드 기능 변경 및 개선, README 파일 제작|
|정소희   |아이디어 제공, 자료조사, 로고와 ppt및 README 파일 제작|
|서동훈   |아이디어 제공, 자료조사, README 파일 제작 

## <H3>3. 개발 동기 및 과정</H3>

- 개발동기

    - <p>오픈소스 프로젝트를 진행하면서 git에서의 Markdown을 사용해보았다.<p/>
   
    - <p>git에서의 Markdown의 경우 문법에 대한 도움 기능이 없기때문에 사용하고자하는 문법을 검색엔진을 통해 알아봐야했고, 
      또 git에서는 지원하지 않는 문법들이 존재하여 그것을 대체할 다른 문법을 찾아보는 등 다양한 어려움이 있었다.<p/>
  
    - <p>git의 Markdown에서 지금까지 작성한 결과물을 확인하기 위해서는 작업중 일일히 Commit을 하거나 미리보기 기능 활용해야 한다.
      하지만 미리보기 기능을 활용하기 위해서는 Preview 창에 별도로 들어가야 했다. 
      따라서 이 prewiew 기능을 사용하는 것은 번거로웠고 현재 작업 진행 상태를 실시간으로 보면서 수정이 불가능했다. 
      이런 환경에서 Markdown 작업은 매우 답답하고 불편했다.<p/>
  
    - Markdown의 편리함을 많은 개발자들에게 제공하고자 이 오픈소스를 개발하게 되었다.

- 개발과정

    - <p>Vscode에서는 편집기의 시각화가 매우 편하기 때문에 Vscode에서 Markdown을 사용할 수 있는지에 대한
      아이디어를 생각했다.<p/>
  
    - <p>Vscode에서 Preview 동기화를 지원하고 내부 창에서 실시간으로 확인가능한 Markdown 오픈소스가 있는지
      조사했다. -> vscode-markdown-preview-enhanced<p/>
  
    - <p>Vscode에서 Markdown의 문법을 간소화할 수 있고 문서 스타일을 쉽게 편집할 수 있는 가장 적합한 오픈소스를
      조사했다. -> vscode-docs-authoring<p/>
  
    - <p>Vscode에서 Markdown으로 작업한 것을 바로 word형식으로 저장해주는 오픈소스를 검색했다.
      -> vscode-pandoc<p/>
  
    - 위의 오픈소스들을 가지고 사용시 간략한 설명문 및 사용방법을 한글화 하기위해 코드를 개선하여 
      사용자가 편리하게 이용하게끔 수정했다.

## <H3>4. 프로젝트 내용</H3>

### <H4>기존 Markdown의 불편함</H4>

1. Preview기능
    - git의 Markdown 작업에서 동기화된  미리보기 기능을 활용하려면 Preview창에 들어가서 확인하고 
      다시 Write 창을 봐야하기 때문에, commit시에 실제 git에 나타나는 형식이 다르게 표현되는 불편함이 존재한다.
      
        ![Alt Text](https://user-images.githubusercontent.com/45596085/49508068-2783e080-f8c5-11e8-9e56-30fb8a2b4245.PNG)

2. Markdown문법의 어려움
    - Markdown을 사용하다 보면 image, video 삽입 등 문법의 어려움과 생소한 기능들이 존재하여 검색을 통해 알아야
      하는 불편함이 존재한다.
    
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
    - Word를 통해 기존 Markdown의 문법을 간소화 시킴으로써 Markdown의 문법을 몰라도 최소한 학습으로 사용 가능
    
5. Word 저장기능
    - 작성한 Markdown을 Preview에서 보여지는 그대로 간편하게 Word로 저장 가능
    
### <H4>기대 효과</H4>

1. Markdown 작성에 대한 실시간 동기화를 통해 개발자의 Markdown사용 편리함을 극대화
    
2. Word 기능을 이용해 Markdown 입문 개발자들이 겪는 Markdown 문법의 어려움을 최소화, 간편하게 문서의 스타일 
   편집 가능
    
3. Mac OS의 Markdown 편집기 유료화에 대한 문제점 해소
    
4. Preview를 보기 위해 Github에 접속할 필요가 없어서 별도의 네트워크 연결이 없이도 작성 후 문서화 가능
    
### <H4>오픈소스 사용하는 법</H5>

- docs기능 사용법
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

- Preview기능 사용법
    - 파일 형식 .md로 지정
    - 다음 그림 파일에 표시되는 아이콘 클릭
![Alt Text](https://user-images.githubusercontent.com/45596085/49510480-b4ca3380-f8cb-11e8-817c-06be42bf5ddb.PNG)
    
- Word기능 저장 사용법
    1. 마크다운 파일이 열려있어야 하며, 기능을 돌리는 방법을 아래 두가지가 존재합니다.
    2. `F1` 윈도우에서 입력(`shift+cmd+P` Mac에서 입력), `pandoc`입력 후 + `Enter'
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
    
- Microsoft/vscode-docs-authoring 기존 오프소스 에러에 pont의 크기 조절 기능 제시
    
![Alt Text](https://user-images.githubusercontent.com/45596085/49508577-69615680-f8c6-11e8-9f52-b238579ffa16.PNG)

- dfinke/vscode-pandoc 기존 오픈소스 사용시 pdf 에러 발생 및 원인 제시
    
![Alt Text](https://user-images.githubusercontent.com/45596085/49527095-8b71cd80-f8f4-11e8-813b-14c72e3a045d.PNG)

- shd101wyy/vscode-markdown-preview-enhanced 기존 오픈소스에 DOCS기능 추가 제시

![Alt Text](https://user-images.githubusercontent.com/45596085/49508835-15a33d00-f8c7-11e8-9ab9-93cc3a0521a1.PNG)



### <H4>실행 예시<H4>
1. preview를 통해 번호 매기기, 테이블 생성하기, 사진 추가하기
![Alt Text](https://user-images.githubusercontent.com/45034295/49389212-1625c180-f769-11e8-9e55-56cff083089d.gif)

2. docx 파일로 변환
![Alt Text](https://user-images.githubusercontent.com/45596085/49589117-ddc1f580-f9ab-11e8-8305-251d2c7cb7e7.gif)

### <H4>이 오픈소스를 사용하고자 하는 SW개발자에 도움이 되는 것
    
1. Markdown 작성에 대한 실시간 동기화를 제공하기 때문에 편리하게 Markdown을 사용 할 수 있다.
   몇몇 Markdown 편집기들은 preview를 지원하지 않기 때문에 자신이 작성하고 있는 Markdown code가 어떻게 
   보여지고 있는지 알 수 없어서 작업의 속도가 느리며, 계속되는 수정 작업에도 Preview 창을 일일히 확인
   해야했기 때문에 번거로움이 있었다. 하지만 이 편집기를 사용한다면, 내부의 preview로 자신의 작성 결과물을 
   확인하면서 수정,보안할 수 있기 때문에 시간의 효율성과 사용자의 편리함이 증가한다.
    
2. Word 기능을 추가해 Markdown 문법의 어려움을 최소화해서 입문하기 부담이 없고, 익숙한 환경속에서 문서의 
   스타일 편집할 수 있다. 입문 개발자들에게 가장 어려운 것은 언어의 어려움일 것이다. 
   새로운 언어를 터득하고 익숙해 지는데 걸리는 시간은 있으므로, 편리한 기능을 두고도 이용하지 못하는
   개발자들도 다수 생긴다. 
   이러한 문제점을 없애기 위해 우리는 Word의 기능을 이용해 Markdown의 문법을 더욱 쉽게 간소화하였다.
   Markdown의 문법을 이제 막 배우는 개발자라도 이 편집기를 사용하면 Markdown으로 편리하게 원하는 결과물을
   만들어 낼 것이다.
       
3. Mac OS에서 많은 기능을 가진  Markdown 편집기는 유료가 대부분인데, 이 편집기를 사용하면 무료로 많은 기능을 
   사용할 수 있다.
   Markdown 편집기들은 각각 다양한 기능을 제공한다. 
   무료인 편집기도 다수 있지만, 유료인 편집기도 존재하며, 특히, Mac OS에서 개발자들에게 
   유명한 편집기들은 대부분 유료이다. 따라서 이 편집기들의 기능을 사용하기 위해서는 비용을 
   지불해야 한다는 단점이 존재했다. 
   이 편집기를 사용하면 개발자들이 비용에 대한 부담없이 다양한기능을 사용할 수 있다.
    
4. Preview를 오프라인 상황에서도 제공하므로 별도의 네트워크 연결이 없이도 코드 작성이 가능하고 더불어 문서화가
   가능하다. 항상 온라인 상황에 있을 수는 없으므로 불가피하게 오프라인 상태에서 문서를 작성해야 
   할 때가 존재한다. 이 편집기는 오프라인 상황에서도 Preview를 활용하면서 Markdown 작업을 할 수 있다.

## <H3>5. 사용되는 Github 오픈소스 SW 목록</H3>
- Microsoft/vscode-docs-authoring: https://github.com/Microsoft/vscode-docs-authoring
- shd101wyy/vscode-markdown-preview-enhanced: https://github.com/shd101wyy/vscode-markdown-preview-enhanced
- dfinke/vscode-pandoc: https://github.com/dfinke/vscode-pandoc

## <H3>6. 이 작업 이후, 추가적으로 진행되면 좋을 작업들</H3>
- android, ios 앱 
- 가장 표준화된 markdown 문법 확보 후 tutorial 서버지원
- H 및 #에 따른 숫자 크기 변환을 자율조절 가능하게 지원
- Visual Studio Code로 작성한 MarkDown을 pdf형식으로 저장 지원
- 문서화된  파일 markdown 파일로 변환 (pandoc이 존재하나 문법을 제대로 읽지못함)

## LICENSE
- MIT
- University of Illinois/NCSA Open Source License