---
published: true
layout: single
title: "Dev Server Setting"
category: Embedded Linux
tags:
comments: true
---

# Embedded Linux 개발서버 구축
{: .no_toc }

[참고사이트](http://forum.falinux.com/zbxe/?document_srl=564235&mid=lecture_tip&sort_index=readed_count&order_type=desc)

## Linux OS 설치
빌드 환경 구축에서 처음 수행해야하는 단계는 Host PC에 리눅스 OS를 설치하는 것. 선정된 개발보드사에서 제공하는 BSP(Board Support Package)에서 추천하는 리눅스 환경을 설치하는 것도 좋은 방법이다. 
우선 리눅스OS 설치가 완료되면 크게 세가지 서비스 셋업이 필요하다.

## Samba 설정
윈도우와 파일 공유를 하기 위한 서비스

## NFS 설정
root filesystem을 공유하기 위한 서비스로 application 개발 및 디버깅을 위한 환경으로 사용하였음. 개발 서버의 file system과 개발 보드의 file system을 공유하기 위한 서비스로 보면 된다. Application 개발시에는 셋업이 필수다. (한땀한땀 디버깅해야함)

1.	NFS 서버 설치
```shell
$ sudo apt-get install nfs-kernel-server
```

2.	NFS로 공유할 디렉토리 설정하기
```shell
$ sudo vi /etc/export
$ [share location] *(rw,no_root_squash,no_all_squash)
$ [target] *(rw,no_root_squash,no_all_squash)
```

3.	NFS 서버 재시작
```shell
$ sudo service nfs-kernel-server restart
```
	
4.	nfs 서비스 테스트
```shell	
$ sudo mount -t nfs -o tcp [server IP:/share location] [mount location]	
$ sudo mount -t nfs -o tcp [target] /mnt/nfs
```
	
## TFTP 설정
타겟 보드에서 kernel 이미지를 불러오기 위해 사용하는 서비스로 개발 서버에 위치해있는 kernel image를 로드하여 개발보드내의 RAM에서 풀어서 사용할 경우에 사용하게 된다. 여러 개의 kernel image를 빈번하게 테스트해야하는 경우라면 TFTP를 사용하면 kernel image 스위칭이 보다 간편해진다. 그리고 TFTP를 이용해 kernel 부팅을 하기위해서는 이전에 bootloader단에서 TFTP를 이용하여 네트워크상에 있는 kernel image를 사용하겠다고 약속이 되어있어야 한다. 해당 모드에서 부팅을 하는 경우에 네트워크에 이상이 있다면 커널 패닉이 발생하므로 주의가 필요하다.

[tftp 참고](http://blankspace-dev.tistory.com/162)

[NFS 참고](http://forum.falinux.com/zbxe/index.php?document_srl=564027&mid=lecture_tip)

## Cross Compiler 설치

대게 BSP내에 압축파일 형태로 제공되며 해당 cross compiler를 압축을 풀어서 설치한 리눅스 OS에 위치시킨다. 패스를 설정하는 것이 편할 수 있지만 일단 패스 설정은 생략하기로…. 
```shell
$ cp -rf [cross compiler] /opt/toolchain/mips-gcc472-glibc216
```

인터넷에서 보니 아래와 같이 패스를 설정해서 쓰는 사람들도 있는듯…
```shell
$ export PATH=/opt/4.2.4-eabi-arm-s3c6410/bin:$PATH
```

build server를 여러 개발자가 사용하기 위해서는 cross compiler 폴더 권한을 모두 허용해야함
```shell
$ sudo chmod 777 -R /opt/
```

**※ Tips for vi setting**

1.	.vimrc 설정

```shell
set number 
set ai 
set si 
set cindent 
set shiftwidth=4 
set tabstop=4 
set ignorecase 
set hlsearch 
set expandtab 
set background=dark 
set nocompatible 
set fileencodings=utf-8,euc-kr 
set bs=indent,eol,start 
set history=1000 
set ruler 
set nobackup 
set title 
set showmatch 
set nowrap 
set wmnu 
syntax on 
```

2.	.vim 폴더 설정 : 하기와 같이 폴더 권한을 사용하고자하는 계정으로 변경

```shell
$ sudo chown -R [logged ID]:[logged ID] .vim
```