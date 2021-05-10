---
published: true
layout: single
title: "Build FW Image"
category: Embedded Linux
tags:
comments: true
---

# Tips for build F/W Image
{: .no_toc }

### BootLoader
대개 오픈소스를 기반으로 CPU 의존적인 부분만 수정하여 사용하는 경우가 일반적이다.
[참고사이트](http://jhkim3624.tistory.com/83)

오픈소스 부트로더 : [U-Boot](https://www.denx.de/wiki/U-Boot)


### Kernel
uImage 생성을 위해서는 mkimage 유틸리티가 빌드환경에 설치되어있어야 한다.
```shell
$sudo apt-get install u-boot-tools
```