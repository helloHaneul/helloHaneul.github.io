---
published: true
layout: single
title: "IIS에서 WCF 서비스 호스팅하기"
category: IIS
tags:
comments: true
---

# WCF 서비스 호스팅
IIS에서 WCF 서비스를 호스팅해보자

## 1. 응용프로그램풀 추가
응용프로그램풀은 서버에 올리고자하는 어플리케이션을 프로세스 단위로 분리하기 위해 사용한다. 우선 응용프로그램풀을 상위에 만들고 그 아래에 어플리케이션을 등록하여 사용하는 형태인데 이는 서버에 있는 다른 어플리케이션에 영향을 주지 않도록 돕기 때문에 호스팅하는 서비스마다 풀을 이용하여 분리하여 사용하는 것이 좋다.
![step1](https://helloHaneul.github.io/image/wcfoniis/step1.png)

## 2. 웹 사이트 추가
우선 _애플리케이션 풀_ 에는 위에서 추가한 풀을 지정하고, 실제 경로에는 WCF Service 프로젝트의 위치를 지정한다. 그리고 사용하고자 하는 포트를 입력하는데 이 때 해당 포트는 방화벽 설정이 되어있어야한다.

![step2](https://helloHaneul.github.io/image/wcfoniis/step2.png)

![step3](https://helloHaneul.github.io/image/wcfoniis/step3.png)

## 3. 서비스 동작 확인
WCF 서비스(HTTP)가 정상적으로 올라갔다면 아래와 같이 브라우저창에서 확인 가능하다.
![final](https://helloHaneul.github.io/image/wcfoniis/final.png)
