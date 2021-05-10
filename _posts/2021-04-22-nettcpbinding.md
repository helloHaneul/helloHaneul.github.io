---
published: true
layout: single
title: "NetTcpBinding"
category: WCF
tags:
comments: true
---

## NetTcpBinding
{: .no_toc }

NetTcpBinding은 WCF 애플리케이션 간 시스템 통신(WCF 통신만 가능)에 적합한 안전하고 최적화된 바인딩으로 인트라넷 시스템에서 통신하는데 적합한 옵셥이다.
endpoint 간의 메세지 교환에 있어서 TCP 바인딩 구성은 HTTP 바인딩으로 구성된 것에 비해 빠르게 동작한다.
이에 WCF 통신으로만 서비스와 클라이언트가 구성되는 경우에 NetTcpBinding은 보안성과 성능측면에서 괜찮은 옵션이라고 생각한다.

## NetTcpBinding 으로 양방향 통신 구현하기
NetTcpBinding 바인딩 옵션을 이용한 양방향 통신 예제이다. 간단한 채팅어플로도 확장이 가능하다.

### Service - IService.cs 
Contract를 명시하는 인터페이스 파일이다. 

`SessionMode`는 세션 지원과 관련된 설정값으로 Allowed, NotAllowed, Required 세 가지가 있다.
- SessionMode.Allowed : 세션을 지원하는 바인딩인 경우에 세션을 지원
- SessionMode.NotAllowed : 계약에서 세션을 사용하는 바인딩은 지원하지 않도록 한다.
- SessionMode.Required : 무조건 계약에서 세션을 사용할 수 있는 바인딩만 사용하도록 하는 값으로 세션을 지원하지 않는 바인딩이 설정되면 예외가 발생된다.

`CallbackContract`속성으로 지정된 콜백은 클라이언트 측에서 해당 콜백 인터페이스 구현 및 관련 메소드가 호출되어야 한다.

```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace NetTcpService
{
    [ServiceContract(SessionMode = SessionMode.Required, CallbackContract = typeof(IBroadcastorCallBack))]
    public interface IService
    {
        [OperationContract]
        string GetSessionId();

        [OperationContract(IsOneWay = true)]    // 클라이언트로부터의 회신 기다리지 않음. 리턴값 무조건 void!
        void GetInService(string id);

        [OperationContract(IsOneWay = true)]
        void Dispose(string id);

        [OperationContract(IsOneWay = true)]
        void Broadcast(string message);

        [OperationContract]
        int GetCurrentClients();
    }
    
    public interface IBroadcastorCallBack
    {
        [OperationContract(IsOneWay = true)]
        void SendMessage(string message);
    }
}
```

### Service - Service.svc.cs
Contract에 해당하는 동작을 구현

`InstanceContextMode`는 서비스 인스턴스 관리에 대한 설정값이다.
- InstanceContextMode.PerCall : 클라이언트의 메소드 호출시 마다 서비스 인스턴스가 생성되고 메소드가 종료되면 해당 인스턴스를 삭제하는 구조로 가장 간단하고도 안전한 모델(?)
- InstanceContextMode.PerSession : 서비스와 연결된 세션이 유지되는 동안 서비스 인스턴스 또한 삭제하지 않고 유지하는 구조
- InstanceContextMode.Single : 하나의 서비스 인스턴스가 생성되고 모든 클라이언트로부터의 요청을 하나의 인스턴스가 처리

`ConcurrencyMode`는 서비스 클래스의 스레드 작업 설정값이다.
- ConcurrencyMode.Multiple : 한번에 여러 스레드가 서비스 개체를 실행(스레드 체크 필요)
- ConcurrencyMode.Reentrant : 서비스가 작업을 수행하는 동안 다른 요청의 진입을 허용한다.
- ConcurrencyMode.Single : 서비스 인스턴스가 단일 스레드로 동작하도록 한다. 'InstanceContextMode.Single'이면서 'ConcurrencyMode.Single'인 경우에 서비스에서 호출을 처리하는 동안 요청이 들어오면 대기를 해야한다.

