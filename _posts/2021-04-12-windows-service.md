---
published: true
layout: single
title: "Windows 서비스 프로그램"
category: Windows
tags:
comments: true
---

# Windows Service
{: .no_toc }

Windows 실행 중에 UI 없이 백그라운드로 실행되는 프로그램이며 리눅스의 데몬과 비슷한 개념의 프로그램이다.
주로 서버에서 사용하거나 다른 사용자를 방해하지 않는 장기 실행 기능이 필요한 경우에 이용된다.

※ Windows 서비스 생명주기
1. `서비스 등록` : Windows 시스템내의 서비스제어관리자 유틸리티로 설치한 서비스가 로드된다.
2. `서비스 시작` : 서비스 어플리케이션 내의 'OnStart' 메서드가 수행된다.
3. `서비스 동작/일시중지/중지` : 시작된 서비스의 상태는 'Running', 'Paused', 'Stopped' 이 세 가지 중에 하나일 수 있다.

windows 서비스 어플리케이션은 `System.ServiceProcess.ServiceBase` 클래스에서 상속되는 클래스를 기반으로 한다.

주요 메소드는 다음과 같다.

|메소드|내용|
|---|--------------------------|
|OnStart|서비스 실행이 시작될 때 수행할 작업을 지정합니다. 서비스가 유용한 작업을 수행하려면 이 프로시저에 코드를 작성해야 합니다.|
|OnPause|서비스가 일시 중지될 경우 수행할 작업을 지정합니다.|
|OnStop|서비스 실행이 중지될 경우 수행할 작업을 지정합니다.|
|OnContinue|서비스가 일시 중지되었다가 정상 작동을 재개할 경우 수행할 작업을 지정합니다.|
|OnShutdown|서비스가 실행 중일 때 시스템이 종료될 경우 종료 직전에 수행할 작업을 지정합니다.|
|OnCustomCommand|서비스가 사용자 지정 명령을 받을 경우 수행할 작업을 지정합니다. 사용자 지정 명령에 대한 자세한 내용은 MSDN Online을 참조하세요.|
|OnPowerEvent|배터리 부족 또는 일시 중단된 작업과 같은 전원 관리 이벤트가 수신될 경우 서비스가 응답할 방법을 지정합니다.|

## Windows 서비스 프로젝트 개발

C# 기반으로 Windows 서비스 프로그램을 개발하는 방법에 대해 정리하려고 한다.

