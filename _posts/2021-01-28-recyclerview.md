---
published: true
layout: single
title: "Recycler View"
category: Android
tags:
comments: true
---

# RecyclerView
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## RecyclerView

리싸이클러뷰는 리스트뷰처럼 상하 스크롤이 가능하게 만들 수도 있고 좌우 스크롤이 가능하게 만들 수도 있습니다.

왜냐하면 처음 만들어질 때부터 레이아웃을 유연하게 구성할 때 있도록 설계되었기 때문입니다.

그리고 각각의 아이템이 화면에 보이는 과정에서 메모리를 덜 사용하도록 캐시 메커니즘(ViewHolder)이 구현되어 있습니다.

---

## 화면 레이아웃에 추가

```xml
<androidx.recyclerview.widget.RecyclerView
    android:id="@+id/recyclerView"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_margin="10dp" />
```

---

## 어댑터 추가

각 아이템을 위한 데이터를 담아둘 수 있는 어댑터

각 아이템을 위한 데이터 클래스 정의
```java
public class GalleryItem {

    boolean bPhoto; // true: photo, false: video
    String orgUrl;
    String imageUrl;
```