```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace NetTcpService
{
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.Single, ConcurrencyMode = ConcurrencyMode.Single)]
    public class Service : IService
    {
        private static Dictionary<string, IBroadcastorCallBack> clients = new Dictionary<string, IBroadcastorCallBack>();  // session ID, callback

        public string GetSessionId()
        {
            return OperationContext.Current.SessionId;
        }

        public void GetInService(string id)
        {
            OperationContext.Current.Channel.Closed += new EventHandler(Channel_Closed);
            OperationContext.Current.Channel.Faulted += new EventHandler(Channel_Faulted);

            IBroadcastorCallBack callback = OperationContext.Current.GetCallbackChannel<IBroadcastorCallBack>();

            if (!clients.Keys.Contains(id))
            {
                clients.Add(id, callback);
            }          
        }

        void Channel_Closed(object sender, EventArgs e)
        {
            IClientChannel clientChannel = sender as IClientChannel;
            Dispose(clientChannel.SessionId);
        }

        void Channel_Faulted(object sender, EventArgs e)
        {
            IClientChannel clientChannel = sender as IClientChannel;
            Dispose(clientChannel.SessionId);
        }

        public void Dispose(string id)
        {
            if (clients.Keys.Contains(id))
            {
                clients.Remove(id);
            }
        }

        public int GetCurrentClients()
        {
            return clients.Count;
        }

        public void Broadcast(string message)
        {
            foreach (var client in clients)
            {
                client.Value.SendMessage(message);
            }
        }
    }
}
```

### Service - Web.config
net.tcp 바인딩을 구성하는 파일
- sendTimeout, receiveTimeout : 메서드 호출 시간과 관련된 설정값
- maxBufferPoolSize, maxBufferSize, maxReceivedMessageSize: 전송할당량과 관련된 설정값

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <appSettings>
    <add key="aspnet:UseTaskFriendlySynchronizationContext" value="true" />
  </appSettings>
  <system.web>
    <compilation debug="true" targetFramework="4.5" />
    <httpRuntime targetFramework="4.5"/>
  </system.web>
  <system.serviceModel>
    <services>
      <service name="NetTcpService.Service">
        <endpoint binding="netTcpBinding" contract="NetTcpService.IService" bindingConfiguration="TestBinding" />
        <endpoint address="mex" binding="mexTcpBinding" contract="IMetadataExchange" />
      </service>
    </services>
    <bindings>
      <netTcpBinding>
        <binding name="TestBinding" receiveTimeout="00:10:00" sendTimeout="00:10:00" maxBufferPoolSize="67108864" maxBufferSize="8388608" maxReceivedMessageSize="8388608">
          <security mode="None">
            <transport clientCredentialType="None" />
            <message clientCredentialType="None" />
          </security>
        </binding>
      </netTcpBinding>
    </bindings>
    <behaviors>
      <serviceBehaviors>
        <behavior>
          <!-- 메타데이터 정보를 공개하지 않으려면 배포하기 전에 아래 값을 false로 설정하십시오. -->
          <serviceMetadata httpGetEnabled="true" httpsGetEnabled="true"/>
          <!-- 디버깅 목적으로 오류에서 예외 정보를 받으려면 아래의 값을 true로 설정하십시오. 예외 정보를 공개하지 않으려면 배포하기 전에 false로 설정하십시오. -->
          <serviceDebug includeExceptionDetailInFaults="false"/>
        </behavior>
      </serviceBehaviors>
    </behaviors>
    <protocolMapping>
        <add binding="netTcpBinding" bindingConfiguration="TestBinding" scheme="http" />
    </protocolMapping>    
    <serviceHostingEnvironment aspNetCompatibilityEnabled="true" multipleSiteBindingsEnabled="true" />
  </system.serviceModel>
  <system.webServer>
    <modules runAllManagedModulesForAllRequests="true"/>
    <!--
        디버깅 중에 웹 응용 프로그램 루트 디렉터리를 찾으려면 아래 값을 true로 설정하십시오.
        웹 응용 프로그램 폴더 정보를 공개하지 않으려면 배포 전에 false로 설정하십시오.
      -->
    <directoryBrowse enabled="true"/>
  </system.webServer>
