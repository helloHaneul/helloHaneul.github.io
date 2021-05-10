---
published: true
layout: single
title: "IPC Socket"
category: Linux
tags:
comments: true
---

# IPC
{: .no_toc }

IPC(Inter-Process Communication)는 이름 그대로 프로세스 사이에 서로 데이터를 주고 받을 수 있는 통신 매커니즘이다.
IPC 방식에는 named pipe, message queue, shared memory, memory map, socket, semaphore와 같이 여러 방식이 존재한다.
이 중에서 예제를 기반으로 socket 방식에 대해 설명해보고자 한다.

## socket
Socket 기반의 IPC는 프로세스에서 데이터를 읽고 파일에 쓰는 과정에서 사용되는 file descriptor 기반 입출력 방식을 사용하여 만들어졌다.
socket 방식은 네트워크를 통해 다른 프로세스와의 통신도 가능하며 기존의 pipe 방식과 달리 read/write가 동시에 가능하다.

Unix Domain socket은 데이터 유실의 가능성이 있는 network socket과 달리 데이터 신뢰성이 높고, 일종의 PIPE 형태로 데이터 통신을 해서 지정된 파일을 통해서만 이뤄진다. Unix domain 소켓은 로컬 파일을 소켓 주소로 하여 통신을 하는데 이러한 구현상의 차이점에도 불구하고 IPC 소켓과 네트워크 소켓에서 필수로 사용되는 API가 동일하다. 네트워크 소켓을 사용하더라도 localhost 주소를 사용하면 같은 컴퓨터에서 server/client 동작이 가능하다. 

아래는 예제의 전체적인 동작 흐름이다.

- 서버는 클라이언트 연결을 대기하고 있다가 성공적으로 연결되면 클라이언트로부터 데이터를 받는 스레드와 보내는 스레드를 실행한다.
- 서버측의 tReadThread 에서는 클라이언트로부터 명령 데이터를 받도록 하고 tSendThread 에서는 클라이언트로 응답 데이터를 보내도록 구성하도록 한다. 아래 예제에는 일단 그냥 읽고 쓰는 구문만 있으나 실제로 구현을 하자면.... tReadThread에서는 클라이언트로부터 명령 데이터를 받아 별도의 처리를 끝내고 이에 따른 응답 데이터에 큐에 쌓는다. tSendThread에서는 응답 데이터 큐에서 데이터를 pop하여 클라이언트에 전송하는 식으로 구현을 하면 된다.
- 다중 클라이언트 처리를 위해 'select' 함수를 사용했다.

