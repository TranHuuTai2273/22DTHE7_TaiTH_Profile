---
title: "Java Cơ bản"
date: 2025-12-25
description: "Kiểu dữ liệu, biến, toán tử và cấu trúc điều khiển"
tags: ["Java", "Cơ bản"]
image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=400&fit=crop"
draft: false
---

## Giới thiệu

Java là ngôn ngữ lập trình hướng đối tượng, ra đời năm 1995. Đặc điểm: "Viết một lần, chạy mọi nơi" nhờ JVM.

## Kiểu dữ liệu

### Kiểu nguyên thủy

```java
int tuoi = 25;
double gia = 99.99;
boolean hop le = true;
char kyTu = 'A';
```

### Chuỗi và mảng

```java
String ten = "Tai";
int[] soNguyen = {1, 2, 3, 4, 5};

// Hằng số
final double PI = 3.14159;
```

## Toán tử

```java
int a = 10, b = 3;

// Số học
int tong = a + b;      // 13
int hieu = a - b;      // 7
int tich = a * b;      // 30
int thuong = a / b;    // 3
int du = a % b;        // 1

// So sánh
boolean bang = (a == b);    // false
boolean lon = (a > b);      // true

// Logic
boolean va = (a > 5 && b < 5);   // true
boolean hoac = (a < 5 || b < 5); // true
```

## Cấu trúc điều khiển

### If-Else

```java
int diem = 85;

if (diem >= 90) {
    System.out.println("Xuất sắc");
} else if (diem >= 80) {
    System.out.println("Giỏi");
} else {
    System.out.println("Khá");
}

// Toán tử 3 ngôi
String ketQua = (diem >= 60) ? "Đậu" : "Rớt";
```

### Switch

```java
int ngay = 2;

String ten = switch (ngay) {
    case 1 -> "Thứ hai";
    case 2 -> "Thứ ba";
    case 3 -> "Thứ tư";
    default -> "Không hợp lệ";
};
```

### Vòng lặp

```java
// For
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}

// For-each
int[] mang = {1, 2, 3};
for (int so : mang) {
    System.out.println(so);
}

// While
int j = 0;
while (j < 5) {
    System.out.println(j++);
}
```

## Chuỗi (String)

```java
String text = "Xin chào";

int doDai = text.length();           // 8
char kyTu = text.charAt(0);          // 'X'
String cat = text.substring(0, 3);   // "Xin"
String noi = "Xin" + " chào";        // "Xin chào"
boolean bang = "Hi".equals("Hi");    // true
String thay = text.replace("chào", "kính chào");
String[] tach = text.split(" ");     // ["Xin", "chào"]
```

## Ví dụ: Máy tính

```java
public class MayTinh {
    public static void main(String[] args) {
        int a = 10, b = 5;
        String phepTinh = "+";
        
        int kq = switch (phepTinh) {
            case "+" -> a + b;
            case "-" -> a - b;
            case "*" -> a * b;
            case "/" -> (b != 0) ? a / b : 0;
            default -> 0;
        };
        
        System.out.println(a + " " + phepTinh + " " + b + " = " + kq);
    }
}
```

## Lời khuyên

- Đặt tên biến/phương thức: `camelCase` (vd: `tenNguoiDung`)
- Đặt tên class: `PascalCase` (vd: `MayTinh`)
- Hằng số: `UPPER_CASE` (vd: `MAX_VALUE`)
- Đặt tên có ý nghĩa, dễ hiểu

## Tổng kết

Nắm vững kiểu dữ liệu, toán tử, và cấu trúc điều khiển là nền tảng để học OOP và các chủ đề nâng cao.
