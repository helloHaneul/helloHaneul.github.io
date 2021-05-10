---
layout: default
title: "signal&slot"
parent: Qt
nav_order: 1
---

# Signal & Slot
{: .no_toc }

qt 자체가 처음이었을때...

qt를 이용한 GUI 프로그래밍 중에 별도의 라이브러리에서 제공하는 콜백으로 들어오는 데이터로 QObject의 UI를 업데이트해줘야하는 상황이었다. 이는 non GUI thread에서 gui thread의 객체에 접근하는 경우였다.

MFC나 .Net과 같은 다른 프레임웍에서도 비슷한 개념들이 존재하지만 Qt는 이러한 경우에 **Signal & Slot**을 사용해야 한다.

우선 시그널/슬롯은 오브젝트간 통신을 위해 사용되는 방식으로 qt의 핵심기능 중에 하나이다. 예를 들면 다음과 같은 경우들에서 쓰인다.

- QObject를 상속받는 클래스 내에서 **_UI 객체<->UI 객체_** 간의 연결
    - 스크롤바를 움직이면 값이 라벨에 표시된다.
- QObject를 상속받는 클래스 내에서 **_UI 객체<->별도의 메소드_** 간의 연결
    - 버튼을 누르면 특정 함수가 실행된다.
- socket, serial 통신 등에서 **비동기 호출**이 필요한 경우
    - TCP 소켓통신에서 데이터가 수신되면 특정 함수가 실행된다.

## 예제코드
```c++
#ifndef LCDNUMBER_H
#define LCDNUMBER_H

#include <QFrame>

class LcdNumber : public QFrame
{
    Q_OBJECT
public:
    LcdNumber(QWidget *parent = nullptr);

signals:
    void overflow();

public slots:
    void display(int num);
    void display(double num);
    void display(const QString &str);
    void setHexMode();
    void setDecMode();
    void setOctMode();
    void setBinMode();
    void setSmallDecimalPoint(bool point);
};

#endif
```
위는 LCD 표시가 불가능한 값을 요청받으면 `overflow` 시그널을 보내서 특정한 동작들을 수행할 수 있도록 하는 예제 코드이다.

여기서 알고가야 하는 점은 **_한 개의 signal에 여러 개의 slot을 연결할 수 있다_**는 점이다.

그리고 LcdNumber 클래스의 `display` slot은 다른 프로그램들과 인터페이스의 일부분이므로 public으로 선언하는데 예를 들어 QScrollBar의 valueChanged() signal에 display 슬롯을 연결하면 LCD의 숫자가 scrollbar에 표시되도록 할 수 있다.

## signal & slot 연결 방법

connect 하는 방식은 여러가지가 있는데 우선 `QObject::destroyed()`을 가지고 signal과 slot을 연결하는 방법을 설명한다.

QObject가 삭제될 때 내부적으로 `QObject::destroyed()` 시그널을 호출한다. 따라서 우리는 QObject를 상속받는 클래스를 사용할 때 이 시그널을 이용하면 삭제시에 수행할 수 있는 동작을 연결할 수 있다.

연결하려는 slot을 `void objectDestroyed(QObject* obj = nullptr);` 으로 가정하고 해당 signal과 slot을 연결하는 방법을 설명하겠다.

- 함수 포인터를 사용하는 방법
```
connect(sender, &QObject::destroyed, this, &MyObject::objectDestroyed);
```
이 방법을 사용하면 컴파일러가 signal과 slot의 파라미터가 호환되는지 확인이 가능하고 필요한 경우 파라미터를 변환하는 것도 가능하다고 한다.

- C++11 lambda; 소멸시점 주의!
```
connect(sender, &QObject::destroyed, this, [=](){ this->m_objects.remove(sender); });
```
람다식을 이용할 경우에는 sender나 호출되는 컨텍스트가 파괴되면 연결이 끊어지므로 함수안에서 사용되는 개체가 여전히 살아있는지 주의해서 사용해야한다.

- SIGNAL, SLOT 매크로 사용; 파라미터 주의!
```
connect(sender, SIGNAL(destroyed(QObject*)), this, SLOT(objectDestroyed(Qbject*)));
connect(sender, SIGNAL(destroyed(QObject*)), this, SLOT(objectDestroyed()));
connect(sender, SIGNAL(destroyed()), this, SLOT(objectDestroyed()));
```
signal 함수에서 전달하는 파라미터는 slot 함수에서 받는 인자보다 같거나 많아야 한다. 즉 아래와 같이 작성하면 에러가 발생한다.

```
connect(sender, SIGNAL(destroyed()), this, SLOT(objectDestroyed(QObject*)));
```
왜냐하면 slot 함수에서는 signal 함수에서 전달하지 않는 QObject 개체를 인자로 받을 것으로 예상하고 있는 상황으로 이는 런타임 에러를 발생시킨다.

### [참고]
[https://doc.qt.io/qt-5/signalsandslots.html](https://doc.qt.io/qt-5/signalsandslots.html)