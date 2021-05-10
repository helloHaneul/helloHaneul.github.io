---
published: true
layout: single
title: "IIS 설치(Windows 10)"
category: IIS
tags:
comments: true
---

# IIS(Internet Information Service) 설치하기
{: .no_toc }

IIS 웹서버는 Windows 10 환경에서는 기능 활성화만 하면 사용이 가능하다.

## 1. Windows 기능 켜기/끄기 실행 (제어판 -> 프로그램에서 실행 가능)

![step1](https://helloHaneul.github.io/image/iis_install_step1.png)

## 2. IIS 기능 켜기
IIS(Internet Information Service) 확장하고 FTP 서버 기능을 제외한 모든 하위 기능을 켠다.

![step2](https://helloHaneul.github.io/image/iis_install_step2.png)

## 3. .NET Framework 기능 켜기
.NET Framework 기능을 확장하고 모든 하위 기능을 켠다.

![step3](https://helloHaneul.github.io/image/iis_install_step3.png)

## 4. IIS 관리자 실행

![step4](https://helloHaneul.github.io/image/iis_install_step4.png)
![step5](https://helloHaneul.github.io/image/iis_install_step5.png)

### ※ Windows Server 2008 R2 에서 IIS 설치 방법
Server Manager > Roles > Add Roles > Web server(IIS) 설치
