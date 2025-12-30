---
title: "OOP trong Java - Lập trình hướng đối tượng"
date: 2024-12-21
description: "Tìm hiểu chi tiết về 4 tính chất của OOP trong Java: Tính đóng gói, kế thừa, đa hình và trừu tượng"
tags: ["Java", "OOP", "Hướng đối tượng"]
draft: false
---

## Lập trình hướng đối tượng (OOP) là gì?

OOP (Object-Oriented Programming) là một phương pháp lập trình dựa trên khái niệm "đối tượng", có thể chứa dữ liệu (thuộc tính) và code (phương thức).

## 4 Tính chất cơ bản của OOP

### 1. Tính đóng gói (Encapsulation)

Đóng gói là việc ẩn giấu thông tin bên trong đối tượng và chỉ cho phép truy cập thông qua các phương thức public.

```java
public class Student {
    // Thuộc tính private
    private String name;
    private int age;
    private double gpa;
    
    // Constructor
    public Student(String name, int age, double gpa) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
    }
    
    // Getter methods
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
    
    public double getGpa() {
        return gpa;
    }
    
    // Setter methods với validation
    public void setAge(int age) {
        if (age > 0 && age < 100) {
            this.age = age;
        }
    }
    
    public void setGpa(double gpa) {
        if (gpa >= 0.0 && gpa <= 4.0) {
            this.gpa = gpa;
        }
    }
}
```

**Lợi ích:**
- Bảo vệ dữ liệu khỏi truy cập trái phép
- Kiểm soát được việc thay đổi dữ liệu
- Dễ bảo trì và nâng cấp code

### 2. Tính kế thừa (Inheritance)

Kế thừa cho phép class con thừa hưởng các thuộc tính và phương thức từ class cha.

```java
// Class cha
public class Person {
    protected String name;
    protected int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void introduce() {
        System.out.println("Tôi là " + name + ", " + age + " tuổi");
    }
}

// Class con kế thừa từ Person
public class Developer extends Person {
    private String programmingLanguage;
    
    public Developer(String name, int age, String language) {
        super(name, age); // Gọi constructor của class cha
        this.programmingLanguage = language;
    }
    
    // Override method
    @Override
    public void introduce() {
        super.introduce();
        System.out.println("Tôi lập trình " + programmingLanguage);
    }
    
    public void code() {
        System.out.println("Đang code " + programmingLanguage + "...");
    }
}
```

**Sử dụng:**
```java
Developer dev = new Developer("Tài", 22, "Java");
dev.introduce(); // Tôi là Tài, 22 tuổi. Tôi lập trình Java
dev.code();      // Đang code Java...
```

### 3. Tính đa hình (Polymorphism)

Đa hình cho phép một đối tượng có thể được xử lý theo nhiều cách khác nhau.

#### 3.1 Đa hình lúc biên dịch (Method Overloading)
```java
public class Calculator {
    // Cộng 2 số nguyên
    public int add(int a, int b) {
        return a + b;
    }
    
    // Cộng 3 số nguyên
    public int add(int a, int b, int c) {
        return a + b + c;
    }
    
    // Cộng 2 số thực
    public double add(double a, double b) {
        return a + b;
    }
}
```

#### 3.2 Đa hình lúc runtime (Method Overriding)
```java
public abstract class Animal {
    public abstract void makeSound();
}

public class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Gâu gâu!");
    }
}

public class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Meo meo!");
    }
}

// Sử dụng
Animal myDog = new Dog();
Animal myCat = new Cat();

myDog.makeSound(); // Gâu gâu!
myCat.makeSound(); // Meo meo!
```

### 4. Tính trừu tượng (Abstraction)

Trừu tượng là việc ẩn đi các chi tiết cài đặt phức tạp, chỉ hiển thị những thông tin cần thiết.

#### 4.1 Abstract Class
```java
public abstract class Shape {
    protected String color;
    
    public Shape(String color) {
        this.color = color;
    }
    
    // Abstract method (không có implementation)
    public abstract double getArea();
    
    // Concrete method
    public void displayColor() {
        System.out.println("Màu: " + color);
    }
}

public class Circle extends Shape {
    private double radius;
    
    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    
    @Override
    public double getArea() {
        return Math.PI * radius * radius;
    }
}

public class Rectangle extends Shape {
    private double width;
    private double height;
    
    public Rectangle(String color, double width, double height) {
        super(color);
        this.width = width;
        this.height = height;
    }
    
    @Override
    public double getArea() {
        return width * height;
    }
}
```

#### 4.2 Interface
```java
public interface Drawable {
    void draw();
    void resize(double scale);
}

public class Button implements Drawable {
    @Override
    public void draw() {
        System.out.println("Vẽ nút bấm");
    }
    
    @Override
    public void resize(double scale) {
        System.out.println("Thay đổi kích thước: " + scale);
    }
}
```

## So sánh Abstract Class vs Interface

| Đặc điểm | Abstract Class | Interface |
|----------|---------------|-----------|
| Từ khóa | `abstract` | `interface` |
| Kế thừa | Một class chỉ extends 1 abstract class | Một class có thể implements nhiều interface |
| Constructor | Có | Không |
| Phương thức | Có thể có concrete và abstract methods | Chỉ có abstract methods (Java 7), từ Java 8 có thể có default methods |
| Biến | Có thể có biến instance | Chỉ có static final constants |

## Ví dụ tổng hợp

```java
// Sử dụng tất cả 4 tính chất
public class OOPDemo {
    public static void main(String[] args) {
        // Tính kế thừa và đa hình
        Shape circle = new Circle("Đỏ", 5.0);
        Shape rectangle = new Rectangle("Xanh", 4.0, 6.0);
        
        // Tính trừu tượng
        System.out.println("Diện tích hình tròn: " + circle.getArea());
        System.out.println("Diện tích hình chữ nhật: " + rectangle.getArea());
        
        // Tính đóng gói
        Student student = new Student("Tài", 22, 3.5);
        System.out.println("Tên: " + student.getName());
        student.setGpa(3.8); // Kiểm soát thông qua setter
    }
}
```

## Kết luận

4 tính chất của OOP trong Java là nền tảng quan trọng giúp:
- Code dễ đọc, dễ hiểu
- Tái sử dụng code hiệu quả
- Bảo trì và mở rộng ứng dụng dễ dàng
- Tăng tính bảo mật và ổn định

Việc nắm vững OOP là chìa khóa để trở thành một Java developer giỏi!
