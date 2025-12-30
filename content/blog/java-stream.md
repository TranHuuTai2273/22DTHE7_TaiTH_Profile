---
title: "Java Stream API - Xử lý dữ liệu hiện đại"
date: 2024-12-24
description: "Khám phá Stream API trong Java 8+ để xử lý collections một cách functional và hiệu quả"
tags: ["Java", "Java 8", "Stream", "Functional Programming"]
draft: false
---

## Stream API là gì?

Stream API (từ Java 8) là một công cụ mạnh mẽ để xử lý collections theo phong cách functional programming, giúp code ngắn gọn và dễ đọc hơn.

## Đặc điểm của Stream

- **Không phải data structure**: Stream không lưu trữ dữ liệu
- **Functional**: Không thay đổi source data
- **Lazy evaluation**: Chỉ thực thi khi cần
- **Có thể consume 1 lần**: Sau khi đã sử dụng, không thể dùng lại

## Tạo Stream

### Từ Collection
```java
import java.util.*;
import java.util.stream.*;

public class CreateStreamExample {
    public static void main(String[] args) {
        // Từ List
        List<String> names = Arrays.asList("An", "Bình", "Cường");
        Stream<String> stream1 = names.stream();
        
        // Từ Array
        String[] arr = {"Java", "Python", "JavaScript"};
        Stream<String> stream2 = Arrays.stream(arr);
        
        // Từ Stream.of()
        Stream<Integer> stream3 = Stream.of(1, 2, 3, 4, 5);
        
        // Stream vô hạn
        Stream<Integer> infiniteStream = Stream.iterate(0, n -> n + 2);
        
        // Stream.generate()
        Stream<Double> randomStream = Stream.generate(Math::random);
    }
}
```

## Intermediate Operations (Lazy)

Các operations trả về Stream mới, cho phép chain.

### filter() - Lọc phần tử
```java
public class FilterExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // Lọc số chẵn
        List<Integer> evenNumbers = numbers.stream()
            .filter(n -> n % 2 == 0)
            .collect(Collectors.toList());
        
        System.out.println(evenNumbers); // [2, 4, 6, 8, 10]
        
        // Lọc chuỗi dài > 5 ký tự
        List<String> words = Arrays.asList("Java", "Python", "JavaScript", "C++");
        List<String> longWords = words.stream()
            .filter(w -> w.length() > 5)
            .collect(Collectors.toList());
        
        System.out.println(longWords); // [Python, JavaScript]
    }
}
```

### map() - Biến đổi phần tử
```java
public class MapExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("an", "bình", "cường");
        
        // Chuyển thành chữ hoa
        List<String> upperNames = names.stream()
            .map(String::toUpperCase)
            .collect(Collectors.toList());
        
        System.out.println(upperNames); // [AN, BÌNH, CƯỜNG]
        
        // Lấy độ dài
        List<Integer> lengths = names.stream()
            .map(String::length)
            .collect(Collectors.toList());
        
        System.out.println(lengths); // [2, 4, 5]
        
        // Map object
        List<Person> people = Arrays.asList(
            new Person("An", 25),
            new Person("Bình", 30)
        );
        
        List<String> personNames = people.stream()
            .map(Person::getName)
            .collect(Collectors.toList());
    }
}
```

### flatMap() - Flatten stream
```java
public class FlatMapExample {
    public static void main(String[] args) {
        List<List<Integer>> nestedList = Arrays.asList(
            Arrays.asList(1, 2, 3),
            Arrays.asList(4, 5),
            Arrays.asList(6, 7, 8, 9)
        );
        
        // Flatten thành 1 list
        List<Integer> flatList = nestedList.stream()
            .flatMap(List::stream)
            .collect(Collectors.toList());
        
        System.out.println(flatList); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
        
        // Tách chuỗi thành từ
        List<String> sentences = Arrays.asList(
            "Java is great",
            "Python is easy"
        );
        
        List<String> words = sentences.stream()
            .flatMap(sentence -> Arrays.stream(sentence.split(" ")))
            .collect(Collectors.toList());
        
        System.out.println(words); // [Java, is, great, Python, is, easy]
    }
}
```

