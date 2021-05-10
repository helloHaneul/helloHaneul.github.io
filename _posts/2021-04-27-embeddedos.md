---
published: true
layout: single
title: "Embedded OS"
category: Embedded Linux
tags:
comments: true
---

# Embedded OS

## OS vs Kernel
아래의 도표에서 보이듯 Kernel은 OS의 일부분으로 OS와 Kernel의 차이는 다음과 같다.

![diagram](https://helloHaneul.github.io/image/embedded/diagram1.png)

- OS(운영체제) : 응용 프로그램과 컴퓨터 하드웨어 사이의 중재 역할을 하며, 실행되는 응용프로그램들이 메모리와 CPU, 입출력 장치 등의 자원 등을 사용할 수 있도록 다양한 서비스를 제공하는 시스템 소프트웨어
- Kernel : 운영체제의 가장 핵심적인 역할을 하는 하나의 커다란 프로그램

## Embedded OS 구성 단계
Embedded OS를 구성하는 단계는 아래와 같이 크게 4단계다.

![diagram](https://helloHaneul.github.io/image/embedded/diagram2.png)

추가로 `Boot Loader` 같은 경우에는 보통 BIOS와 Boot Loader가 통합된 형태가 대부분으로 오픈소스인 U-boot에 대게 chip사에서 HW 스펙에 맞게 기본 U-boot에서 수정한 버전으로 제공하고 있으며 이를 그대로 사용하는 경우가 대부분이다.

그리고 파일 시스템과 유틸리티들을 통칭하는 `Root File System`에서 가장 기본이 되는 프로그램은 쉘(shell)이다. OS를 구동하는데 있어 가장 기본이 되는 프로그램이라 볼 수 있다. 커맨드라인 모드로 OS가 부팅이 되면 명령어를 입력할 수 있는 프롬프트가 뜨는데 이것이 쉘이다. 쉘을 통해 명령어를 입력하여 다양한 프로그램을 실행할 수 있다. 이밖에도 시스템 동작에 필요한 ls, mv, cp, ps등의 유틸리티를 설치해야 기본적인 리눅스 명령어를 실행할 기반이 갖춰지는데, 이러한 프로그램 각각을 구하여 빌드해서 설치해도 되지만 busybox를 사용하여 구성할 수 있다.

### Android도 Embedded Linux 중에 하나
Embedded Linux의 가장 흔한 예시는 Android로 Android OS 자체도 Linux Kernel을 기반으로 나온 OS(리눅스 배포판)이다. 과거 Android 진영에서는 모바일 사용 환경에 맞게 많은 유틸리티를 만들어 제공하였고, 커널도 이에 맞게 변경하여 사용하였다. 그 중 일부분을 말하자면 안드로이드 동작 매커니즘은 메모리가 부족한 상황을 가정하기 때문에 low memory killer라는 것을 도입해서 사용했다. 하지만 3.2 이후 버전 커널부터는 안드로이드 플랫폼 구동에 필요한 기능들이 공식 리눅스 버전에 적극 추가하여 통합된 버전으로 제공되기 때문에 일반 리눅스기반 OS와 안드로이드 OS간의 가장 큰 차이는 사용자 공간을 제공하는 인터페이스, 특정 유틸리티 등의 소프트웨어 패키지들의 묶음인 플랫폼으로 볼 수 있다.