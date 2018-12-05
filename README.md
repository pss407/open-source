# 4조 Project
<H3>1. 프로젝트 이름</H3>
- <H5>Visual Studio Code를 이용한 Markdown 편집기</H5>

![Alt Text](https://user-images.githubusercontent.com/45596085/49505684-a37b2a00-f8bf-11e8-96cb-032df145166d.PNG)


## <H3>2. 팀멤버 및 각 역할</H3>
|이름  |역할  |
|---------|---------|
|김창희   |기존 오픈소스 한글화 작업 및 README 파일 제작|
|박승세   |         |
|정소희   |         |
|서동훈   |         |

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
    
    5. PDF,Word 저장기능
    - 작성한 Markdown을 Preview에서 보여지는 그대로 간편하게 PDF, 및 Word로 저장 가능
    
### <H4>기대 효과</H4>

    1. Markdown 작성에 대한 실시간 동기화를 통해 개발자의 Markdown사용 편리함을 극대화
    
    2. Markdown 입문 개발자들이 겪는 Markdown 문법의 어려움을 최소화, Word 기능을 추가해 
       간편하게 문서의 스타일 편집 가능
    
    3. Mac OS의 Markdown 편집기 유료화에 대한 문제점 해소
    
    4. Preview를 보기 위해 Github에 접속할 필요가 없어서 별도의 네트워크 연결이 없이도 작성 후 문서화 가능
    
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

## <H3>6. 사용되는 Github 오픈소스 SW 목록</H3>
- Microsoft/vscode-docs-authoring: https://github.com/Microsoft/vscode-docs-authoring
- shd101wyy/vscode-markdown-preview-enhanced: https://github.com/shd101wyy/vscode-markdown-preview-enhanced

## <H3>7. 이 작업 이후, 추가적으로 진행되면 좋을 작업들</H3>
- android, ios 앱 
- 가장 표준화된 markdown 문법 확보 후 tutorial 서버지원
- H 및 #에 따른 숫자 크기 변환을 자율조절 가능하게 지원
- Visual Studio Code로 작성한 MarkDown을 pdf형식으로 저장 지원

## LICENSE
- MIT
- University of Illinois/NCSA Open Source License