### distinct() - Loại bỏ trùng lặp
```java
List<Integer> numbers = Arrays.asList(1, 2, 2, 3, 3, 4, 5, 5);
List<Integer> uniqueNumbers = numbers.stream()
    .distinct()
    .collect(Collectors.toList());

System.out.println(uniqueNumbers); // [1, 2, 3, 4, 5]
```

### sorted() - Sắp xếp
```java
public class SortedExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(5, 2, 8, 1, 9);
        
        // Sắp xếp tăng dần
        List<Integer> sorted = numbers.stream()
            .sorted()
            .collect(Collectors.toList());
        
        // Sắp xếp giảm dần
        List<Integer> reverseSorted = numbers.stream()
            .sorted(Comparator.reverseOrder())
            .collect(Collectors.toList());
        
        // Sắp xếp object
        List<Person> people = Arrays.asList(
            new Person("Cường", 25),
            new Person("An", 30),
            new Person("Bình", 20)
        );
        
        // Sắp xếp theo tên
        List<Person> sortedByName = people.stream()
            .sorted(Comparator.comparing(Person::getName))
            .collect(Collectors.toList());
        
        // Sắp xếp theo tuổi
        List<Person> sortedByAge = people.stream()
            .sorted(Comparator.comparing(Person::getAge))
            .collect(Collectors.toList());
    }
}
```

### limit() và skip()
```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// Lấy 5 phần tử đầu
List<Integer> first5 = numbers.stream()
    .limit(5)
    .collect(Collectors.toList());

// Bỏ qua 5 phần tử đầu
List<Integer> skip5 = numbers.stream()
    .skip(5)
    .collect(Collectors.toList());

// Pagination: Lấy trang 2, mỗi trang 3 items
List<Integer> page2 = numbers.stream()
    .skip(3)  // Bỏ trang 1
    .limit(3) // Lấy 3 items
    .collect(Collectors.toList());
```

## Terminal Operations (Eager)

Kích hoạt xử lý và trả về kết quả cuối cùng.

### collect() - Thu thập kết quả
```java
import java.util.stream.Collectors;

public class CollectExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("An", "Bình", "Cường", "Dũng");
        
        // Collect to List
        List<String> list = names.stream()
            .filter(n -> n.length() > 2)
            .collect(Collectors.toList());
        
        // Collect to Set
        Set<String> set = names.stream()
            .collect(Collectors.toSet());
        
        // Collect to Map
        Map<String, Integer> nameToLength = names.stream()
            .collect(Collectors.toMap(
                name -> name,
                String::length
            ));
        
        // Joining strings
        String joined = names.stream()
            .collect(Collectors.joining(", "));
        System.out.println(joined); // An, Bình, Cường, Dũng
        
        // Grouping
        List<Person> people = Arrays.asList(
            new Person("An", 25),
            new Person("Bình", 30),
            new Person("Cường", 25)
        );
        
        Map<Integer, List<Person>> byAge = people.stream()
            .collect(Collectors.groupingBy(Person::getAge));
    }
}
```

### forEach() - Duyệt qua từng phần tử
```java
List<String> names = Arrays.asList("An", "Bình", "Cường");

names.stream()
    .forEach(System.out::println);

// Hoặc
names.stream()
    .forEach(name -> System.out.println("Tên: " + name));
```

### count() - Đếm số lượng
```java
long count = names.stream()
    .filter(n -> n.length() > 3)
    .count();

System.out.println("Số tên dài > 3: " + count);
```

