---
title: "Java OOP - Lập trình Hướng đối tượng"
date: 2025-12-26
description: "4 trụ cột OOP: Đóng gói, Kế thừa, Đa hình, Trừu tượng"
tags: ["Java", "OOP"]
image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop"
draft: false
---

## OOP là gì?

Lập trình hướng đối tượng tổ chức code thành objects có attributes (dữ liệu) và methods (hành vi).

## 4 trụ cột OOP

### 1. Encapsulation (Đóng gói)

Ẩn dữ liệu nội bộ, chỉ truy cập qua methods.

```java
public class TaiKhoan {
    private double soDu;  // Private - không truy cập trực tiếp
    
    public double getSoDu() {
        return soDu;
    }
    
    public void napTien(double soTien) {
        if (soTien > 0) {
            soDu += soTien;
        }
    }
    
    public boolean rutTien(double soTien) {
        if (soTien > 0 && soTien <= soDu) {
            soDu -= soTien;
            return true;
        }
        return false;
    }
}
```

**Lợi ích**: Kiểm soát dữ liệu, dễ bảo trì.

### 2. Inheritance (Kế thừa)

Class con kế thừa properties/methods từ class cha.

```java
// Class cha
public class NhanVien {
    protected String ten;
    protected double luongCoBan;
    
    public NhanVien(String ten, double luong) {
        this.ten = ten;
        this.luongCoBan = luong;
    }
    
    public double tinhLuong() {
        return luongCoBan;
    }
}

// Class con
public class QuanLy extends NhanVien {
    private double thuong;
    
    public QuanLy(String ten, double luong, double thuong) {
        super(ten, luong);  // Gọi constructor cha
        this.thuong = thuong;
    }
    
    @Override
    public double tinhLuong() {
        return luongCoBan + thuong;
    }
}
```

**Lợi ích**: Tái sử dụng code, mở rộng dễ dàng.

### 3. Polymorphism (Đa hình)

Cùng method, hành vi khác nhau.

```java
public class DongVat {
    public void keu() {
        System.out.println("Động vật kêu...");
    }
}

public class Cho extends DongVat {
    @Override
    public void keu() {
        System.out.println("Gâu gâu!");
    }
}

public class Meo extends DongVat {
    @Override
    public void keu() {
        System.out.println("Meo meo!");
    }
}

// Sử dụng
DongVat dv1 = new Cho();
DongVat dv2 = new Meo();
dv1.keu();  // "Gâu gâu!"
dv2.keu();  // "Meo meo!"
```

**Lợi ích**: Linh hoạt, dễ mở rộng.

### 4. Abstraction (Trừu tượng)

Ẩn chi tiết triển khai, chỉ hiển thị chức năng.

```java
// Abstract class
public abstract class HinhHoc {
    protected String mau;
    
    // Abstract method - bắt buộc override
    public abstract double tinhDienTich();
    
    // Concrete method
    public void hienThiMau() {
        System.out.println("Màu: " + mau);
    }
}

public class HinhTron extends HinhHoc {
    private double banKinh;
    
    public HinhTron(double r, String mau) {
        this.banKinh = r;
        this.mau = mau;
    }
    
    @Override
    public double tinhDienTich() {
        return Math.PI * banKinh * banKinh;
    }
}

// Interface
public interface VeHinh {
    void ve();
    void xoa();
}
```

**Lợi ích**: Tập trung vào "cái gì", không phải "như thế nào".

## Constructor

Khởi tạo object.

```java
public class SinhVien {
    private String ten;
    private int tuoi;
    
    // Constructor mặc định
    public SinhVien() {
        this.ten = "Chưa đặt tên";
        this.tuoi = 18;
    }
    
    // Constructor có tham số
    public SinhVien(String ten, int tuoi) {
        this.ten = ten;
        this.tuoi = tuoi;
    }
}
```

## Static & Final

```java
public class VatLy {
    // Static - thuộc class, không thuộc object
    public static final double TOC_DO_ANH_SANG = 299792458;
    private static int soDoiTuong = 0;
    
    public VatLy() {
        soDoiTuong++;
    }
    
    public static int demDoiTuong() {
        return soDoiTuong;
    }
}

// Sử dụng
double c = VatLy.TOC_DO_ANH_SANG;  // Không cần tạo object
int dem = VatLy.demDoiTuong();
```

## Ví dụ: Quản lý Nhân viên

```java
public abstract class NhanVien {
    protected String ten;
    protected double luongCoBan;
    
    public NhanVien(String ten, double luong) {
        this.ten = ten;
        this.luongCoBan = luong;
    }
    
    public abstract double tinhLuong();
}

public class LapTrinhVien extends NhanVien {
    private int gioLamThem;
    
    public LapTrinhVien(String ten, double luong, int gio) {
        super(ten, luong);
        this.gioLamThem = gio;
    }
    
    @Override
    public double tinhLuong() {
        return luongCoBan + (gioLamThem * 50000);
    }
}

// Test
NhanVien nv = new LapTrinhVien("Tai", 10000000, 20);
System.out.println("Lương: " + nv.tinhLuong());
```

## Lời khuyên

1. Dùng **private** cho fields, **public** cho methods
2. **Constructor** khởi tạo giá trị hợp lệ
3. **Override** methods khi cần hành vi khác
4. **Abstract/Interface** cho abstraction
5. **Static** cho utilities, không thay đổi theo object

## Tổng kết

OOP giúp code có tổ chức, dễ bảo trì và mở rộng. 4 trụ cột: Encapsulation bảo vệ dữ liệu, Inheritance tái sử dụng code, Polymorphism linh hoạt, Abstraction đơn giản hóa.
