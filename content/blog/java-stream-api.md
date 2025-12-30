---
title: "Java Stream API"
date: 2025-12-29
description: "Lập trình functional với Stream"
tags: ["Java", "Stream", "Java 8"]
image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=400&fit=crop"
draft: false
---

## Stream là gì?

Stream API (Java 8+) cho phép xử lý collections theo phong cách functional: filter, map, reduce...

**Đặc điểm**:
- Không lưu trữ dữ liệu
- Không thay đổi nguồn
- Lazy evaluation
- Có thể vô hạn

## Tạo Stream

```java
import java.util.stream.*;
import java.util.*;

// Từ collection
List<String> list = Arrays.asList("Java", "Python", "JavaScript");
Stream<String> stream1 = list.stream();

// Từ array
int[] numbers = {1, 2, 3, 4, 5};
IntStream stream2 = Arrays.stream(numbers);

// Từ giá trị
Stream<String> stream3 = Stream.of("A", "B", "C");

// Vô hạn
Stream<Integer> infinite = Stream.iterate(0, n -> n + 1);  // 0, 1, 2, 3...
```

## Intermediate Operations

Trả về Stream mới, có thể chain.

### Filter - Lọc

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);

List<Integer> chan = numbers.stream()
    .filter(n -> n % 2 == 0)  // Lọc số chẵn
    .collect(Collectors.toList());

System.out.println(chan);  // [2, 4, 6]
```

### Map - Biến đổi

```java
List<String> names = Arrays.asList("tai", "nam", "linh");

List<String> upper = names.stream()
    .map(String::toUpperCase)  // Method reference
    .collect(Collectors.toList());

System.out.println(upper);  // [TAI, NAM, LINH]
```

### Sorted - Sắp xếp

```java
List<Integer> numbers = Arrays.asList(5, 2, 8, 1, 9);

List<Integer> sapXep = numbers.stream()
    .sorted()  // Tăng dần
    .collect(Collectors.toList());

// Giảm dần
List<Integer> giamDan = numbers.stream()
    .sorted(Comparator.reverseOrder())
    .collect(Collectors.toList());
```

### Distinct - Loại bỏ trùng

```java
List<Integer> numbers = Arrays.asList(1, 2, 2, 3, 3, 3, 4);

List<Integer> unique = numbers.stream()
    .distinct()
    .collect(Collectors.toList());

System.out.println(unique);  // [1, 2, 3, 4]
```

## Terminal Operations

Kết thúc stream, trả về kết quả.

### Collect

```java
List<String> names = Arrays.asList("Tai", "Nam", "Linh");

// Thành List
List<String> list = names.stream().collect(Collectors.toList());

// Thành Set
Set<String> set = names.stream().collect(Collectors.toSet());

// Join string
String joined = names.stream().collect(Collectors.joining(", "));
System.out.println(joined);  // "Tai, Nam, Linh"
```

### ForEach - Duyệt

```java
List<Integer> numbers = Arrays.asList(1, 2, 3);

numbers.stream()
    .forEach(n -> System.out.println(n));

// Method reference
numbers.stream().forEach(System.out::println);
```

### Count, Sum, Average

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

long count = numbers.stream().count();  // 5

int sum = numbers.stream()
    .mapToInt(Integer::intValue)
    .sum();  // 15

double avg = numbers.stream()
    .mapToInt(Integer::intValue)
    .average()
    .orElse(0.0);  // 3.0
```

### FindFirst, AnyMatch

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

Optional<Integer> first = numbers.stream()
    .filter(n -> n > 3)
    .findFirst();  // Optional[4]

boolean coChan = numbers.stream()
    .anyMatch(n -> n % 2 == 0);  // true

boolean tatCaChan = numbers.stream()
    .allMatch(n -> n % 2 == 0);  // false
```

### Reduce - Tổng hợp

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

// Tổng
int sum = numbers.stream()
    .reduce(0, (a, b) -> a + b);  // 15

// Max
Optional<Integer> max = numbers.stream()
    .reduce((a, b) -> a > b ? a : b);  // Optional[5]

// Nối chuỗi
List<String> words = Arrays.asList("Java", "is", "fun");
String sentence = words.stream()
    .reduce("", (a, b) -> a + " " + b);  // " Java is fun"
```

## Ví dụ: Xử lý Sinh viên

```java
class SinhVien {
    String ten;
    double diem;
    
    public SinhVien(String ten, double diem) {
        this.ten = ten;
        this.diem = diem;
    }
    
    public String getTen() { return ten; }
    public double getDiem() { return diem; }
}

List<SinhVien> danhSach = Arrays.asList(
    new SinhVien("Tai", 8.5),
    new SinhVien("Nam", 7.0),
    new SinhVien("Linh", 9.0),
    new SinhVien("Hoa", 6.5)
);

// Tìm sinh viên điểm >= 8
List<SinhVien> gioi = danhSach.stream()
    .filter(sv -> sv.getDiem() >= 8.0)
    .collect(Collectors.toList());

// Điểm trung bình
double dtb = danhSach.stream()
    .mapToDouble(SinhVien::getDiem)
    .average()
    .orElse(0.0);

System.out.println("ĐTB: " + dtb);  // 7.75

// Tên sinh viên giỏi
String tenGioi = danhSach.stream()
    .filter(sv -> sv.getDiem() >= 8.0)
    .map(SinhVien::getTen)
    .collect(Collectors.joining(", "));

System.out.println("Sinh viên giỏi: " + tenGioi);  // Tai, Linh

// Nhóm theo điểm
Map<Double, List<SinhVien>> nhom = danhSach.stream()
    .collect(Collectors.groupingBy(SinhVien::getDiem));
```

## Parallel Stream

Xử lý song song, tăng hiệu suất với dữ liệu lớn.

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// Sequential
long sum1 = numbers.stream()
    .mapToLong(i -> i)
    .sum();

// Parallel - nhanh hơn với dữ liệu lớn
long sum2 = numbers.parallelStream()
    .mapToLong(i -> i)
    .sum();
```

## Method Reference

Cú pháp ngắn gọn cho lambda.

```java
// Lambda
names.stream().map(s -> s.toUpperCase());

// Method reference
names.stream().map(String::toUpperCase);

// Các loại
String::toUpperCase          // Instance method
System.out::println          // Instance method
Integer::parseInt            // Static method
ArrayList::new               // Constructor
```

## Lời khuyên

1. **Dùng Stream** cho operations phức tạp trên collections
2. **Không lạm dụng**: Simple loop đôi khi dễ đọc hơn
3. **Parallel stream**: Chỉ với dữ liệu lớn, overhead với data nhỏ
4. **Immutable**: Stream không thay đổi nguồn
5. **Method reference**: Ngắn gọn hơn lambda khi có thể

## Tổng kết

Stream API giúp xử lý collections theo phong cách functional, code ngắn gọn và dễ đọc. Filter lọc, map biến đổi, reduce tổng hợp. Parallel stream tăng hiệu suất với dữ liệu lớn.
