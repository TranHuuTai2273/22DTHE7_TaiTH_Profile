---
title: "Tổng quan về Java - Ngôn ngữ lập trình hướng đối tượng"
date: 2024-12-20
description: "Tìm hiểu về Java, một trong những ngôn ngữ lập trình phổ biến nhất thế giới với khả năng đa nền tảng mạnh mẽ"
tags: ["Java", "Cơ bản", "Lập trình"]
draft: false
---

## Java là gì?

Java là ngôn ngữ lập trình hướng đối tượng, được phát triển bởi Sun Microsystems (nay thuộc Oracle) vào năm 1995. Một trong những đặc điểm nổi bật nhất của Java là khả năng "Write Once, Run Anywhere" (WORA) - viết một lần, chạy mọi nơi.

## Đặc điểm chính của Java

### 1. Hướng đối tượng (Object-Oriented)
Java được thiết kế hoàn toàn theo mô hình hướng đối tượng, giúp:
- Tổ chức code tốt hơn
- Tái sử dụng code dễ dàng
- Bảo trì và mở rộng ứng dụng hiệu quả

### 2. Độc lập nền tảng
Java sử dụng Java Virtual Machine (JVM) để thực thi chương trình, cho phép code chạy trên bất kỳ hệ điều hành nào có JVM.

### 3. An toàn và bảo mật
- Không có con trỏ (pointers) trực tiếp
- Có cơ chế quản lý bộ nhớ tự động (Garbage Collection)
- Hệ thống bảo mật đa lớp

## Cài đặt môi trường Java

### Bước 1: Download JDK
Truy cập trang Oracle hoặc OpenJDK để tải phiên bản JDK phù hợp.

### Bước 2: Cài đặt
```bash
# Kiểm tra Java đã được cài đặt
java -version
javac -version
```

### Bước 3: Thiết lập biến môi trường
Thêm JAVA_HOME và PATH vào biến môi trường hệ thống.

## Chương trình Java đầu tiên

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Xin chào, Java!");
    }
}
```

### Giải thích code:
- `public class HelloWorld`: Khai báo class public
- `main()`: Điểm bắt đầu của chương trình
- `System.out.println()`: In ra màn hình console

## Biên dịch và chạy

```bash
# Biên dịch
javac HelloWorld.java

# Chạy
java HelloWorld
```

## Kiểu dữ liệu trong Java

### Kiểu dữ liệu nguyên thủy
- `byte`: 8-bit, từ -128 đến 127
- `short`: 16-bit
- `int`: 32-bit  
- `long`: 64-bit
- `float`: 32-bit số thực
- `double`: 64-bit số thực
- `boolean`: true/false
- `char`: 16-bit ký tự Unicode

### Ví dụ:
```java
int age = 25;
double salary = 50000.50;
boolean isStudent = true;
String name = "Tài";
```

## Cấu trúc điều khiển

### If-Else
```java
if (age >= 18) {
    System.out.println("Đã trưởng thành");
} else {
    System.out.println("Chưa trưởng thành");
}
```

### Vòng lặp For
```java
for (int i = 0; i < 5; i++) {
    System.out.println("Lần lặp: " + i);
}
```

### While Loop
```java
int count = 0;
while (count < 5) {
    System.out.println(count);
    count++;
}
```

## Kết luận

Java là một ngôn ngữ mạnh mẽ và linh hoạt, phù hợp cho nhiều loại ứng dụng từ desktop, web đến mobile (Android). Việc nắm vững các kiến thức cơ bản về Java sẽ là nền tảng vững chắc cho sự nghiệp lập trình của bạn.

## Tài liệu tham khảo
- [Oracle Java Documentation](https://docs.oracle.com/javase/)
- [Java Tutorials](https://docs.oracle.com/javase/tutorial/)
