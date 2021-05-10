---
published: true
layout: single
title: "WCF 서비스에서 MS-SQL Server 연결"
category: WCF
tags:
comments: true
---

# WCF 프로젝트에서 MS-SQL Server 사용하기
{: .no_toc }

## MS-SQL Server와 초기 연결

### 1. 소스 코드에서 SqlConnection 클래스 이용하여 연결하는 방법
```c#
SqlConnectionStringBuilder connStringBuilder = null;

connStringBuilder = new SqlConnectionStringBuilder();
connStringBuilder.DataSource = "DESKTOP-5VTCE9S\SQLEXPRESS_2014";       // 연결할 SQL Server 인스턴스의 이름이나 네트워크 주소
connStringBuilder.InitialCatalog = "DatabaseName";                      // 데이터베이스 이름
connStringBuilder.UserID = "userID";
connStringBuilder.Password = "password";
connStringBuilder.Encrypt = true;
connStringBuilder.TrustServerCertificate = true;
connStringBuilder.ConnectTimeout = 30;
connStringBuilder.AsynchronousProcessing = true;
connStringBuilder.MultipleActiveResultSets = true;
connStringBuilder.IntegratedSecurity = true;

SqlConnection conn = new SqlConnection(connStringBuilder.ToString());

conn.Open();
```

### 2. Web.config에 connectionStrings 섹션 추가로 연결하는 방법
```xml
<connectionStrings>
    <add name="DBConnectionString" 
    connectionString="Data Source=DESKTOP-5VTCE9S\SQLEXPRESS_2014;Initial Catalog=TestDB;User ID=UserID;Password=Password" 
    providerName="System.Data.SqlClient" />
</connectionStrings>
```

## C#으로 MSSQL Query 사용

아래 예제코드에서 `conn`은 SqlConnection 객체로 쿼리 호출하기 전에 Open된 상태여야 한다.

### 1. SqlClient.SqlDataReader 사용하는 방법

```c#
public string GetEmployeeName(int id)
{
    SqlCommand cmd = new SqlCommand("select * from Employee where ID ='" + id + "'", conn);

    SqlDataReader reader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

    SqlString name = reader.GetSqlString(reader.GetOrdianl("Name"));

    return name;
}
```

### 2. SqlClient.SqlDataAdapter 사용하는 방법
DataTable 형태로 받으면 DataGridView의 DataSource로 그대로 전달하여 바로 출력이 된다.

```c#
public DataTable GetAllEmployeesInfo()
{
    DataSet employees = new DataSet();

    SqlCommand command = new SqlCommand("SELECT * FROM Employee", conn);

    SqlDataAdapter adapter = new SqlDataAdapter(command);

    adapter.Fill(dst);

    return employees.Tables[0];
}
```

### 3. 저장프로시저 호출이 필요한 경우

```c#
public EmployeeInfo GetEmployeeInfo(string employee_id)
{
    EmployeeInfo employees_info = new EmployeeInfo();

    SqlCommand command = new SqlCommand();
    SqlDataReader reader;

    command.CommandText = "storedProcedureName";
    command.CommandType = CommandType.StoredProcedure;

    SqlParameter _EmployeeID = new SqlParameter("@employee_id", SqlDbType.NVarChar, 50);
    _EmployeeID.Value = employee_id;

    command.Parameters.Add(_EmployeeID);

    command.Connection = conn;

    SqlDataReader reader = command.ExecuteReader(CommandBehavior.CloseConnection);

    while (reader.Read())
    {
        info.id = reader["id"].ToString();
        info.name = reader["name"].ToString();
        info.department = reader["department"].ToString();
    }

    reader.Close();

    return employees_info;
}
```