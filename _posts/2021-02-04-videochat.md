---
layout: default
title: "화상채팅 서비스 개발 프로젝트"
parent: toy project
nav_order: 1
---

# 화상채팅 서비스 개발
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## 개요

화상채팅 기반 온라인 필라테스 1:1 레슨 서비스

### 주요기능
 - 화상채팅 기능은 WebRTC 기반으로 구현한다.
 - 회원별 체형, 자세 및 건강이력 관리
 - 처음 사용하는 사용자 모두 회원의 건강상태 점검 과정을 필수로 거치도록 한다
 - 첫 단계는 회원 건강 및 자세분석, 필라테스 호흡법 및 기본 자세에 대한 과정을 진행하며 이 코스는 무료로 진행
 - 레슨시간 푸시알람 기능

---

## WebRTC관련 기능 시스템 구성 계획

### 시그널링 서버
- 방안1. socket.io 기반으로 직접 구축 (google codelab 예제 참고)
- 방안2. easyRTC 패키지를 사용

※ WebRTC 오픈 라이브러리: easyRTC, SimpleRTC, PeerJS,  RTCMPMultiConnection

어떤 방안으로 진행하든 클라우드서비스에 서버 구축해야할 것으로 예상

### ICE 서버(STUN,TURN)
coturn 오픈소스 사용해서 직접 구축하는 방안으로 AWS에 ubuntu 인스턴스 만들어서 coturn을 올리도록 하자!

### 기본적인 서비스를 호스팅하는 서버
사용자 관리 및 기타 정보를 관리하는 기능의 서버

### SSL 발급
WebRTC 기능은 HTTPS로 구성해야하므로 Let's encrypt에서 SSL 발급 진행

### 도메인 발급
aws상에 필요한 서버 구축한 이후에 일단 [무료 도메인](https://www.freenom.com/en/index.html?lang=en) 발급 받아 진행하고 사용기간 끝나면 구매?

### 모바일 어플리케이션
우선 기능 자체는 웹브라우저상에서 테스트를 진행하고 화상채팅 기능은 webview로 구성하여 그대로 사용하여 구현하도록 한다.

## TODO

- [ ] localhost 환경에서 signaling server, turn server 그리고 android application 동작 확인
- [ ] aws 사용 관련 리서치 (다른 클라우드 서비스로 변경 가능)
- [ ] aws 상에 webrtc 관련 서버 구축해서 동작 확인
- [ ] 상세 기능 수립 (기획서 작성)

webrtc 참고: [https://forest71.tistory.com/211?category=788767](https://forest71.tistory.com/211?category=788767)