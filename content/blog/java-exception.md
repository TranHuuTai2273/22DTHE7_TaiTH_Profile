---
title: "Java Exception Handling"
date: 2025-12-28
description: "Xử lý ngoại lệ và lỗi trong Java"
tags: ["Java", "Exception"]
image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop"
draft: false
---

## Exception là gì?

Exception là sự kiện bất thường xảy ra khi chương trình chạy, làm gián đoạn luồng thực thi.

## Phân loại Exception

```
Throwable
├── Error (Lỗi hệ thống - không xử lý)
└── Exception
    ├── RuntimeException (Unchecked)
    └── IOException, SQLException... (Checked)
```

**Checked vs Unchecked**:
- **Checked**: Bắt buộc xử lý (try-catch hoặc throws)
- **Unchecked**: Không bắt buộc (RuntimeException)

## Try-Catch-Finally

```java
try {
    int ketQua = 10 / 0;  // ArithmeticException
} catch (ArithmeticException e) {
    System.out.println("Lỗi: " + e.getMessage());
} finally {
    System.out.println("Luôn chạy");  // Dù có lỗi hay không
}
```

### Nhiều catch blocks

```java
try {
    String text = null;
    System.out.println(text.length());  // NullPointerException
    
    int[] mang = {1, 2};
    System.out.println(mang[5]);  // ArrayIndexOutOfBoundsException
    
} catch (NullPointerException e) {
    System.out.println("Biến null!");
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Index vượt quá mảng!");
} catch (Exception e) {
    System.out.println("Lỗi khác: " + e);
}
```

### Multi-catch

```java
try {
    // code có thể lỗi
} catch (NullPointerException | ArrayIndexOutOfBoundsException e) {
    System.out.println("Lỗi null hoặc array!");
}
```

## Try-with-resources

Tự động đóng resources (file, connection...).

```java
import java.io.*;

// Tự động đóng file
try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
    String line = br.readLine();
    System.out.println(line);
} catch (IOException e) {
    e.printStackTrace();
}
// Không cần br.close() - tự động!
```

## Throw và Throws

### Throw - Ném exception

```java
public void kiemTraTuoi(int tuoi) {
    if (tuoi < 18) {
        throw new IllegalArgumentException("Phải >= 18 tuổi!");
    }
    System.out.println("Hợp lệ");
}
```

### Throws - Khai báo exception

```java
public void docFile(String path) throws IOException {
    BufferedReader br = new BufferedReader(new FileReader(path));
    String line = br.readLine();
    br.close();
}

// Người gọi phải xử lý
public void su dung() {
    try {
        docFile("data.txt");
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```

## Custom Exception

```java
// Tạo exception riêng
public class KhongDuTienException extends Exception {
    public KhongDuTienException(String message) {
        super(message);
    }
}

public class TaiKhoan {
    private double soDu;
    
    public TaiKhoan(double soDuBanDau) {
        this.soDu = soDuBanDau;
    }
    
    public void rutTien(double soTien) throws KhongDuTienException {
        if (soTien > soDu) {
            throw new KhongDuTienException(
                "Số dư không đủ! Còn: " + soDu + ", cần: " + soTien
            );
        }
        soDu -= soTien;
        System.out.println("Rút thành công: " + soTien);
    }
    
    public double getSoDu() {
        return soDu;
    }
}
```

## Ví dụ: Quản lý Tài khoản

```java
public class QuanLyTaiKhoan {
    public static void main(String[] args) {
        TaiKhoan tk = new TaiKhoan(1000000);
        
        try {
            tk.rutTien(500000);   // OK
            System.out.println("Còn: " + tk.getSoDu());
            
            tk.rutTien(800000);   // Lỗi!
            
        } catch (KhongDuTienException e) {
            System.out.println("Lỗi: " + e.getMessage());
        } finally {
            System.out.println("Số dư cuối: " + tk.getSoDu());
        }
    }
}

// Output:
// Rút thành công: 500000
// Còn: 500000.0
// Lỗi: Số dư không đủ! Còn: 500000.0, cần: 800000.0
// Số dư cuối: 500000.0
```

## Common Exceptions

| Exception | Nguyên nhân |
|-----------|-------------|
| NullPointerException | Truy cập object null |
| ArrayIndexOutOfBoundsException | Index vượt quá mảng |
| ArithmeticException | Chia cho 0 |
| NumberFormatException | Parse string thành số thất bại |
| IllegalArgumentException | Tham số không hợp lệ |
| IOException | Lỗi I/O (file, network) |

## Best Practices

1. **Catch cụ thể**: Catch exception cụ thể trước, Exception chung sau
2. **Không bỏ qua**: Không để catch block trống
3. **Throw sớm**: Ném exception ngay khi phát hiện lỗi
4. **Catch muộn**: Xử lý ở nơi có đủ context
5. **Custom exception**: Tạo exception riêng cho logic nghiệp vụ
6. **Try-with-resources**: Dùng cho resources cần đóng
7. **Logging**: Log exception thay vì chỉ printStackTrace

```java
// Tốt
try {
    // code
} catch (SpecificException e) {
    logger.error("Chi tiết lỗi", e);
    throw new CustomException("Message rõ ràng", e);
}

// Tránh
try {
    // code
} catch (Exception e) {
    // Bỏ qua - RẤT TỆ!
}
```

## Tổng kết

Exception handling giúp chương trình xử lý lỗi gracefully. Sử dụng try-catch cho lỗi có thể xảy ra, throw cho validate, và custom exception cho logic riêng.