</configuration>
```

### Client Application (C# Console)
상기의 서비스를 이용하는 클라이언트 어플리케이션 예제이다.

console 기반의 c# 프로젝트를 생성하고 아래와 같이 서비스를 참조한다.

![service](https://helloHaneul.github.io/image/wcf/wcfclient1.png)

![service](https://helloHaneul.github.io/image/wcf/wcfclient2.png)

![service](https://helloHaneul.github.io/image/wcf/wcfclient3.png)

서비스가 성공적으로 참조가 되면 서비스에서 제공하는 API들을 사용해서 아래와 같이 클라이언트 프로그램을 짤 수 있다.
아래 클라이언트 예제는 다른 클라이언트로부터 이벤트를 받을 콜백을 서비스에 등록하면서 서비스에 접속을 하고, 사용자 입력을 받아 다른 클라이언트들에게 메세지를 전달하고 종료되는 예제이다.

```c#
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleClient
{
    public class BroadcastCallback : BroadcastService.IServiceCallback
    {
        private System.Threading.SynchronizationContext syncContext = AsyncOperationManager.SynchronizationContext;

        public EventHandler _callbackHandler;

        private void OnReceived(object message)
        {
            this._callbackHandler.Invoke(message, null);
        }

        public void SendMessage(string message)
        {
            syncContext.Post(new System.Threading.SendOrPostCallback(OnReceived), message);
        }
    }

    class Program
    {
        static void event_reached(object sender, EventArgs e)
        {
            string message = sender.ToString();
            
            Console.WriteLine();
            Console.WriteLine("!!!!!!! Callback from server !!!!!!!");
            Console.WriteLine();
            Console.WriteLine(message);
            Console.WriteLine();
            Console.WriteLine("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        }

        static void Main(string[] args)
        {
            BroadcastCallback callback = new BroadcastCallback();
            callback._callbackHandler += event_reached;

            InstanceContext context = new InstanceContext(callback);

            BroadcastService.ServiceClient service = new BroadcastService.ServiceClient(context);

            string id = service.GetSessionId();

            Console.WriteLine("Current session id : " + id);

            service.GetInService(id);

            int num = service.GetCurrentClients();

            Console.WriteLine("Current clients : " + num);

            Console.Write("If you want to send message, please insert 'go' >> ");

            string s = Console.ReadLine();

            if (s.Equals("go"))
            {
                Console.Write("Send message >> ");
                string msg = Console.ReadLine();
                service.Broadcast(msg);
            }

            service.Dispose(id);
        }
    }
}
```

### [참고]
[https://docs.microsoft.com/ko-kr/dotnet/api/system.servicemodel.nettcpbinding?view=dotnet-plat-ext-5.0](https://docs.microsoft.com/ko-kr/dotnet/api/system.servicemodel.nettcpbinding?view=dotnet-plat-ext-5.0)
[https://docs.microsoft.com/ko-kr/dotnet/api/system.servicemodel.sessionmode?view=dotnet-plat-ext-5.0](https://docs.microsoft.com/ko-kr/dotnet/api/system.servicemodel.sessionmode?view=dotnet-plat-ext-5.0)
[https://docs.microsoft.com/ko-kr/dotnet/api/system.servicemodel.servicebehaviorattribute.concurrencymode?view=netframework-4.8#System_ServiceModel_ServiceBehaviorAttribute_ConcurrencyMode](https://docs.microsoft.com/ko-kr/dotnet/api/system.servicemodel.servicebehaviorattribute.concurrencymode?view=netframework-4.8#System_ServiceModel_ServiceBehaviorAttribute_ConcurrencyMode)
[https://docs.microsoft.com/ko-kr/dotnet/framework/wcf/feature-details/transport-quotas](https://docs.microsoft.com/ko-kr/dotnet/framework/wcf/feature-details/transport-quotas)
[http://www.simpleisbest.net/articles/1731.aspx](http://www.simpleisbest.net/articles/1731.aspx)
[https://www.shblitz.net/1036](https://www.shblitz.net/1036)
[https://www.codeproject.com/Articles/188749/WCF-Sessions-Brief-Introduction](https://www.codeproject.com/Articles/188749/WCF-Sessions-Brief-Introduction)
[https://www.sysnet.pe.kr/2/0/535](https://www.sysnet.pe.kr/2/0/535)