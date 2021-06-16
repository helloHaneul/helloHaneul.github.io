---
published: true
layout: single
title: "BOM / DOM"
category: Javascript
tags:
comments: true
---

# 웹브라우저에서의 자바스크립트
React와 같은 프레임워크를 통해 프론트와 백엔드를 온전히 분리하여 개발을 하는 경우에는 오히려 순수한 자바스크립트를 사용하여 프론트엔드 작업을 진행하는 능력이 필요하다고 한다. 순수한 자바스크립트, 바닐라 JS를 능숙하게 다루기 위해서는 우선 DOM에 대한 이해가 필요했다. 

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

DOM에서 자주 사용하는 로직을 재사용하여 쉽게 웹페이지를 조작할 수 있게 하는 라이브러리가 바로 **jQuery**이다. 바닐라JS를 익히는 단계여서 같은 내용에서 jQuery를 사용할때의 경우는 정리하지 않았다. jQuery를 사용할때 다시 찾아서 해보든가 해야지...

### 1. Element

document.getElementBy* 메소드를 통해 리턴되는 객체는 크게 **HTMLElement**와 복수개의 요소를 받는 경우의 **HTMLCollection** 이렇게 두가지가 있다. 그리고 이러한 element들은 종류(html상에서 다른 태그 종류에 따라)에 따라서 조금씩 다르지만 이들 모두는 HTMLElement를 상속받은 객체들이다.

DOM 구조상에서 **HTMLElement**는 아래와 같은 관계에 해당한다.

> Node ▶ Element ▶ HTMLElement ▶ HTMLLIElement ,HTMLAnchroElement, HTMLInputElement ...

[DOM Tree](https://web.stanford.edu/class/cs98si/slides/the-document-object-model.html)

실제 여러 element 객체들에서 상속하는 부모 Element 객체는 특정 엘레먼트를 식별, 조회 및 속성을 제어할 수 있는 다양한 메소드 즉 API를 제공한다.

#### 식별자 API
- [Element].tagName : 태그 이름 변경 불가
- [Element].id : id 읽기, 쓰기 가능
- [Element].className : 읽기, 쓰기 가능(문자열을 더해서 클래스 추가가 가능)
- [Element].classList : className 기능에 비해 편리한 사용성을 제공

#### 조회 API
- [Element].getElementsBy* : 해당 element의 하위 element를 대상으로 조회를 한다.

#### 속성 제어하는 API
- [Element].getAttribute(name)
- [Element].setAttribute(name, value)
- [Element].hasAttribute(name);
- [Element].removeAttribute(name);

`setAttribute` API를 이용하는 방법과 객체의 property를 사용하는 방법이 있는데 property를 사용하는 방법의 경우 사용할때 자바스크립트내의 이름 규칙으로 인해 실제 html 속성의 이름과 다른 이름을 가지는 경우가 있다.

|setAttribute API|property 방식|
|----------------|-------------|
|class|className|
|readonly|readOnly|
|rowspan|rowSpan|
|colspan|colSpan|
|usemap|userMap|
|frameborder|frameBorder|
|for|htmlFor|
|maxlength|maxLength|

DOM 구조상에서 가장 상위에 있는 Node 객체는 태그 노드와 텍스트 노드 전체를 가리킨다. 이에 태그 요소만을 검색해야할 때는 메소드이름내에 Element가 붙어있거나 텍스트 노드를 포함하지 않는 API를 잘 선택해서 사용해야한다.

#### 노드 종류 API
- [Node].nodeType
- [Node].nodeName

#### 노드 관계 API

|Element 요소만|텍스트 노드 포함|
|----------------|-------------|
|[Element].children|[Node].childNodes|
|[Element].firstElementChild|[Node].firstChild|
|[Element].lastElementChild|[Node].lastChild|
|[Element].nextElementSibling|[Node].nextSibling|
|[Element].previousElementSibling|[Node].previousSibling|

#### 노드 변경 API
document.createElement 메소드로 만들었던 태그를 이용해 노드를 추가하거나 삭제 혹은 변경이 가능
- [Node].appendChild(child)
- [Node].insertBefore(newElement, referenceElement)
- [Node].removeChild(child)
- [Node].replaceChild(newChild, oldChild)
- [Node].cloneNode();

#### 문자열로 노드 제어
- [Node].innerHTML
- [Node].outerHTML
- [Node].innerText, [Node].outerText
- [Node].insertAdjacentHTML()

#### 자주 쓰이는 태그의 메소드 (Element 크기, 위치, 스크롤을 제어)
- [Node].attributes : 해당 태그가 가진 모든 속성
- [Node].clientHeight, [Node].clientWidth : 태그의 margin, border, scrollbar을 제외한 높이와 너비를 반환
- [Node].offsetHeight, [Node].offsetWidth : 태그의 margin만 제외한 높이와 너비를 반환
- [Node].scrollHeight, [Node].scrollWidth : 스크롤 가능한 범위까지 포함한 태그의 높이와 너비를 반환
- [Node].getBoundingClientRect() : 태그의 크기와 위치

### 2. Document

DOM 트리에서 Document 객체는 문서 전체를 대표하는 객체이다.

> Node ▶ Document ▶ HTMLDocument

#### 노드 생성 API
- document.createElement() : 새로운 element 생성
- document.createTextNode() : 새로운 노드(element 혹은 텍스트노드 포함) 생성

### 3. Text 노드

> Node ▶ CharacterData ▶ Text

DOM에서는 공백이나 줄바꿈도 모두 텍스트 노드이다.

- [Node].data : 텍스트 노드의 값
- [Node].nodeValue : 텍스트 노드의 값을 가져오거나 수정

- [Node].appendData(data)
- [Node].deleteData(start index, end index)
- [Node].insertData(start index, data)
- [Node].replaceData(start index, end index, data)
- [Node].substringData(start index, end index)

[출처]

[https://opentutorials.org/course/743/6544](https://opentutorials.org/course/743/6544)
[https://www.zerocho.com/category/JavaScript/post/573b4165a54b5e8427432948](https://www.zerocho.com/category/JavaScript/post/573b4165a54b5e8427432948)