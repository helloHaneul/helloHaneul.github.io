---
published: true
layout: single
title: "stored procedure"
category: MS-SQL
tags:
comments: true
---

# MS-SQL 저장 프로시저
{: .no_toc }

## 저장 프로시저 ?
저장 프로시저란 일련의 쿼리를 하나의 함수처럼 실행하기 위한 쿼리의 집합으로 데이터베이스에서 수행하는 프로그래밍문이라고 할 수 있다.
하나의 프로그램처럼 입력 매개 변수 전달이 가능하며 호출하는 프로그램에서 상태 값을 반환하여 성공 또는 실패 및 실패 원인을 파악할 수 있다.
그리고 저장 프로시저를 사용하기 위해서는 해당 데이터베이스의 CREATE PROCEDURE 권한과 프로시저를 만들 스키마에 대한 ALTER 권한이 필요하다.

### 프로시점 사용의 이점
- 서버/클라이언트 네트워크 트래픽 감소
- 보안 강화 : 테이블 및 데이터베이스 개체 이름과 같은 중요한 데이터의 노출을 최소화
- 코드 재사용
- 간편한 유지 관리
- 성능 향상 : 처음 실행시에만 컴파일되어 이후에는 프로시저 처리 시간이 감소

## 저장 프로시저 만들기
쿼리문을 통해 만들 수도 있으나 SQL Server Management Studio를 사용하여 아래와 같이 간편하게 프로그래밍하듯 만들 수 있다.

![ssms](https://helloHaneul.github.io/image/mssql/sp1.png)

![ssms](https://helloHaneul.github.io/image/mssql/sp2.png)

우선 아래와 같이 사원과 부서 테이블이 있다고 가정하자.

![Employee](https://helloHaneul.github.io/image/mssql/table1.PNG)

![Department](https://helloHaneul.github.io/image/mssql/table2.PNG)

부서명에 대한 외래키 관계를 만든다. 아래와 같이 studio에서 대화상자를 이용해서도 만들 수 있다.

![relation](https://helloHaneul.github.io/image/mssql/table3.png)

![relation](https://helloHaneul.github.io/image/mssql/table4.png)

![relation](https://helloHaneul.github.io/image/mssql/table5.png)

그러면 아래와 같은 두 가지 테이블이 생성되었고 사원을 추가하는 프로시저를 만들어보도록 한다.

![tables](https://helloHaneul.github.io/image/mssql/table6.png)

내용을 보면 알겠지만 사원을 INSERT 하는 구문 하나 이외에 기존의 ID가 동일한 사원이 있는지, 등록된 부서명으로 사원을 추가하는지를 검사 하는 구문이 추가되어있다.

![stored_procedure](https://helloHaneul.github.io/image/mssql/sp3.png)

그리고 INSERT 하는 구문에서 **_트랜잭션_**으로 묶여 있는데 이는 데이터베이스의 변경이 일어나는 DML(Insert,Delete,Update) 수행시에 주로 사용된다. 만약 정상적으로 처리될 수 없는 경우에 아무 것도 수행되지 않고 처음 상태로 되돌릴 수 있는 안전장치라고 할 수 있다. 그리고 트랜잭션이 접근하고 있는 데이터는 다른 트랜잭션으로부터 격리되기 때문에서 동시에 같은 내용을 추가,수정 혹은 삭제를 방지할 수 있다.

그럼 이제 실행을 누르고... 해당 저장프로시저가 컴파일되면서 데이터베이스에 등록된다.

![stored_procedure](https://helloHaneul.github.io/image/mssql/sp4.PNG)

등록된 저장 프로시저가 올바르게 동작하는지 아래와 같이 테스트도 가능하다.

![stored_procedure_test](https://helloHaneul.github.io/image/mssql/sprun1.png)

![stored_procedure_test](https://helloHaneul.github.io/image/mssql/sprun2.png)

### [참고]
[https://docs.microsoft.com/ko-kr/sql/relational-databases/stored-procedures/grant-permissions-on-a-stored-procedure?view=sql-server-ver15](https://docs.microsoft.com/ko-kr/sql/relational-databases/stored-procedures/grant-permissions-on-a-stored-procedure?view=sql-server-ver15)
