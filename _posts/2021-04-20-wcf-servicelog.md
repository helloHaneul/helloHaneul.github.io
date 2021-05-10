---
published: true
layout: single
title: "WCF 서비스 로그"
category: WCF
tags:
comments: true
---

# WCF 서비스 로그 남기기
{: .no_toc }

WCF 서비스 동작중에 발생하는 오류의 원인 분석을 위한 로그옵션은 기본적으로는 꺼져있는 상태이다.
Web.config 파일에서 직접 설정을 입력해도 되고 아래와 같이 구성 편집기를 활용하면 config 파일에 관련내용이 자동으로 입력된다.

우선 config 파일에서 우클릭을 하면 아래와 같이 구성 편집기를 실행할 수 있다.
![config editor](https://helloHaneul.github.io/image/wcf/config.png)

'진단'탭에서 메시지 로깅과 추적 옵션을 설정한다.
![config editor](https://helloHaneul.github.io/image/wcf/config_log1.png)
![config editor](https://helloHaneul.github.io/image/wcf/config_log2.png)

생성된 Listener를 클릭하면 로그파일 경로 및 로그로 입력할 데이터를 수정할 수 있다.
![config editor](https://helloHaneul.github.io/image/wcf/config_log3.png)

편집기의 내용을 저장하면 아래의 내용이 config에 자동으로 추가입력된다.

```xml
<system.diagnostics>
    <sources>
        <source name="System.ServiceModel.MessageLogging" switchValue="경고,ActivityTracing">
        <listeners>
            <add type="System.Diagnostics.DefaultTraceListener" name="Default">
            <filter type="" />
            </add>
            <add name="ServiceModelMessageLoggingListener">
            <filter type="" />
            </add>
        </listeners>
        </source>
        <source propagateActivity="true" name="System.ServiceModel" switchValue="경고,ActivityTracing">
        <listeners>
            <add type="System.Diagnostics.DefaultTraceListener" name="Default">
            <filter type="" />
            </add>
            <add name="ServiceModelTraceListener">
            <filter type="" />
            </add>
        </listeners>
        </source>
    </sources>
    <sharedListeners>
        <add initializeData="c:\workspace\wcfservice1\wcfservice1\web_messages.svclog"
        type="System.Diagnostics.XmlWriterTraceListener, System, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089"
        name="ServiceModelMessageLoggingListener" traceOutputOptions="Timestamp">
        <filter type="" />
        </add>
        <add initializeData="c:\workspace\wcfservice1\wcfservice1\web_tracelog.svclog"
        type="System.Diagnostics.XmlWriterTraceListener, System, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089"
        name="ServiceModelTraceListener" traceOutputOptions="Timestamp">
        <filter type="" />
        </add>
    </sharedListeners>
</system.diagnostics>
```

서비스가 호스팅되기 시작하면 지정한 폴더에 .svclog 파일이 생성되고, Microsoft Service Trace Viewer(`SvcTraceViewer.exe`)를 사용하여 해당 로그 파일을 분석할 수 있다.

![service trace viewer](https://helloHaneul.github.io/image/wcf/webtracelog.png)

### [참고]
[https://docs.microsoft.com/ko-kr/dotnet/framework/wcf/diagnostics/tracing/configuring-tracing](https://docs.microsoft.com/ko-kr/dotnet/framework/wcf/diagnostics/tracing/configuring-tracing)
[https://www.codeproject.com/Articles/420538/Simple-Steps-to-Enable-Tracing-in-WCF](https://www.codeproject.com/Articles/420538/Simple-Steps-to-Enable-Tracing-in-WCF)