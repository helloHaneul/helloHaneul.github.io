---
layout: default
title: "Import 3rd party library"
parent: Qt
nav_order: 1
---

## Qt project 파일(*.pro)에서 라이브러리 import 하는 방법
{: .no_toc }

3rd party 라이브러리를 사용해야하는 경우에 qmake가 해당 라이브러리를 찾을 수 있도록 프로젝트(.pro)파일에서 LIBS 변수에 추가를 해야한다.

방법은 아래와 같다.

```
LIBS += -L"3rdparty/CatWhisperer/lib" -lCatWhisperer
```
우선 -L옵션으로 링커가 라이브러리 파일이 있는 디렉토리를 명시하고, -l 옵션으로는 링크할 라이브러리를 명시한다. 
  
이 때 libary 확장자(.so 혹은 .a)까지 지정할 필요 없고 라이브러리 파일이 /lib/ 위치한 경우에는 -l 옵션만으로도 해당 라이브러리를 찾을 수 있다. (in Linux)