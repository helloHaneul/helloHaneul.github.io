---
published: true
layout: single
title: "BOM / DOM"
category: Javascript
tags:
comments: true
---

# 웹브라우저에서의 자바스크립트
React와 같은 프레임워크를 통해 프론트와 백엔드를 온전히 분리하여 개발을 하는 경우에는 오히려 순수한 자바스크립트를 사용하여 프론트엔드 작업을 진행하는 능력이 필요하다고 한다. 순수한 자바스크립트, 바닐라 JS를 능숙하게 다루기 위해서는 우선 DOM에 대한 공부가 필요할 것 같다.

## BOM
우선 BOM(Browser Object Model)은 웹페이지의 내용을 제외한 브라우저의 각종 요소들을 객체화시킨 것이다. 전역객체 **window**의 프로퍼티에 속한 객체들이 이에 속한다.

Window 객체는 모든 객체가 소속된 객체로 웹브라우저 호스트 환경에서의 자바스크립트에서 객체를 만든다는 것은 결국 window 객체의 프로퍼티를 만드는 것이다. 흔히 사용되는 BOM 객체들은 아래와 같다.

- alert
- confirm
- prompt
- location : 문서의 주소와 관련된 속성과 메소드를 가지는 객체로 URL를 가져오거나 변경할 수 있다.
```javascript
console.log(location.href);
location.href = 'https://www.naver.com'
location.reload();
```
- navigator : 브라우저의 정보를 제공하는 객체다. 주로 호환성 문제등을 위해서 사용한다.
- window : 주의! 보안적인 이유로 사용자의 의도없이 창을 열려고 하면 팝업이 차단된다.
```html
<input type="button" value="open" onclick="winopen();" />
<input type="button" value="close" onclick="winclose();" />
<script>
function winopen() {
    test_win = window.open('test.html');            // 창 열기
    test_win.document.getElementById('message');    // windows 객체내의 요소에 접근
}
function winclose() {
    test_win.close();                               // 창 닫기
}
</script>
```

## DOM
Document Object Model. DOM은 웹페이지의 내용을 제어한다. window의 프로퍼티인 document 프로퍼터에 할당된 **window.document** 객체가 이러한 작업을 담당하며 아래와 같은 메소드를 이용해서 문서 내의 주요 엘리먼트에 접근할 수 있는 객체를 제공한다.

- documents.getElementsByTagName
- document.getElementsByClassName
- document.getElementById
- document.querySelector
- document.querySelectorAll

DOM에서 자주 사용하는 로직을 재사용하여 쉽게 웹페이지를 조작할 수 있게 하는 라이브러리가 바로 **jQuery**이다.

[DOM Tree](https://web.stanford.edu/class/cs98si/slides/the-document-object-model.html)