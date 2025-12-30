---
title: "Java Collections Framework"
date: 2025-12-27
description: "Làm việc với List, Set, Map"
tags: ["Java", "Collections"]
image: "https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?w=800&h=400&fit=crop"
draft: false
---

## Collections là gì?

Collections Framework cung cấp các cấu trúc dữ liệu để lưu trữ và xử lý nhóm objects.

## List - Danh sách có thứ tự

### ArrayList

```java
import java.util.ArrayList;
import java.util.List;

List<String> danhSach = new ArrayList<>();

// Thêm phần tử
danhSach.add("Java");
danhSach.add("Python");
danhSach.add("JavaScript");

// Truy cập
String first = danhSach.get(0);  // "Java"

// Kích thước
int size = danhSach.size();  // 3

// Duyệt
for (String item : danhSach) {
    System.out.println(item);
}

// Xóa
danhSach.remove("Python");
danhSach.remove(0);  // Xóa theo index
```

**ArrayList vs LinkedList**:
- ArrayList: Truy cập nhanh `O(1)`, thêm/xóa chậm `O(n)`
- LinkedList: Thêm/xóa nhanh `O(1)`, truy cập chậm `O(n)`

## Set - Không trùng lặp

### HashSet

```java
import java.util.HashSet;
import java.util.Set;

Set<Integer> soNguyen = new HashSet<>();

soNguyen.add(10);
soNguyen.add(20);
soNguyen.add(10);  // Không thêm (trùng lặp)

System.out.println(soNguyen.size());  // 2

// Kiểm tra
boolean coChua = soNguyen.contains(10);  // true
```

### TreeSet - Tự động sắp xếp

```java
import java.util.TreeSet;

Set<Integer> sapXep = new TreeSet<>();
sapXep.add(30);
sapXep.add(10);
sapXep.add(20);

System.out.println(sapXep);  // [10, 20, 30]
```

## Map - Cặp Key-Value

### HashMap

```java
import java.util.HashMap;
import java.util.Map;

Map<String, Integer> tuoi = new HashMap<>();

// Thêm
tuoi.put("Tai", 25);
tuoi.put("Nam", 30);
tuoi.put("Linh", 22);

// Lấy giá trị
int tuoiTai = tuoi.get("Tai");  // 25

// Kiểm tra key
boolean coTai = tuoi.containsKey("Tai");  // true

// Duyệt
for (Map.Entry<String, Integer> entry : tuoi.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}

// Xóa
tuoi.remove("Nam");
```

### TreeMap - Tự động sắp xếp theo key

```java
import java.util.TreeMap;

Map<String, Integer> sapXep = new TreeMap<>();
sapXep.put("C", 3);
sapXep.put("A", 1);
sapXep.put("B", 2);

System.out.println(sapXep);  // {A=1, B=2, C=3}
```

## Generics

```java
// Không dùng generics - không an toàn
List list = new ArrayList();
list.add("String");
list.add(123);  // OK nhưng nguy hiểm

// Dùng generics - type-safe
List<String> strings = new ArrayList<>();
strings.add("String");
// strings.add(123);  // Lỗi compile!
```

## Collections Utility

```java
import java.util.Collections;
import java.util.List;

List<Integer> numbers = new ArrayList<>();
numbers.add(30);
numbers.add(10);
numbers.add(20);

// Sắp xếp
Collections.sort(numbers);  // [10, 20, 30]

// Đảo ngược
Collections.reverse(numbers);  // [30, 20, 10]

// Tìm max/min
int max = Collections.max(numbers);  // 30
int min = Collections.min(numbers);  // 10

// Trộn
Collections.shuffle(numbers);  // Random order
```

## Ví dụ: Quản lý Sinh viên

```java
import java.util.*;

class SinhVien {
    String ten;
    double diem;
    
    public SinhVien(String ten, double diem) {
        this.ten = ten;
        this.diem = diem;
    }
    
    @Override
    public String toString() {
        return ten + ": " + diem;
    }
}

public class QuanLySinhVien {
    private List<SinhVien> danhSach = new ArrayList<>();
    
    public void them(SinhVien sv) {
        danhSach.add(sv);
    }
    
    public List<SinhVien> timDiemCao(double nguong) {
        List<SinhVien> ketQua = new ArrayList<>();
        for (SinhVien sv : danhSach) {
            if (sv.diem >= nguong) {
                ketQua.add(sv);
            }
        }
        return ketQua;
    }
    
    public void sapXepTheoDiem() {
        Collections.sort(danhSach, (a, b) -> 
            Double.compare(b.diem, a.diem)  // Giảm dần
        );
    }
    
    public static void main(String[] args) {
        QuanLySinhVien ql = new QuanLySinhVien();
        ql.them(new SinhVien("Tai", 8.5));
        ql.them(new SinhVien("Nam", 7.0));
        ql.them(new SinhVien("Linh", 9.0));
        
        ql.sapXepTheoDiem();
        System.out.println("Danh sách: " + ql.danhSach);
        
        List<SinhVien> gioi = ql.timDiemCao(8.0);
        System.out.println("Điểm >= 8: " + gioi);
    }
}
```

## Chọn Collection phù hợp

| Cần gì? | Dùng gì? |
|---------|----------|
| Danh sách có thứ tự | ArrayList |
| Thêm/xóa nhiều | LinkedList |
| Không trùng lặp | HashSet |
| Không trùng + sắp xếp | TreeSet |
| Key-Value | HashMap |
| Key-Value + sắp xếp | TreeMap |

## Lời khuyên

1. **Dùng interface** khi khai báo: `List<String> list = new ArrayList<>();`
2. **Generics** cho type safety
3. **ArrayList** cho hầu hết trường hợp
4. **HashSet** khi cần unique elements
5. **HashMap** cho key-value mapping

## Tổng kết

Collections Framework giúp quản lý dữ liệu hiệu quả. List cho thứ tự, Set cho unique, Map cho key-value. Chọn đúng collection tối ưu performance.
