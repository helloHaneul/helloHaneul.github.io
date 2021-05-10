---
published: true
layout: single
title: "WCF 개요"
category: WCF
tags:
comments: true
---

# WCF(Windows Communication Foundation)
{: .no_toc }

서비스 지향적인 아키텍처(SOA) 어플리케이션을 구현을 위해 만들어진 Contract 기반의 프레임워크.

### ※ SOA?
```
SOA란 여러 서비스(독립적인 소프트웨어 기능 단위 또는 기능 모음)를 서로 조합하여 새로운 업무 기능을 구성하는 소프트웨어 아키텍쳐이다.
SOA는 SOAP(어떠한 운영체제, 플랫폼이든 이해할 수 있는 형식의 표준 네트워크 프로토콜) 혹은 이외의 다양한 프로토콜 방식을 사용하여 외부로 서비스를 제공한다.
이러한 SOA 시스템은 구체적으로는 ESB(Enterprise Service Bus)라는 패턴을 사용하여 구성하는데 이는 각각의 서비스들이 통신할 때 중앙에 하나의 버스를 통하여 관리되는 구조이다.
이 구조는 서비스간 연결의 복잡도를 해소하고 중앙의 버스 내부에 각각의 연관된 서비스들의 중개자를 추가하여 서비스의 수정도 용이하게 한다.
SOA는 각각의 서비스 구성요소를 다른 서비스에 영향을 주지않고 필요에 따라 수정 및 재사용할 수 있어 유지보수, 확장성 그리고 안정성 측면에서 유리하다.
```

## WCF를 사용하게된 이유?
- C# 으로 서버측 구현 가능
- IIS 환경에서 호스팅하기에 간편
- 실시간으로 통신하거나 데이터를 교환할 수 있는 서비스 개발이 가능; 양방향 통신도 가능
- Configuration 설정만으로 통신 프로토콜, 보안 등 여러가지 필요한 사항을 간단하게 구성

## Endpoint
WCF 서비스와의 모든 통신은 서비스의 Endpoint를 통해 수행된다. Endpoint의 속성은 다음과 같다.
- Address : 서비스를 액세스하기 위한 주소로 프로토콜 방식에 따라 차이가 있다.
- Binding : 클라이언트가 엔드포인트와 통신할 수 있는 방법을 지정하고 인증,암호화,인코딩 등 여러 메타정보를 포함한다.
- Contract : 사용 가능한 작업들을 명시한다. 서비스의 메소드나 데이터 타입들이 이에 해당한다.

## WCF 프로젝트(C#) 만들기
아래와 같이 Visual Studio에서 _C# > WCF > WCF 서비스 라이브러리 혹은 WCF 서비스 응용 프로그램_ 프로젝트를 만든다.

