---
published: true
layout: single
title: "MS-SQL 설치"
category: MS-SQL
tags:
comments: true
---

# MS-SQL 설치하기
{: .no_toc }

## 1. MS-SQL server 2014 express 다운로드
관련 패키지(server,management studio)를 한번에 모두 설치할 떄는 advanced 버전으로 설치를 진행한다.

![step1](https://helloHaneul.github.io/image/mssql/step1.png)

## 2. Installer 실행
.NET framework 3.5 와 4.0 그리고 Mircrosoft visual studio 2010 재배포 가능 패키지와 같은 MS SQL server 설치에 필요한 항목들이 우선 설치되어 있어야 한다.

![step2](https://helloHaneul.github.io/image/mssql/step2.png)
![step3](https://helloHaneul.github.io/image/mssql/step3.png)

인스턴스 ID는 생성할 Database의 이름이 되며 추후에 추가로 만들 수도 있다.

![step4](https://helloHaneul.github.io/image/mssql/step4.png)
![step6](https://helloHaneul.github.io/image/mssql/step5.png)

웹서버와 동일한 환경에서 DB서버를 구성하는 경우에 Windows 인증 모드로 사용해도 되긴하지만 혼합모드로 사용할 경우에는 sa(super admin) 계정에 대한 암호를 지정해야한다.

![step6](https://helloHaneul.github.io/image/mssql/step6.png)

아래 화면과 같이 모든 상태가 성공으로 표시되면 설치가 완료된 것이다. 만약 중간에 문제가 생겼다면 해당 스텝부터 설치를 다시 진행해야하는데 관련된 패키지들이 미리 정상설치되어 있지 않아서 그런 경우가 많다.

![success](https://helloHaneul.github.io/image/mssql/install_success.png)

## 3. MS-SQL Management Studio 실행
_Sever name_ 에는 설치 시에 설정한 인스터스 ID를 입력하고, 인증모드에 따라 혼합모드일 경우에 시스템 관리자 계정으로 로그인할 때는 설치시에 설정한 암호로 로그인 한다. (Windows 인증모드로 지정했을 경우에는 암호 입력없이 실행가능)

![run1](https://helloHaneul.github.io/image/mssql/run1.png)

접속 완료...!

![run2](https://helloHaneul.github.io/image/mssql/run2.png)
