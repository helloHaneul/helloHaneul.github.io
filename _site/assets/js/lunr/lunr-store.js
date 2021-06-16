var store = [{
        "title": "Recycler View",
        "excerpt":"RecyclerView Table of contents RecyclerView 화면 레이아웃에 추가 어댑터 추가 RecyclerView 리싸이클러뷰는 리스트뷰처럼 상하 스크롤이 가능하게 만들 수도 있고 좌우 스크롤이 가능하게 만들 수도 있습니다. 왜냐하면 처음 만들어질 때부터 레이아웃을 유연하게 구성할 때 있도록 설계되었기 때문입니다. 그리고 각각의 아이템이 화면에 보이는 과정에서 메모리를 덜 사용하도록 캐시 메커니즘(ViewHolder)이 구현되어 있습니다. 화면...","categories": ["Android"],
        "tags": [],
        "url": "/android/recyclerview/",
        "teaser": null
      },{
        "title": "Build FW Image",
        "excerpt":"Tips for build F/W Image   BootLoader  대개 오픈소스를 기반으로 CPU 의존적인 부분만 수정하여 사용하는 경우가 일반적이다. 참고사이트   오픈소스 부트로더 : U-Boot   Kernel  uImage 생성을 위해서는 mkimage 유틸리티가 빌드환경에 설치되어있어야 한다.  $sudo apt-get install u-boot-tools  ","categories": ["Embedded Linux"],
        "tags": [],
        "url": "/embedded%20linux/buildImage/",
        "teaser": null
      },{
        "title": "Dev Server Setting",
        "excerpt":"Embedded Linux 개발서버 구축 참고사이트 Linux OS 설치 빌드 환경 구축에서 처음 수행해야하는 단계는 Host PC에 리눅스 OS를 설치하는 것. 선정된 개발보드사에서 제공하는 BSP(Board Support Package)에서 추천하는 리눅스 환경을 설치하는 것도 좋은 방법이다. 우선 리눅스OS 설치가 완료되면 크게 세가지 서비스 셋업이 필요하다. Samba 설정 윈도우와 파일 공유를 하기 위한 서비스 NFS...","categories": ["Embedded Linux"],
        "tags": [],
        "url": "/embedded%20linux/devserver/",
        "teaser": null
      },{
        "title": "WebRTC",
        "excerpt":"WebRTC audio, video, data를 웹과 native 앱 등에서 실시간으로 통신할 수 있게 해주는 오픈 소스 프로젝트 Signaling? p2p 연결을 설정하는데 사용되는 정보를 siganl이라고 표현하며 RTCPeerConnection들이 적절하게 데이터를 교환할 수 있게 처리해주는 과정을 signaling 이라고 함. Session control messages: 통신의 초기화, 종료, 그리고 에러 리포트 Network configuration : 외부에서 보는 내...","categories": ["WebRTC"],
        "tags": [],
        "url": "/webrtc/webrtc/",
        "teaser": null
      },{
        "title": "화상채팅 서비스 개발 프로젝트",
        "excerpt":"화상채팅 서비스 개발 Table of contents 개요 주요기능 WebRTC관련 기능 시스템 구성 계획 시그널링 서버 ICE 서버(STUN,TURN) 기본적인 서비스를 호스팅하는 서버 SSL 발급 도메인 발급 모바일 어플리케이션 TODO 개요 화상채팅 기반 온라인 필라테스 1:1 레슨 서비스 주요기능 화상채팅 기능은 WebRTC 기반으로 구현한다. 회원별 체형, 자세 및 건강이력 관리 처음 사용하는...","categories": [],
        "tags": [],
        "url": "/videochat/",
        "teaser": null
      },{
        "title": "webRTC for android",
        "excerpt":"Android WebRTC  android native app으로 webrtc 기능 구현을 위한 스터디   참고 사이트  socket.io, google-webrtc 라이브러리 사용한 예제 : https://github.com/pchab/AndroidRTC   android webRTC 참고 : https://juyoung-1008.tistory.com/25  ","categories": ["WebRTC"],
        "tags": [],
        "url": "/webrtc/webrtcForandroid/",
        "teaser": null
      },{
        "title": "Docker",
        "excerpt":"Docker 컨테이너 기반 가상화 도구 도커는 리눅스 상에서 컨테이너 방식으로 프로세스를 격리해서 실행하고 관리할 수 있도록 도와주며, 계층화된 파일 시스템에 기반해 효율적으로 이미지(프로세스 실행 환경)을 구축할 수 있도록 해줍니다. 도커 패키지 구성 도커는 크게 도커 엔진과 클라이언트로 나뉩니다. 도커 엔진은 서버로 동작하며, 시스템 상에 서비스로 등록 됩니다. 도커 클라이언트는 사용자가...","categories": ["docker"],
        "tags": [],
        "url": "/docker/docker/",
        "teaser": null
      },{
        "title": "coturn",
        "excerpt":"Coturn 오픈소스 TURN,STUN Server 공유기 사용시 포트포워딩 3478, 5349 포트 지정(TCP,UDP) Coturn 설치 설치 환경 : Ubuntu 18.04 설치 방법 apt-get install github에서 clone 하여 직접 빌드하여 설치 Coturn 빌드하자 ! 빌드 및 실행을 위한 패키지 설치 apt-get update apt-get install net-tools apt-get install firewalld apt-get install curl apt-get install...","categories": ["WebRTC"],
        "tags": [],
        "url": "/webrtc/coturn/",
        "teaser": null
      },{
        "title": "appRTC",
        "excerpt":"AppRTC server set up https://github.com/webrtc/apprtc.git 구성 apprtc : session room server colider : signaling server nginx : reverse proxy server; HTTPS 접속을 위해 설정 필요 coturn : turn server 환경설정 NodeJS 및 패키지 설치 $ cd apprtc $ npm install Grunt 설치 $ npm -g install grunt-cli Nginx 설치 Python,...","categories": ["WebRTC"],
        "tags": [],
        "url": "/webrtc/apprtc/",
        "teaser": null
      },{
        "title": "USB Device",
        "excerpt":"USB Device Driver Package in Windows Windows 환경에서 디바이스 드라이버는 보통 세 가지 파일로 구성이 된다. Driver Files (*.sys) : 장비의 입출력 인터페이스를 제공하는 실제 디바이스 드라이버 파일 Installation Files (*.inf) : Windows 환경에서 드라이버 설치시에 필요한 텍스트 파일로 사용할 드라이버 파일, 레지스트리 정보, VID/PID 정보 등등 설치할 디바이스와 파일에...","categories": ["Device Driver"],
        "tags": [],
        "url": "/device%20driver/usb-driver/",
        "teaser": null
      },{
        "title": "WHQL Driver Signing",
        "excerpt":"WHQL (Windows Hardware Quality Labs) Windows 환경에서의 해당 장치의 드라이버 사용을 신뢰할 수 있다는 인증으로 해당 인증을 받지 않은 드라이버 설치시에 경고창이 발생한다. DUA submission .sys 파일에 변경사항이 없거나 .inf 파일에서의 수정사항이 기능에 영향을 주지 않는 범위일 경우 별다른 OS 호환성 테스트를 거치지 않고 catalog 파일을 업데이트 받을 수 있다....","categories": ["Device Driver"],
        "tags": [],
        "url": "/device%20driver/whql/",
        "teaser": null
      },{
        "title": "CivetWeb",
        "excerpt":"CivetWeb c/c++ 어플리케이션에 내장하여 사용하기위한 오픈소스 임베디드용 웹서버. https://github.com/civetweb/civetweb CivetWeb 특징 MIT 라이센스 Windows, Mac, Linux, UNIX, iPhone, Android 여러 플랫폼에서 사용 가능 CGI, SSI, HTTP digest (MD5) 인증, WebSocket 지원 OpenSSL을 사용하여 HTTPS(SSL/TLS) 지원 Windows service 형태로 실행 가능 Websocket 클라이언트 기능 사용 가능 (WS/WSS) CivetWeb 내장하여 사용하기 c/c++...","categories": ["Mongoose Web Server"],
        "tags": [],
        "url": "/mongoose%20web%20server/civetweb/",
        "teaser": null
      },{
        "title": "Socket.io",
        "excerpt":"Socket.io c++ client 사용하기 web server에서 linux daemon과 windows application(C#)으로 이벤트를 보내야하는 상황으로 양방향 메시지 송수신이 필요했다. 이를 위해 사용한 것이.. socket.io C++ client 우선 SioChatDemo 예제를 기반으로 socket.io c++ client 라이브러리를 만들고 이를 기반으로 웹서버로부터 이벤트를 수신할 수 있는 어플리케이션을 개발했다. Windows : SioChatDemo.sln Linux : cmake 사용 $...","categories": ["NodeJS"],
        "tags": [],
        "url": "/nodejs/socketio/",
        "teaser": null
      },{
        "title": "Import 3rd party library",
        "excerpt":"Qt project 파일(*.pro)에서 라이브러리 import 하는 방법 3rd party 라이브러리를 사용해야하는 경우에 qmake가 해당 라이브러리를 찾을 수 있도록 프로젝트(.pro)파일에서 LIBS 변수에 추가를 해야한다. 방법은 아래와 같다. LIBS += -L\"3rdparty/CatWhisperer/lib\" -lCatWhisperer 우선 -L옵션으로 링커가 라이브러리 파일이 있는 디렉토리를 명시하고, -l 옵션으로는 링크할 라이브러리를 명시한다. 이 때 libary 확장자(.so 혹은 .a)까지 지정할...","categories": [],
        "tags": [],
        "url": "/importLib/",
        "teaser": null
      },{
        "title": "signal&slot",
        "excerpt":"Signal &amp; Slot qt 자체가 처음이었을때… qt를 이용한 GUI 프로그래밍 중에 별도의 라이브러리에서 제공하는 콜백으로 들어오는 데이터로 QObject의 UI를 업데이트해줘야하는 상황이었다. 이는 non GUI thread에서 gui thread의 객체에 접근하는 경우였다. MFC나 .Net과 같은 다른 프레임웍에서도 비슷한 개념들이 존재하지만 Qt는 이러한 경우에 Signal &amp; Slot을 사용해야 한다. 우선 시그널/슬롯은 오브젝트간 통신을...","categories": [],
        "tags": [],
        "url": "/signalNslot/",
        "teaser": null
      },{
        "title": "IIS 설치(Windows 10)",
        "excerpt":"IIS(Internet Information Service) 설치하기 IIS 웹서버는 Windows 10 환경에서는 기능 활성화만 하면 사용이 가능하다. 1. Windows 기능 켜기/끄기 실행 (제어판 -&gt; 프로그램에서 실행 가능) 2. IIS 기능 켜기 IIS(Internet Information Service) 확장하고 FTP 서버 기능을 제외한 모든 하위 기능을 켠다. 3. .NET Framework 기능 켜기 .NET Framework 기능을 확장하고 모든...","categories": ["IIS"],
        "tags": [],
        "url": "/iis/howtoinstalliis/",
        "teaser": null
      },{
        "title": "Windows 방화벽 포트열기",
        "excerpt":"Windows 방화벽 포트 열기   1. 제어판 &gt; 시스템 및 보안 &gt; Windows Defender 방화벽 &gt; 고급설정 페이지      2. 포트 설정 (인바운드 새 규칙 추가)           3. 포트 설정 완료     ","categories": ["Windows"],
        "tags": [],
        "url": "/windows/windows-firewall/",
        "teaser": null
      },{
        "title": "MS-SQL 설치",
        "excerpt":"MS-SQL 설치하기 1. MS-SQL server 2014 express 다운로드 관련 패키지(server,management studio)를 한번에 모두 설치할 떄는 advanced 버전으로 설치를 진행한다. 2. Installer 실행 .NET framework 3.5 와 4.0 그리고 Mircrosoft visual studio 2010 재배포 가능 패키지와 같은 MS SQL server 설치에 필요한 항목들이 우선 설치되어 있어야 한다. 인스턴스 ID는 생성할 Database의...","categories": ["MS-SQL"],
        "tags": [],
        "url": "/ms-sql/installmssql/",
        "teaser": null
      },{
        "title": "Windows 서비스 프로그램",
        "excerpt":"Windows Service Windows 실행 중에 UI 없이 백그라운드로 실행되는 프로그램이며 리눅스의 데몬과 비슷한 개념의 프로그램이다. 주로 서버에서 사용하거나 다른 사용자를 방해하지 않는 장기 실행 기능이 필요한 경우에 이용된다. ※ Windows 서비스 생명주기 서비스 등록 : Windows 시스템내의 서비스제어관리자 유틸리티로 설치한 서비스가 로드된다. 서비스 시작 : 서비스 어플리케이션 내의 ‘OnStart’ 메서드가...","categories": ["Windows"],
        "tags": [],
        "url": "/windows/windows-service/",
        "teaser": null
      },{
        "title": "trigger",
        "excerpt":"MS-SQL 트리거 데이터베이스 서버에서 이벤트가 발생하면 자동으로 실행되는 특수한 종류의 저장 프로시저. 예를 들어 사원 출입권한 테이블에 추가,수정 및 삭제 이벤트가 발생하면 연관된 사원 테이블에서 해당 사원의 마지막 수정시간이 자동으로 업데이트되도록 다른 테이블에 추가 동작을 지시할 수 있는 기능이라고 볼 수 있다. 트리거는 아래와 같이 다양한 경우에서 사용된다. 테이블에 입력되는...","categories": ["MS-SQL"],
        "tags": [],
        "url": "/ms-sql/trigger/",
        "teaser": null
      },{
        "title": "stored procedure",
        "excerpt":"MS-SQL 저장 프로시저 저장 프로시저 ? 저장 프로시저란 일련의 쿼리를 하나의 함수처럼 실행하기 위한 쿼리의 집합으로 데이터베이스에서 수행하는 프로그래밍문이라고 할 수 있다. 하나의 프로그램처럼 입력 매개 변수 전달이 가능하며 호출하는 프로그램에서 상태 값을 반환하여 성공 또는 실패 및 실패 원인을 파악할 수 있다. 그리고 저장 프로시저를 사용하기 위해서는 해당 데이터베이스의...","categories": ["MS-SQL"],
        "tags": [],
        "url": "/ms-sql/storedprocedure/",
        "teaser": null
      },{
        "title": "IIS에서 WCF 서비스 호스팅하기",
        "excerpt":"WCF 서비스 호스팅 IIS에서 WCF 서비스를 호스팅해보자 1. 응용프로그램풀 추가 응용프로그램풀은 서버에 올리고자하는 어플리케이션을 프로세스 단위로 분리하기 위해 사용한다. 우선 응용프로그램풀을 상위에 만들고 그 아래에 어플리케이션을 등록하여 사용하는 형태인데 이는 서버에 있는 다른 어플리케이션에 영향을 주지 않도록 돕기 때문에 호스팅하는 서비스마다 풀을 이용하여 분리하여 사용하는 것이 좋다. 2. 웹 사이트...","categories": ["IIS"],
        "tags": [],
        "url": "/iis/hostingwcf/",
        "teaser": null
      },{
        "title": "WCF 개요",
        "excerpt":"WCF(Windows Communication Foundation) 서비스 지향적인 아키텍처(SOA) 어플리케이션을 구현을 위해 만들어진 Contract 기반의 프레임워크. ※ SOA? SOA란 여러 서비스(독립적인 소프트웨어 기능 단위 또는 기능 모음)를 서로 조합하여 새로운 업무 기능을 구성하는 소프트웨어 아키텍쳐이다. SOA는 SOAP(어떠한 운영체제, 플랫폼이든 이해할 수 있는 형식의 표준 네트워크 프로토콜) 혹은 이외의 다양한 프로토콜 방식을 사용하여 외부로...","categories": ["WCF"],
        "tags": [],
        "url": "/wcf/wcf-introduction/",
        "teaser": null
      },{
        "title": "WCF 서비스에서 MS-SQL Server 연결",
        "excerpt":"WCF 프로젝트에서 MS-SQL Server 사용하기 MS-SQL Server와 초기 연결 1. 소스 코드에서 SqlConnection 클래스 이용하여 연결하는 방법 SqlConnectionStringBuilder connStringBuilder = null; connStringBuilder = new SqlConnectionStringBuilder(); connStringBuilder.DataSource = \"DESKTOP-5VTCE9S\\SQLEXPRESS_2014\"; // 연결할 SQL Server 인스턴스의 이름이나 네트워크 주소 connStringBuilder.InitialCatalog = \"DatabaseName\"; // 데이터베이스 이름 connStringBuilder.UserID = \"userID\"; connStringBuilder.Password = \"password\"; connStringBuilder.Encrypt =...","categories": ["WCF"],
        "tags": [],
        "url": "/wcf/wcflinkMssql/",
        "teaser": null
      },{
        "title": "Binding",
        "excerpt":"Binding ? 바인딩은 WCF 서비스의 Endpoint 연결에 필요한 통신 세부 정보(프로토콜, 인코딩 방식 등)를 지정하는데 사용되는 개체이다. 바인딩에 들어가는 정보는 매우 복잡할 수 있고 일부 설정이 다른 설정과 호환되지 않을 수 있기에 WCF에서 제공하는 시스템 제공 바인딩을 사용하는 것이 쉬운 방법이다. 바인딩을 정의할 때는 코드에 작성하는 것보다 구성파일(Web.config)에 작성하면 서비스관리자가...","categories": ["WCF"],
        "tags": [],
        "url": "/wcf/binding/",
        "teaser": null
      },{
        "title": "WCF 서비스 로그",
        "excerpt":"WCF 서비스 로그 남기기 WCF 서비스 동작중에 발생하는 오류의 원인 분석을 위한 로그옵션은 기본적으로는 꺼져있는 상태이다. Web.config 파일에서 직접 설정을 입력해도 되고 아래와 같이 구성 편집기를 활용하면 config 파일에 관련내용이 자동으로 입력된다. 우선 config 파일에서 우클릭을 하면 아래와 같이 구성 편집기를 실행할 수 있다. ‘진단’탭에서 메시지 로깅과 추적 옵션을 설정한다....","categories": ["WCF"],
        "tags": [],
        "url": "/wcf/wcf-servicelog/",
        "teaser": null
      },{
        "title": "NetTcpBinding",
        "excerpt":"NetTcpBinding NetTcpBinding은 WCF 애플리케이션 간 시스템 통신(WCF 통신만 가능)에 적합한 안전하고 최적화된 바인딩으로 인트라넷 시스템에서 통신하는데 적합한 옵셥이다. endpoint 간의 메세지 교환에 있어서 TCP 바인딩 구성은 HTTP 바인딩으로 구성된 것에 비해 빠르게 동작한다. 이에 WCF 통신으로만 서비스와 클라이언트가 구성되는 경우에 NetTcpBinding은 보안성과 성능측면에서 괜찮은 옵션이라고 생각한다. NetTcpBinding 으로 양방향 통신...","categories": ["WCF"],
        "tags": [],
        "url": "/wcf/nettcpbinding/",
        "teaser": null
      },{
        "title": "CORS",
        "excerpt":"CORS 허용하기 civetweb을 기반으로 만들어진 api server와 web client page를 서비스하는 서버가 각각 다른 도메인에서 동작(포트만 달라도 다른 도메인)한다는 가정하에.. 이러한 경우에 클라이언트 입장에서는 도메인이 다른서버(civetweb)에 요청을 하게 되는 상황으로 이슈(“No Access-Control-Allow-Origin”)가 발생할 수 있다! SOP(same-origin policy) 보안상의 이유로 브라우저단에서 다른 출처의 리소스를 접근하는 것을 막는 정책 CORS(Cross Origin Request)...","categories": ["Mongoose Web Server"],
        "tags": [],
        "url": "/mongoose%20web%20server/cors/",
        "teaser": null
      },{
        "title": "Embedded OS",
        "excerpt":"Embedded OS OS vs Kernel 아래의 도표에서 보이듯 Kernel은 OS의 일부분으로 OS와 Kernel의 차이는 다음과 같다. OS(운영체제) : 응용 프로그램과 컴퓨터 하드웨어 사이의 중재 역할을 하며, 실행되는 응용프로그램들이 메모리와 CPU, 입출력 장치 등의 자원 등을 사용할 수 있도록 다양한 서비스를 제공하는 시스템 소프트웨어 Kernel : 운영체제의 가장 핵심적인 역할을 하는...","categories": ["Embedded Linux"],
        "tags": [],
        "url": "/embedded%20linux/embeddedos/",
        "teaser": null
      },{
        "title": "Linux Kernel",
        "excerpt":"Linux Kernel 커널은 하드웨어를 관리하고 시스템 자원을 분배하는 소프트웨어로 운영체제의 핵심이며 커널은 시스템의 다른 모든 부분을 위한 기본적인 서비스를 제공한다. 리눅스 커널의 역할을 간략하게 보자면 응용 프로그램으로부터 System Call이 요청되거나 HW로부터 interrupt가 요청되면 그 요청에 대응하는 처리를 수행하는 역할이다. Kernel의 주요 기능 프로세스 관리 : 프로세스의 생성 및 소멸, CPU...","categories": ["Embedded Linux"],
        "tags": [],
        "url": "/embedded%20linux/kernel/",
        "teaser": null
      },{
        "title": "Linux Device Driver",
        "excerpt":"Linux Device Driver 리눅스 커널내에서 모든 하드웨어 장치들은 디바이스 드라이버를 통해 제어가 되고 이는 커널내의 가상파일시스템을 통해 접근이 가능하다. Device Driver 종류 character device driver : 임의의 길이를 갖는 문자열을 다루는 디바이스 드라이버 console keyboard 장비 block device driver : 일정 크기의 커널 내부의 버퍼를 통해 block 단위로 데이터를 처리하는...","categories": ["Embedded Linux"],
        "tags": [],
        "url": "/embedded%20linux/devicedriver/",
        "teaser": null
      },{
        "title": "Daemon",
        "excerpt":"Daemon Daemon은 백그라운드에서 사용자와의 interaction 없이 동작하는 프로그램이다. 대표적인 데몬 프로세스 형태의 프로그램은 웹서버를 예로 들 수 있다. daemon의 운영하는 방식은 아래와 같이 2가지가 있다. standalone 시스템에 독자적으로 프로세스가 구동되어 서비스를 제공하는 방식으로 백그라운드에서 항상 동작해야하는 경우에 사용된다. 부팅시부터 메모리에 상주되어 동작하므로 자주 호출되고 항상 대기하고 있어야하는 데몬의 경우 사용된다....","categories": ["Linux"],
        "tags": [],
        "url": "/linux/daemon/",
        "teaser": null
      },{
        "title": "Shell",
        "excerpt":"Shell Script linux shell에서 여러 명령어를 실행시키거나 응용 소프트웨어를 제어하기위해 작성되는 script 언어이다. 보통 .sh 확장자를 가지고 아래와 같이 스크립트 파일을 생성 및 실행할 수 있다. $ vi test.sh // 스크립트 생성 (스크립트 맨 상단에 '#!/bin/bash' 추가) $ chmod +x test.sh // 파일 실행권한 부여 $ sh test.sh // 스크립트...","categories": ["Linux"],
        "tags": [],
        "url": "/linux/shell/",
        "teaser": null
      },{
        "title": "IPC Socket",
        "excerpt":"IPC IPC(Inter-Process Communication)는 이름 그대로 프로세스 사이에 서로 데이터를 주고 받을 수 있는 통신 매커니즘이다. IPC 방식에는 named pipe, message queue, shared memory, memory map, socket, semaphore와 같이 여러 방식이 존재한다. 이 중에서 예제를 기반으로 socket 방식에 대해 설명해보고자 한다. socket Socket 기반의 IPC는 프로세스에서 데이터를 읽고 파일에 쓰는 과정에서...","categories": ["Linux"],
        "tags": [],
        "url": "/linux/ipc-socket/",
        "teaser": null
      },{
        "title": "React 관련 개념들",
        "excerpt":"웹개발 토이프로젝트를 시작하면서 React를 배워봐야겠다는 생각으로 React를 사용해보기로 결정했다.(무식하면 용감하다!) 어디부터 공부를 해야할지 막막하긴했지만 워낙 좋은 콘텐츠들이야 많으니 프로젝트를 해보면서 익혀봐야겠다. 우선 아래는 이것저것 보면서 기억해놓고 싶은 React와 관련된 개념들이다. 아직은 매우 어수선하지만 하다보면 내 것으로 만들 수 있겠지~ 시작이 반이다 호홓^^ React? full features framework이 아니라 library 형태에 가까워서...","categories": ["React"],
        "tags": [],
        "url": "/react/react/",
        "teaser": null
      },{
        "title": "Javascript 시작",
        "excerpt":"React 강좌들으면서 토이프로젝트의 화면을 구성해보았다. 일단 해보니까 확실히 내가 엄청 부족하구나를 더 느낄 수 있었다 하하하ㅏㅏ;;; 너무 거슬러 올라갔나 싶지만 그래도 Javascript 언어 자체에 대해서 돌아보는 시간을 가졌다. 그동안 ES6에 익숙한 개발자 도대체 무슨말인가 싶었는데 ES6는 ECMAScript 2015을 의미하는것이고 ECMAScript가 바로 javascript…. 결국은 해당 버전의 Javascript API를 사용해본 경험이 있는지를...","categories": ["Javascript"],
        "tags": [],
        "url": "/javascript/javascript/",
        "teaser": null
      },{
        "title": "Javascript에서 정규표현식",
        "excerpt":"우선 정규표현식 객체를 만들고 이렇게.. var pattern = /a/ 혹은 이렇게… var pattern = new RegExp('a'); 객체에서 패턴을 추출하고 console.log(pattern.exec('abcdef')); // [\"a\"] 객체에서 패턴에 해당되는 문자열이 있는지 확인할 수 있다. console.log(pattern.test('abcdef')); // true 정규표현식 옵션 i 옵션 i를 붙이면 대소문자를 구분하지 않는다. var xi = /a/; console.log(\"Abcde\".match(xi)); // null var...","categories": ["Javascript"],
        "tags": [],
        "url": "/javascript/js-regexp/",
        "teaser": null
      },{
        "title": "함수형 언어",
        "excerpt":"함수형 언어, Javascript 자바스크립트에서의 함수는 그냥 함수로 끝나는 것이 아니라 객체로도 사용이 된다. 이에 함수는 마치 다른 언어의 클래스처럼 property를 가질 수도 있고 함수를 이용해 객체를 생성하여 할당할 수도 있다. 1. 변수의 유효범위 전역변수 사용을 지양해야하는 것은 다른 언어에서도 강조되는 부분인데 자바스크립트에서도 물론 필요한 내용이다. 불가피하게 전역변수를 사용해야할 때는 아래와...","categories": ["Javascript"],
        "tags": [],
        "url": "/javascript/js-function/",
        "teaser": null
      },{
        "title": "OOP Javascript",
        "excerpt":"객체 지향 프로그래밍, Javascript 기존의 Java, C++과 같은 클래스 기반의 객체지향 언어에서는 앞으로 생성할 객체의 기능과 구조는 선언된 클래스에서 결정이 되지만 자바스크립트에서는 객체 자체(super object;prototype object)로부터 상속을 받아 새로운 객체(sub object)를 생성하게 된다. 이러한 차이점들을 통해 javascript만의 특징을 알아본다. 생성자 함수 function Person(name){ this.name = name; } Person.prototype.introduce = function(){...","categories": ["Javascript"],
        "tags": [],
        "url": "/javascript/js-oop/",
        "teaser": null
      },{
        "title": "BOM / DOM",
        "excerpt":"웹브라우저에서의 자바스크립트 React와 같은 프레임워크를 통해 프론트와 백엔드를 온전히 분리하여 개발을 하는 경우에는 오히려 순수한 자바스크립트를 사용하여 프론트엔드 작업을 진행하는 능력이 필요하다고 한다. 순수한 자바스크립트, 바닐라 JS를 능숙하게 다루기 위해서는 우선 DOM에 대한 이해가 필요했다. BOM 우선 BOM(Browser Object Model)은 웹페이지의 내용을 제외한 브라우저의 각종 요소들을 객체화시킨 것이다. 전역객체 window의...","categories": ["Javascript"],
        "tags": [],
        "url": "/javascript/js-object-model/",
        "teaser": null
      }]
