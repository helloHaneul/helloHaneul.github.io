---
published: true
layout: single
title: "USB Device"
category: Device Driver
tags:
comments: true
---

### **USB Device Driver Package in Windows**

Windows 환경에서 디바이스 드라이버는 보통 세 가지 파일로 구성이 된다.

- Driver Files (*.sys) : 장비의 입출력 인터페이스를 제공하는 실제 디바이스 드라이버 파일

- Installation Files (*.inf) : Windows 환경에서 드라이버 설치시에 필요한 텍스트 파일로 사용할 드라이버 파일, 레지스트리 정보, VID/PID 정보 등등 설치할 디바이스와 파일에 대한 정보를 포함한다.

- Windows device driver 서명 파일(*.cat) : [WHQL](https://helloHaneul.github.io/docs/whql.md) 테스트를 거쳐 MS로부터 인증 절차를 완료하면 획득 가능하다. 해당 서명 파일이 없거나 MS로부터 서명된 파일이 아닐 경우에 아래와 같은 설치 경고창 발생한다.

![err_screenshot](https://helloHaneul.github.io/image/sign_error.png)


### **USB Device Driver Package in Linux**

USB 통신이외에 별도 추가 기능으로 인해 드라이버 모듈을 적용하지 않는 경우에는 udev rules 파일 추가만으로 동작이 가능하다.

**udev rules?**

[http://pigeonsnest.co.uk/stuff/ubuntu-udev-scanner.html](http://pigeonsnest.co.uk/stuff/ubuntu-udev-scanner.html)

아래 링크에 Linux 환경에서의 USB device driver의 구성에 대한 내용이 잘 설명되어 있다. 

[http://www.opensourceforu.com/2011/10/usb-drivers-in-linux-1/](http://www.opensourceforu.com/2011/10/usb-drivers-in-linux-1/)

### 참고링크
- Windows driver package:
[https://docs.microsoft.com/en-us/windows-hardware/drivers/install/components-of-a-driver-package](https://docs.microsoft.com/en-us/windows-hardware/drivers/install/components-of-a-driver-package)
- Driver inf 파일:
[http://www.hackerschool.org/HS_Boards/data/Lib_kernel/AboutINF.pdf](http://www.hackerschool.org/HS_Boards/data/Lib_kernel/AboutINF.pdf)
- Driver catalog 파일:
[https://docs.microsoft.com/en-us/windows-hardware/drivers/install/catalog-files](https://docs.microsoft.com/en-us/windows-hardware/drivers/install/catalog-files)