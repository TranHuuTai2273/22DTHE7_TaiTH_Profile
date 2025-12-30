---
title: "Java Collections Framework - Quản lý dữ liệu hiệu quả"
date: 2024-12-22
description: "Khám phá Collections Framework trong Java với List, Set, Map và các cấu trúc dữ liệu quan trọng"
tags: ["Java", "Collections", "Data Structures"]
draft: false
---

## Collections Framework là gì?

Java Collections Framework là một kiến trúc thống nhất để lưu trữ và thao tác với nhóm các đối tượng. Nó cung cấp các interface và class để làm việc với dữ liệu một cách hiệu quả.

## Cấu trúc phân cấp Collections

```
Collection (Interface)
├── List (Interface)
│   ├── ArrayList
│   ├── LinkedList
│   └── Vector
├── Set (Interface)
│   ├── HashSet
│   ├── LinkedHashSet
│   └── TreeSet
└── Queue (Interface)
    ├── PriorityQueue
    └── LinkedList

Map (Interface)
├── HashMap
├── LinkedHashMap
├── TreeMap
└── Hashtable
```

## 1. List Interface

List là collection có thứ tự, cho phép phần tử trùng lặp.

### ArrayList
```java
import java.util.ArrayList;
import java.util.List;

public class ArrayListExample {
    public static void main(String[] args) {
        // Tạo ArrayList
        List<String> fruits = new ArrayList<>();
        
        // Thêm phần tử
        fruits.add("Táo");
        fruits.add("Cam");
        fruits.add("Chuối");
        fruits.add("Cam"); // Cho phép trùng lặp
        
        // Truy cập theo index
        System.out.println("Phần tử đầu: " + fruits.get(0));
        
        // Kích thước
        System.out.println("Số lượng: " + fruits.size());
        
        // Duyệt qua List
        for (String fruit : fruits) {
            System.out.println(fruit);
        }
        
        // Xóa phần tử
        fruits.remove("Cam"); // Xóa phần tử đầu tiên = "Cam"
        fruits.remove(0);      // Xóa theo index
        
        // Kiểm tra tồn tại
        if (fruits.contains("Táo")) {
            System.out.println("Có táo trong danh sách");
        }
    }
}
```

### LinkedList
```java
import java.util.LinkedList;

public class LinkedListExample {
    public static void main(String[] args) {
        LinkedList<Integer> numbers = new LinkedList<>();
        
        // Thêm vào đầu và cuối
        numbers.addFirst(10);
        numbers.addLast(20);
        numbers.add(15);
        
        // Lấy phần tử đầu/cuối
        System.out.println("Đầu: " + numbers.getFirst());
        System.out.println("Cuối: " + numbers.getLast());
        
        // Xóa đầu/cuối
        numbers.removeFirst();
        numbers.removeLast();
    }
}
```

### So sánh ArrayList vs LinkedList

| Đặc điểm | ArrayList | LinkedList |
|----------|-----------|------------|
| Cấu trúc | Mảng động | Danh sách liên kết đôi |
| Truy cập | O(1) | O(n) |
| Thêm/xóa đầu | O(n) | O(1) |
| Thêm/xóa cuối | O(1) | O(1) |
| Bộ nhớ | Ít hơn | Nhiều hơn (lưu con trỏ) |

## 2. Set Interface

Set không cho phép phần tử trùng lặp.

### HashSet
```java
import java.util.HashSet;
import java.util.Set;

public class HashSetExample {
    public static void main(String[] args) {
        Set<String> languages = new HashSet<>();
        
        // Thêm phần tử
        languages.add("Java");
        languages.add("Python");
        languages.add("JavaScript");
        languages.add("Java"); // Không thêm được (trùng)
        
        System.out.println("Số ngôn ngữ: " + languages.size()); // 3
        
        // Kiểm tra
        if (languages.contains("Java")) {
            System.out.println("Có Java");
        }
        
        // Duyệt (không đảm bảo thứ tự)
        for (String lang : languages) {
            System.out.println(lang);
        }
    }
}
```

### TreeSet
```java
import java.util.TreeSet;

public class TreeSetExample {
    public static void main(String[] args) {
        TreeSet<Integer> scores = new TreeSet<>();
        
        scores.add(85);
        scores.add(92);
        scores.add(78);
        scores.add(95);
        scores.add(88);
        
        // Tự động sắp xếp
        System.out.println(scores); // [78, 85, 88, 92, 95]
        
        // Các phương thức đặc biệt
        System.out.println("Điểm cao nhất: " + scores.last());
        System.out.println("Điểm thấp nhất: " + scores.first());
        System.out.println("Điểm >= 85: " + scores.tailSet(85));
        System.out.println("Điểm < 90: " + scores.headSet(90));
    }
}
```