### anyMatch(), allMatch(), noneMatch()
```java
List<Integer> numbers = Arrays.asList(2, 4, 6, 8, 10);

// Có số nào > 5?
boolean hasGreaterThan5 = numbers.stream()
    .anyMatch(n -> n > 5);

// Tất cả đều chẵn?
boolean allEven = numbers.stream()
    .allMatch(n -> n % 2 == 0);

// Không có số lẻ?
boolean noOdd = numbers.stream()
    .noneMatch(n -> n % 2 != 0);
```

### findFirst(), findAny()
```java
List<String> names = Arrays.asList("An", "Bình", "Cường");

// Tìm phần tử đầu tiên
Optional<String> first = names.stream()
    .filter(n -> n.startsWith("B"))
    .findFirst();

first.ifPresent(System.out::println); // Bình

// Tìm bất kỳ (hữu ích với parallel stream)
Optional<String> any = names.stream()
    .filter(n -> n.length() > 2)
    .findAny();
```

### reduce() - Gộp lại thành 1 giá trị
```java
public class ReduceExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        
        // Tổng
        Optional<Integer> sum = numbers.stream()
            .reduce((a, b) -> a + b);
        
        // Hoặc
        int sum2 = numbers.stream()
            .reduce(0, (a, b) -> a + b);
        
        // Tích
        int product = numbers.stream()
            .reduce(1, (a, b) -> a * b);
        
        // Tìm max
        Optional<Integer> max = numbers.stream()
            .reduce(Integer::max);
        
        // Nối chuỗi
        List<String> words = Arrays.asList("Java", "is", "great");
        String sentence = words.stream()
            .reduce("", (a, b) -> a + " " + b).trim();
        
        System.out.println(sentence); // Java is great
    }
}
```

## Ví dụ thực tế

### Xử lý danh sách sinh viên
```java
class Student {
    String name;
    int age;
    double gpa;
    
    public Student(String name, int age, double gpa) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
    }
    
    // Getters
}

public class StudentStreamExample {
    public static void main(String[] args) {
        List<Student> students = Arrays.asList(
            new Student("An", 20, 3.5),
            new Student("Bình", 22, 3.8),
            new Student("Cường", 21, 3.2),
            new Student("Dũng", 23, 3.9),
            new Student("Em", 20, 3.6)
        );
        
        // Lọc sinh viên GPA >= 3.5, sắp xếp theo tên
        List<Student> topStudents = students.stream()
            .filter(s -> s.getGpa() >= 3.5)
            .sorted(Comparator.comparing(Student::getName))
            .collect(Collectors.toList());
        
        // Tính GPA trung bình
        double avgGpa = students.stream()
            .mapToDouble(Student::getGpa)
            .average()
            .orElse(0.0);
        
        // Nhóm theo tuổi
        Map<Integer, List<Student>> byAge = students.stream()
            .collect(Collectors.groupingBy(Student::getAge));
        
        // Lấy tên sinh viên có GPA cao nhất
        Optional<String> topStudent = students.stream()
            .max(Comparator.comparing(Student::getGpa))
            .map(Student::getName);
        
        topStudent.ifPresent(name -> 
            System.out.println("Sinh viên xuất sắc: " + name)
        );
        
        // Đếm sinh viên theo nhóm GPA
        Map<String, Long> gpaGroups = students.stream()
            .collect(Collectors.groupingBy(
                s -> s.getGpa() >= 3.5 ? "Giỏi" : "Khá",
                Collectors.counting()
            ));
    }
}
```

## Parallel Stream

Xử lý song song để tăng hiệu năng với data lớn.

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// Sequential
long sum1 = numbers.stream()
    .mapToInt(Integer::intValue)
    .sum();

// Parallel
long sum2 = numbers.parallelStream()
    .mapToInt(Integer::intValue)
    .sum();
```

## Kết luận

Stream API giúp:
- Code ngắn gọn, dễ đọc
- Xử lý data theo phong cách functional
- Dễ dàng parallel processing
- Kết hợp nhiều operations linh hoạt

Hãy sử dụng Stream để code Java hiện đại và hiệu quả hơn!