![service](https://helloHaneul.github.io/image/wcf/service1.png)

- IService.cs(서비스 계약 정의) : WCF 서비스 인터페이스로 메소드와 데이터 타입들을 명시한다.
```c#
namespace WcfServiceLibrary
{
    [ServiceContract]
    public interface IService
    {
        [OperationContract]
        string GetData(int value);

        [OperationContract]
        CompositeType GetDataUsingDataContract(CompositeType composite);
    }

    [DataContract]
    public class CompositeType
    {
        bool boolValue = true;
        string stringValue = "Hello ";

        [DataMember]
        public bool BoolValue
        {
            get { return boolValue; }
            set { boolValue = value; }
        }

        [DataMember]
        public string StringValue
        {
            get { return stringValue; }
            set { stringValue = value; }
        }
    }
}
```
- Service.cs(서비스 계약의 구현) : 서비스 인터페이스의 기능을 구현한다.
```c#
namespace WcfServiceLibrary
{
    public class Service : IService
    {
        public string GetData(int value)
        {
            return string.Format("You entered: {0}", value);
        }

        public CompositeType GetDataUsingDataContract(CompositeType composite)
        {
            if (composite == null)
            {
                throw new ArgumentNullException("composite");
            }
            if (composite.BoolValue)
            {
                composite.StringValue += "Suffix";
            }
            return composite;
        }
    }
}
```
- App.config : 서비스 구성 정보

```xml
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <appSettings>
    <add key="aspnet:UseTaskFriendlySynchronizationContext" value="true" />
  </appSettings>
  <system.web>
    <compilation debug="true" />
  </system.web>
  <!-- 서비스 라이브러리 프로젝트를 배포할 때 호스트의 app.config 파일에 구성 파일의 내용을 추가해야 합니다. 
  System.Configuration이 라이브러리에 대한 구성 파일을 지원하지 않습니다. -->
  <system.serviceModel>
    <services>
      <service name="WcfServiceLibrary.Service">
        <host>
          <baseAddresses>
            <add baseAddress = "http://localhost:8733/Design_Time_Addresses/WcfServiceLibrary/Service/" />
          </baseAddresses>
        </host>
        <!-- Service Endpoints -->
        <!-- 정규화되어 있지 않은 경우 주소는 위에 제공된 기본 주소에 대해 상대적입니다. -->
        <endpoint address="" binding="basicHttpBinding" contract="WcfServiceLibrary.IService">
          <!-- 
              배포 시 다음 identity 요소는 배포된 서비스를 실행할 때 사용하는 ID를 반영하도록 
              제거되거나 대체되어야 합니다. 해당 요소가 제거되면 WCF에서는 적합한 ID를 
              자동으로 유추합니다.
          -->
          <identity>
            <dns value="localhost"/>
          </identity>
        </endpoint>
        <!-- Metadata Endpoints -->
        <!-- 클라이언트가 이해하기 쉽도록 메타데이터 교환 끝점이 서비스에서 사용됩니다. --> 
        <!-- 이 끝점은 보안이 설정된 바인딩을 사용하지 않으므로 배포하기 전에 보안을 설정하거나 제거해야 합니다. -->
        <endpoint address="mex" binding="mexHttpBinding" contract="IMetadataExchange"/>
      </service>
    </services>
    <behaviors>
      <serviceBehaviors>
        <behavior>
          <!-- 메타데이터 정보를 공개하지 않으려면 
          배포하기 전에 아래 값을 false로 설정하십시오. -->
          <serviceMetadata httpGetEnabled="True" httpsGetEnabled="True"/>
          <!-- 디버깅 목적으로 오류에서 예외 정보를 받으려면 
          아래의 값을 true로 설정하십시오. 예외 정보를 공개하지 않으려면 
         배포하기 전에 false로 설정하십시오. -->
          <serviceDebug includeExceptionDetailInFaults="False" />
        </behavior>
      </serviceBehaviors>
    </behaviors>
  </system.serviceModel>
</configuration>
```

프로젝트를 빌드하고 Service.cs 파일에 커서를 두고 F5키를 누르면 WCF 테스트 클라이언트 어플이 실행된다.
WcfSvcHost.exe(WCF 서비스 호스트)가 구현된 서비스를 호스트하기 시작하면 WcfTestClient.exe(WCF 테스트 클라이언트)로 아래와 같이 서비스 각각의 메소드를 테스트 할 수 있다.

![service](https://helloHaneul.github.io/image/wcf/wcftestclient.png)

## WCF 서비스 참조하기
WCF 서비스 참조하는 클라이언트 어플리케이션 프로젝트을 만들어보자.

우선 상기의 테스트 [WCF 서비스를 IIS에 호스팅](https://github.com/iis/hostingwcf)하였다고 가정하고 진행한다.

C# console application 프로젝트를 생성하고 WCF 서비스 참조를 추가한다.

![service](https://helloHaneul.github.io/image/wcf/wcfclient1.png)

정상적으로 호스팅되고 있다면 주소를 입력하여 검색하면 아래와 같이 서비스가 확인된다.

![service](https://helloHaneul.github.io/image/wcf/wcfclient2.png)

참조된 서비스를 아래와 같이 확인할 수 있다.

![service](https://helloHaneul.github.io/image/wcf/wcfclient3.png)

서비스 인스턴스를 만들고 메소드를 호출해서 사용하면 된다.

![service](https://helloHaneul.github.io/image/wcf/wcfclient4.png)

### [참고]
[https://docs.microsoft.com/ko-kr/dotnet/framework/wcf](https://docs.microsoft.com/ko-kr/dotnet/framework/wcf)
[https://www.redhat.com/ko/topics/cloud-native-apps/what-is-service-oriented-architecture](https://www.redhat.com/ko/topics/cloud-native-apps/what-is-service-oriented-architecture)
[https://bcho.tistory.com/48](https://bcho.tistory.com/48)
[https://vsts2010.tistory.com/389](https://vsts2010.tistory.com/389)