## 3. Map Interface

Map lưu trữ dữ liệu dưới dạng cặp key-value.

### HashMap
```java
import java.util.HashMap;
import java.util.Map;

public class HashMapExample {
    public static void main(String[] args) {
        Map<String, Integer> studentScores = new HashMap<>();
        
        // Thêm cặp key-value
        studentScores.put("Tài", 90);
        studentScores.put("An", 85);
        studentScores.put("Bình", 92);
        studentScores.put("Tài", 95); // Ghi đè giá trị cũ
        
        // Lấy giá trị
        System.out.println("Điểm của Tài: " + studentScores.get("Tài"));
        
        // Kiểm tra key
        if (studentScores.containsKey("An")) {
            System.out.println("An có trong danh sách");
        }
        
        // Duyệt qua Map
        for (Map.Entry<String, Integer> entry : studentScores.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
        
        // Duyệt chỉ keys
        for (String name : studentScores.keySet()) {
            System.out.println(name);
        }
        
        // Duyệt chỉ values
        for (Integer score : studentScores.values()) {
            System.out.println(score);
        }
        
        // getOrDefault
        int score = studentScores.getOrDefault("Nam", 0);
        System.out.println("Điểm Nam: " + score);
        
        // putIfAbsent
        studentScores.putIfAbsent("Cường", 88);
    }
}
```

### LinkedHashMap
```java
import java.util.LinkedHashMap;

public class LinkedHashMapExample {
    public static void main(String[] args) {
        // Giữ thứ tự insertion
        LinkedHashMap<String, String> capitals = new LinkedHashMap<>();
        
        capitals.put("Việt Nam", "Hà Nội");
        capitals.put("Nhật Bản", "Tokyo");
        capitals.put("Hàn Quốc", "Seoul");
        
        // In ra theo thứ tự đã thêm
        capitals.forEach((country, capital) -> 
            System.out.println(country + " - " + capital)
        );
    }
}
```

### TreeMap
```java
import java.util.TreeMap;

public class TreeMapExample {
    public static void main(String[] args) {
        // Tự động sắp xếp theo key
        TreeMap<Integer, String> students = new TreeMap<>();
        
        students.put(103, "An");
        students.put(101, "Bình");
        students.put(102, "Cường");
        
        // In ra theo thứ tự key
        System.out.println(students);
        // {101=Bình, 102=Cường, 103=An}
    }
}
```

## 4. Queue Interface

Queue hoạt động theo nguyên tắc FIFO (First-In-First-Out).

```java
import java.util.LinkedList;
import java.util.Queue;

public class QueueExample {
    public static void main(String[] args) {
        Queue<String> queue = new LinkedList<>();
        
        // Thêm vào queue
        queue.offer("Task 1");
        queue.offer("Task 2");
        queue.offer("Task 3");
        
        // Xem phần tử đầu (không xóa)
        System.out.println("Peek: " + queue.peek());
        
        // Lấy và xóa phần tử đầu
        while (!queue.isEmpty()) {
            System.out.println("Processing: " + queue.poll());
        }
    }
}
```

## 5. Các phương thức hữu ích

### Collections Utility Class
```java
import java.util.*;

public class CollectionsUtilityExample {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9));
        
        // Sắp xếp
        Collections.sort(numbers);
        System.out.println("Sorted: " + numbers);
        
        // Đảo ngược
        Collections.reverse(numbers);
        System.out.println("Reversed: " + numbers);
        
        // Tìm max, min
        System.out.println("Max: " + Collections.max(numbers));
        System.out.println("Min: " + Collections.min(numbers));
        
        // Xáo trộn
        Collections.shuffle(numbers);
        System.out.println("Shuffled: " + numbers);
        
        // Tìm kiếm nhị phân (cần sort trước)
        Collections.sort(numbers);
        int index = Collections.binarySearch(numbers, 5);
        System.out.println("Index of 5: " + index);
        
        // Tạo list immutable
        List<String> immutableList = Collections.unmodifiableList(
            Arrays.asList("A", "B", "C")
        );
    }
}
```

## Kết luận

Java Collections Framework cung cấp:
- **List**: Cho dữ liệu có thứ tự, cho phép trùng lặp
- **Set**: Cho dữ liệu không trùng lặp
- **Map**: Cho dữ liệu dạng key-value
- **Queue**: Cho xử lý dữ liệu theo FIFO

Việc chọn đúng collection sẽ giúp code hiệu quả và dễ maintain hơn!