### socket_server.c
```c++
#include <iostream>
#include <chrono>
#include <ctime>
#include <cmath>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>

#include <sys/socket.h>
#include <sys/ioctl.h>
#include <sys/time.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <errno.h>

#define PORT 9966
#define SOCKET_QUEUE 5
#define DATA_SIZE 1024

#define LOG(__O__) std::cout<<"\e[1;20m"<<__O__<<"\e[0m"<<std::endl
#define ERROR(__O__) std::cout<<"\e[1;31m"<<__O__<<"\e[0m"<<std::endl

void* send_func(void *arg)
{
	int* client_fd = (int*)arg;

	while(true)
	{
		char message[DATA_SIZE];
		memset(message, 0x00, sizeof(message));

		if(write(*client_fd, message, strlen(message)) < 0) {
			close(*client_fd);
			ERROR("failed to send socket to client");
			break;
		}

		usleep(10000);
	}
}

void* read_func(void *arg) 
{
	int* client_fd = (int*)arg;

	while(true)
	{
		char message[DATA_SIZE];
		int len = read(*client_fd, message, DATA_SIZE);

		if(len <= 0) {
			close(*client_fd);
			ERROR("failed to read data from client");
			break;
		}
		else {
			LOG("[read from client] - " << message);
		}

		usleep(10000);
	}
}

int main(int argc, char **argv)
{
	int server_fd, client_fd;
	int max_sd;
	fd_set master_set, working_set;
	struct timeval timeout;
	pthread_t tSendThread, tReadThread;

	if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0) {
		ERROR("server socket create failed");
		return -1;
	}

	int reuseOption = 1;
	if (setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR | SO_REUSEPORT, &reuseOption, sizeof(reuseOption)) != 0) {
		ERROR("setsockopt failed");
		close(server_fd);
		return -1;
	}

	if(ioctl(server_fd, FIONBIO, (char*)&reuseOption) < 0) {
		ERROR("ioctl failed");
		close(server_fd);
		return -1;
	}

	struct sockaddr_in address;
	address.sin_family = AF_INET;
	address.sin_addr.s_addr = INADDR_ANY;
	address.sin_port = PORT;

	if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
		ERROR("server socket bind failed");
		close(server_fd);
		return -1;
	}

	if (listen(server_fd, SOCKET_QUEUE) < 0) {
		ERROR("server socket listen failed");
		close(server_fd);
		return -1;
	}

	FD_ZERO(&master_set);
	max_sd = server_fd;
	FD_SET(server_fd, &master_set);

	while(true)
	{
		int addrlen;
		struct sockaddr_in address;

		memcpy(&working_set, &master_set, sizeof(master_set));

		timeout.tv_sec = 10;
		timeout.tv_usec = 0;

		int rc = select(max_sd + 1, &working_set, NULL, NULL, &timeout);

		if(rc < 0) {
			ERROR("failed to select");
			break;
		} else if(rc == 0) {
			ERROR("select timeout(waiting for connect)");
		} else {
			int desc_ready = rc;
			for(int i=0; i<= max_sd && desc_ready > 0; ++i)
			{
				if(FD_ISSET(i, &working_set))
				{
					desc_ready -= 1;

					if(i == server_fd)
					{
						client_fd = accept(server_fd,(struct sockaddr*)&address, (socklen_t*)&addrlen);

						if(client_fd == -1)
						{
							ERROR("failed to accept socket");
							break;
						}
						else 
						{
							LOG("!!! client connected !!!");
							
							pthread_create(&tReadThread, NULL, read_func, &client_fd);
							pthread_create(&tSendThread, NULL, send_func, &client_fd);
						}
					}
				}
			}
		}

		usleep(10000);
	}

	FD_CLR(0, &master_set);

	close(client_fd);
	close(server_fd);

	pthread_join(tReadThread, NULL);
	pthread_join(tSendThread, NULL);
}
```

### socket_client.c
```c++
#include <iostream>
#include <chrono>
#include <ctime>
#include <cmath>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <pthread.h>
#include <errno.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

#define PORT 9966
#define DATA_SIZE 1024

#define HIGHLIGHT(__O__) std::cout<<"\e[1;31m"<<__O__<<"\e[0m"<<std::endl
#define LOG(__O__) std::cout<<"\e[1;20m"<<__O__<<"\e[0m"<<std::endl

using namespace std;

void* read_func(void *args)
{
	int fd = *((int *)args);

	while(true)
	{
		char buffer[DATA_SIZE];
		int len = read(fd, buffer, DATA_SIZE);

		if (len > 0) 
		{
			HIGHLIGHT("[received data from server] " << buffer);
			
		}
		else if (len < 0) 
		{
			LOG("[FAIL] read");
			break;
		}

		usleep(10);
	}
}

int main(int argc, char **argv)
{
	int client_fd;
	struct sockaddr_in address;
	char command[DATA_SIZE];

	if ((client_fd = socket(AF_INET, SOCK_STREAM, 0)) < 0) {
		LOG("[FAIL] socket");
		return -1;
	}

	address.sin_family = AF_INET;
	address.sin_port = htons(PORT);

	if (inet_pton(AF_INET, "127.0.0.1", &address.sin_addr) <= 0) {
		LOG("[FAIL] inet_pton");
		return -1;
	}

	if (connect(client_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
		LOG("[FAIL] Sever is not responding...(connect failed)");
		return -1;
	}

	pthread_t tReadThread;

	pthread_create(&tReadThread, NULL, read_func, (void *)&client_fd);

	while(true)
	{
		memset(command, 0x00, DATA_SIZE);

		printf("> ");

		fgets(command, DATA_SIZE, stdin);

		if(strcmp(command, "exit")==0) {
			LOG("exit");
			break;
		}
		else {
			int ret = write(client_fd, command, strlen(command));
			if(ret <= 0) {
				LOG("failed to send command to server");
				break;
			}
		}
	}

	close(client_fd);

	pthread_join(tReadThread, NULL);

	return 0;
}
```

### [참고]
- [IPC socket using network socket](https://opensource.com/article/19/4/interprocess-communication-linux-networking)
- [Unix Domain socket on UDP](https://www.joinc.co.kr/w/Site/system_programing/IPC/Unix_Domain_Socket_UDP)