우선 Visual Studio 에서 아래와 같이 Window 서비스 프로젝트를 생성한다.
![step1](https://helloHaneul.github.io/image/winservice/step1.png)

### 1. 사용자 지정 이벤트 로그
이벤트 뷰어 어플리케이션을 통해서 서비스가 실제로 실행되는 동안에 쌓이는 로그를 확인할 수 있다.

![eventlog](https://helloHaneul.github.io/image/winservice/eventlog.png)

▼ 서비스 어플리케이션에서 로그 출력을 위한 예제 코드

```csharp
public MyService()
{
    InitializeComponent();

    Environment.CurrentDirectory = "C:\\Program Files\\Workspace\\MyService";
            
    this.ServiceName = "MyService";
    this.CanShutdown = true;
    this.CanHandlePowerEvent = true;
    
    this.AutoLog = false;

    if (System.Diagnostics.EventLog.SourceExists(this.ServiceName))
    {
        string logName = System.Diagnostics.EventLog.LogNameFromSourceName(this.ServiceName, ".");
        if (!logName.Equals("My Service Log"))
        {
            System.Diagnostics.EventLog.DeleteEventSource(this.ServiceName);
            System.Diagnostics.EventLog.Delete(logName);
        }
    }
    else
    {
        EventLog.CreateEventSource(this.ServiceName, "My Service Log");
    }

    this.EventLog.Source = this.ServiceName;
    this.EventLog.Log = "My Service Log";
}
```

### 2. 서비스가 시작될 때
```csharp
protected override void OnStart(string[] args)
{
    this.EventLog.WriteEntry("My service process is started!", EventLogEntryType.Information, 100);
}
```

### 3. 서비스가 중지될 때
```csharp
protected override void OnStop()
{
    this.EventLog.WriteEntry("My Service OnStop!", EventLogEntryType.Warning, 100);
}
```

### 4. 컴퓨터 전원 상태가 변경될 때
```csharp
protected override bool OnPowerEvent(PowerBroadcastStatus powerStatus)
{
    string message = "[OnPowerEvent] ";

    switch (powerStatus)
    {
        case PowerBroadcastStatus.QuerySuspend:
            message += "PowerBroadcastStatus : QuerySuspend\nThe system has requested permission to suspend the computer.";
            break;
        case PowerBroadcastStatus.Suspend:
            message += "PowerBroadcastStatus : Suspend\nThe computer is about to enter a suspended state.";
            break;
        case PowerBroadcastStatus.ResumeSuspend:
            message += "PowerBroadcastStatus : ResumeSuspend\nThe system has resumed operation after being suspended.";
            break;
        case PowerBroadcastStatus.ResumeAutomatic:
            message += "PowerBroadcastStatus : ResumeAutomatic\nThe computer has woken up automatically to handle an event.";
            break;
        case PowerBroadcastStatus.QuerySuspendFailed:
            message += "PowerBroadcastStatus : QuerySuspendFailed\nThe system was denied permission to suspend the computer.";
            break;
        case PowerBroadcastStatus.ResumeCritical:
            message += "PowerBroadcastStatus : ResumeCritical\nThe system has resumed operation after a critical suspension caused by a failing battery.";
            break;
        case PowerBroadcastStatus.BatteryLow:
            message += "PowerBroadcastStatus : BatteryLow\nBattery power is low.";
            break;
        case PowerBroadcastStatus.OemEvent:
            message += "PowerBroadcastStatus : OemEvent\nAn Advanced Power Management (APM) BIOS signaled an APM OEM event.";
            break;
        case PowerBroadcastStatus.PowerStatusChange:
            message += "PowerBroadcastStatus : PowerStatusChange\nA change in the power status of the computer is detected, such as a switch from battery power to A/C.";
            break;
    }

    return base.OnPowerEvent(powerStatus);
}
```

## 서비스 등록을 위한 배치파일(*.bat)
프로그램(Test_winService.exe)을 윈도우즈 서비스로 등록 및 삭제를 위한 스크립트 예시이다.  
InstallUtil.exe 유틸리티로 서비스의 실행파일 경로를 전달하면 어플리케이션을 서비스로 설치할 수 있다.

- 서비스 등록

```bat
@echo off

REM The following directory is for .NET 4.0
set DOTNETFX2=%SystemRoot%\Microsoft.NET\Framework\v4.0.30319
set BATCHPATH=%~dp0

echo Installing Service...
echo ---------------------------------------------------------------
"%DOTNETFX2%\InstallUtil.exe" "%BATCHPATH%\Test_winService.exe"
echo ---------------------------------------------------------------
net start Service
echo ---------------------------------------------------------------
echo Done.
```

- 서비스 삭제

```bat
@echo off

REM The following directory is for .NET 4.0
set DOTNETFX2=%SystemRoot%\Microsoft.NET\Framework\v4.0.30319
set BATCHPATH=%~dp0

echo Uninstalling Service...
echo ---------------------------------------------------------------
net stop Service
echo ---------------------------------------------------------------
"%DOTNETFX2%\InstallUtil.exe" /u "%BATCHPATH%\Test_winService.exe"
echo ---------------------------------------------------------------
echo Done.
```

[참고]
[https://docs.microsoft.com/ko-kr/dotnet/framework/windows-services/introduction-to-windows-service-applications](https://docs.microsoft.com/ko-kr/dotnet/framework/windows-services/introduction-to-windows-service-applications)
[https://docs.microsoft.com/ko-kr/dotnet/framework/windows-services/walkthrough-creating-a-windows-service-application-in-the-component-designer](https://docs.microsoft.com/ko-kr/dotnet/framework/windows-services/walkthrough-creating-a-windows-service-application-in-the-component-designer)