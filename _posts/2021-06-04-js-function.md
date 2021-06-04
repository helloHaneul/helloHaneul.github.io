---
published: true
layout: single
title: "함수형 언어"
category: Javascript
tags:
comments: true
---

## 함수형 언어, Javascript

### 변수의 유효범위

전역변수 사용을 지양해야하는 것은 다른 언어에서도 강조되는 부분인데 자바스크립트에서도 물론 필요한 내용이다. 불가피하게 전역변수를 사용해야할 때는 아래와 같이 하나의 객체를 전역변수로 만들고 객체의 속성으로 변수를 관리하는 방법을 사용하는 것이 좋다.

```javascript
MYAPP = {}
MYAPP.calculator = {
    'left' : null,
    'right' : null
}
MYAPP.coordinate = {
    'left' : null,
    'right' : null
}
 
MYAPP.calculator.left = 10;
MYAPP.calculator.right = 20;
function sum(){
    return MYAPP.calculator.left + MYAPP.calculator.right;
}
document.write(sum());
```

그리고 자바스크립트에서 로직을 모듈화함에 있어 아래와 같이 익명함수를 사용하는 방법이 일반적이라고 한다.
```javascript
(function(){
    var MYAPP = {}
    MYAPP.calculator = {
        'left' : null,
        'right' : null
    }
    MYAPP.coordinate = {
        'left' : null,
        'right' : null
    }
    MYAPP.calculator.left = 10;
    MYAPP.calculator.right = 20;
    function sum(){
        return MYAPP.calculator.left + MYAPP.calculator.right;
    }
    document.write(sum());
}())
```

### 값으로서의 함수

ajax를 이용한 비동기 처리에서의 콜백함수.

### 클로저

우선 자바스크립트는 함수 안에서 또 다른 함수를 선언할 수 있다. 이러한 경우는 해당 함수에서만 사용하게 되는 함수가 있는 경우에 응집성과 가독성을 위해 아래와 같이 내부함수로 선언하여 사용하게 된다.

```javascript
function outter(){
    function inner(){
        var title = 'coding everybody'; 
        alert(title);
    }
    inner();
}
outter();
```

그리고 이러한 내부함수는 외부함수의 지역변수에 접근 할 수 있는데 외부함수의 실행이 끝나서 외부함수가 소멸된 이후에도 내부함수가 외부함수의 변수에 접근 할 수 있다.
```javascript
function outter(){
    var title = 'coding everybody';  
    return function(){        
        alert(title);
    }
}
inner = outter();
inner();
```

이러한 특성을 이용해 Private한 속성을 사용할 수 있는데 아래 예제를 보면 바로 이해가 된다.
하지만 주의해야할 점은 외부함수를 통한 변수만 공유가 가능하다는 점!
```javascript
function factory_movie(title){
    return {
        get_title : function (){
            return title;
        },
        set_title : function(_title){
            title = _title
        }
    }
}
ghost = factory_movie('Ghost in the shell');
matrix = factory_movie('Matrix');
 
alert(ghost.get_title());
alert(matrix.get_title());
 
ghost.set_title('공각기동대');
 
alert(ghost.get_title());
alert(matrix.get_title());
```

### 함수 인자
자바스크립트에서 함수의 인자를 표현하는 키워드 'arguments'는 실제로 전달된 인자를 의미하고, '함수.length'는 함수에 정의된 매개변수의 수를 의미한다.

```javascript
function zero(){
    console.log(
        'zero.length', zero.length,
        'arguments', arguments.length
    );
}
function one(arg1){
    console.log(
        'one.length', one.length,
        'arguments', arguments.length
    );
}
function two(arg1, arg2){
    console.log(
        'two.length', two.length,
        'arguments', arguments.length
    );
}
zero(); // zero.length 0 arguments 0 
one('val1', 'val2');  // one.length 1 arguments 2 
two('val1');  // two.length 2 arguments 1
```

### 함수의 호출

함수내의 this를 명시적으로 바인딩할 때 사용하는 메소드가 `call, apply, bind` 이다.

우선 'apply' 예제를 통해 보면 메소드로 전달하는 인자가 함수 내에서 this로 사용할 수 있다.

```javascript
o1 = {val1:1, val2:2, val3:3}
o2 = {v1:10, v2:50, v3:100, v4:25}
function sum(){
    var _sum = 0;
    for(name in this){
        _sum += this[name];
    }
    return _sum;
}
alert(sum.apply(o1)) // 6
alert(sum.apply(o2)) // 185
```

'apply'와 'call'의 차이점은 매개변수의 전달 방식 차이이다.
```javascript
sum.apply(this, [1, 2]);
sum.call(this, 1, 2)
```

'bind'는 함수를 호출하지 않고 this를 바꾸는 메소드로 새로운 함수를 리턴하기때문에 객체로 받아서 사용한다.
```javascript
var newFunc = sum.apply.bind(this);
newFunc();
```

[출처]
[https://opentutorials.org/course/743/6544](https://opentutorials.org/course/743/6544)