---
published: true
layout: single
title: "Linux Device Driver"
category: Embedded Linux
tags:
comments: true
---

# Linux Device Driver
리눅스 커널내에서 모든 하드웨어 장치들은 디바이스 드라이버를 통해 제어가 되고 이는 커널내의 가상파일시스템을 통해 접근이 가능하다. 

## Device Driver 종류
- character device driver : 임의의 길이를 갖는 문자열을 다루는 디바이스 드라이버
    - console
    - keyboard 장비
- block device driver : 일정 크기의 커널 내부의 버퍼를 통해 block 단위로 데이터를 처리하는 디바이스 드라이버로 block의 사이즈(512/1024/4096bytes)는 커널에 의해 정해진다.
    - USB mass storage
- network device driver : 커널 내부에 있는 네트워크 프로토콜 스택과 연동하여 구현되어있으며, char나 block device driver와 달리 application에서 직접적인 처리가 불가

## Device Module
이러한 디바이스 드라이버는 실질적으로 커널에서 모듈의 형태로 구현이 되어있다. 우선 모듈 설명에 앞서 리눅스 커널은 Monolithic 방식이라는 점을 알아야 한다.

![diagram](https://helloHaneul.github.io/image/embedded/monolithic.png)

그림과 같이 monolithic 커널은 하나의 주소공간을 가지면서 커다란 하나의 프로세스로 여러 기능이 하나로 합쳐진 형태이다. 하나의 프로그램이기 때문에 커널 내에서 통신이 간단하고 빠르지만 기능 교체 및 추가시에 커널을 새로 빌드해야하는 단점이 있어서 이러한 단점을 보완하기위해 나온 것이 **`모듈`**이라는 개념이다. 

모듈은 커널을 새로 빌드하지 않고 현재 동작중인 커널에 동적으로 로드할 수 있는 커널 객체입니다.

추가로 monolithic 커널 이외에 Windows OS 환경에서 사용하는 형태인 Micro 커널은 커널의 기능을 Server라고 부르는 별도의 프로세스로 분할한 형태이다.

## Module Programming
아래는 character device driver의 기본 골격을 알 수 있는 예제이다.

```c
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>
```
모듈 소스코드에서 필수로 들어가야하는 헤더파일이다.

```c
#include <linux/fs.h>
#include <linux/cdev.h>
```
filesystem과 cdev 구조체(character device driver) 관련된 헤더 파일.

```c
int sk_major=0, sk_minor=0;
dev_t sk_dev;
struct cdev sk_cdev;
```
major 번호와 minor 번호 부여하게 되는데 major 번호는 device를 구분하기 위해 사용되고 0을 주면 커널이 알아서 중복되지 않는 번호를 부여한다. minor 번호는 동일한 디바이스가 여러 개 있을 때 이들 디바이스를 구분하기 위해 사용된다.

```c
int sk_open(struct inode *inode, struct file *filep)
{
    printk(KERN_WARNING "SK_DD : OPEN");
    return 0;
}

int sk_release(struct inode *inode, struct file *filep)
{
    printk(KERN_WARNING "SK_DD : RELEASE");
    return 0;
}

int sk_read(struct file *filep, char __user *buf, size_t count, loff_t *f_pos)
{
    printk(KERN_WARNING "SK_DD : READ");
    return count;
}

int sk_write(struct file *filep, const char __user *buf, size_t count, loff_t *f_pos)
{
    printk(KERN_WARNING "SK_DD : WRITE");
    return count;
}

struct file_operations sk_fops = {
    read: sk_read,
    write: sk_write,
    open: sk_open,
    release: sk_release
}
```
character device driver를 사용하는 응용 프로그램에서는 file operation 관련 시스템 호출 함수인 open,read,write,close를 통해 접근하기 때문에 다음과 같이 해당 함수 구현이 필요하다.

```c
int sk_init(void)
{
    printk("Init SK_DD module");

    int error = register_chrdev(sk_major, "SK", &sk_fops);
    if(error < 0) {
        printk(KERN_WARNING "SK_DD : register_chrdev error");
        return error;
    } else if(sk_major == 0) {
        sk_major = error;
        printk("SK_DD : register_chrdev OK (major:%d)", sk_major);
        printk(KERN_WARNING "SK_DD module insert done");
        return 0;
    }
}

void sk_exit(void)
{
    printk("Exit SK_DD module");

    unregister_chrdev(sk_major, "SK");

    printk(KERN_WARNING "SK_DD module delete done");
}

module_init(sk_init);
module_exit(sk_exit);

MODULE_LICENSE("GPL");
```
그리고 어느 디바이스 드라이버간에 필수로 들어가야할 기본 구성 함수인 init,exit 이다. 상기 예제는 character device driver이므로 init함수내에서는 드라이버 이름과 file operation 구조체를 전달하여 character device driver를 등록한다. exit에서는 드라이버 내에서 커널 메모리 할당이 있는 경우 메모리 해지 및 드라이버 de-register와 같은 루틴을 추가해줘야 한다. 그리고 init,exit함수명은 원하는 대로 정하되 module_init/exit 매크로를 통해 해당 함수를 커널에 등록시켜줘야 한다. 마지막으로 모듈의 라이선스를 명시하는 매크로를 이용하여 해당 모듈에 대한 라이선스를 명시한다.

