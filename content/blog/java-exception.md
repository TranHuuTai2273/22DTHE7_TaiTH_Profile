---
title: "Exception Handling trong Java - Xử lý ngoại lệ"
date: 2024-12-23
description: "Tìm hiểu cách xử lý exception trong Java với try-catch, throw, throws và custom exceptions"
tags: ["Java", "Exception", "Error Handling"]
draft: false
---

## Exception là gì?

Exception (ngoại lệ) là một sự kiện xảy ra trong quá trình thực thi chương trình, làm gián đoạn luồng bình thường của chương trình.

## Phân loại Exception

```
Throwable
├── Error (Lỗi hệ thống, không nên catch)
│   ├── OutOfMemoryError
│   └── StackOverflowError
└── Exception
    ├── IOException (Checked Exception)
    ├── SQLException
    └── RuntimeException (Unchecked Exception)
        ├── NullPointerException
        ├── ArrayIndexOutOfBoundsException
        └── ArithmeticException
```

### Checked Exception vs Unchecked Exception

**Checked Exception:**
- Phải xử lý tại compile time
- Bắt buộc dùng try-catch hoặc throws
- Ví dụ: IOException, SQLException

**Unchecked Exception:**
- Không bắt buộc xử lý
- Xảy ra tại runtime
- Ví dụ: NullPointerException, ArrayIndexOutOfBoundsException

## Xử lý Exception với try-catch

### Cú pháp cơ bản
```java
public class ExceptionExample {
    public static void main(String[] args) {
        try {
            int result = 10 / 0; // ArithmeticException
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println("Lỗi: Không thể chia cho 0!");
            System.out.println("Chi tiết: " + e.getMessage());
        }
        
        System.out.println("Chương trình tiếp tục chạy...");
    }
}
```

### Multiple catch blocks
```java
public class MultipleCatchExample {
    public static void main(String[] args) {
        try {
            String text = null;
            System.out.println(text.length()); // NullPointerException
            
            int[] arr = new int[5];
            arr[10] = 100; // ArrayIndexOutOfBoundsException
            
        } catch (NullPointerException e) {
            System.out.println("Lỗi: Biến null!");
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Lỗi: Index vượt quá mảng!");
        } catch (Exception e) {
            System.out.println("Lỗi khác: " + e.getMessage());
        }
    }
}
```

### Multi-catch (Java 7+)
```java
public class MultiCatchExample {
    public static void main(String[] args) {
        try {
            // Code có thể gây exception
            performOperation();
        } catch (IOException | SQLException e) {
            System.out.println("Lỗi I/O hoặc SQL: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
```

## Finally block

Finally block luôn được thực thi, dù có exception hay không.

```java
import java.io.*;

public class FinallyExample {
    public static void readFile(String filename) {
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new FileReader(filename));
            String line = reader.readLine();
            System.out.println(line);
        } catch (IOException e) {
            System.out.println("Lỗi đọc file: " + e.getMessage());
        } finally {
            // Luôn đóng resource
            try {
                if (reader != null) {
                    reader.close();
                    System.out.println("Đã đóng file");
                }
            } catch (IOException e) {
                System.out.println("Lỗi đóng file");
            }
        }
    }
}
```

## Try-with-resources (Java 7+)

Tự động đóng resource, code gọn hơn.

```java
import java.io.*;

public class TryWithResourcesExample {
    public static void readFile(String filename) {
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String line = reader.readLine();
            System.out.println(line);
        } catch (IOException e) {
            System.out.println("Lỗi: " + e.getMessage());
        }
        // reader tự động đóng
    }
    
    // Nhiều resources
    public static void copyFile(String source, String dest) {
        try (
            FileInputStream in = new FileInputStream(source);
            FileOutputStream out = new FileOutputStream(dest)
        ) {
            byte[] buffer = new byte[1024];
            int length;
            while ((length = in.read(buffer)) > 0) {
                out.write(buffer, 0, length);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## Throw và Throws

### throw - Ném exception
```java
public class ThrowExample {
    public static void validateAge(int age) {
        if (age < 18) {
            throw new IllegalArgumentException("Tuổi phải >= 18");
        }
        System.out.println("Tuổi hợp lệ: " + age);
    }
    
    public static void main(String[] args) {
        try {
            validateAge(15);
        } catch (IllegalArgumentException e) {
            System.out.println("Lỗi: " + e.getMessage());
        }
    }
}
```

### throws - Khai báo exception
```java
import java.io.*;

public class ThrowsExample {
    // Khai báo method có thể throw exception
    public static void readFile(String filename) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader(filename));
        String line = reader.readLine();
        System.out.println(line);
        reader.close();
    }
    
    public static void main(String[] args) {
        try {
            readFile("data.txt");
        } catch (IOException e) {
            System.out.println("Không thể đọc file: " + e.getMessage());
        }
    }
}
```

## Custom Exception

Tạo exception riêng cho ứng dụng.

```java
// Tạo custom exception
public class InsufficientBalanceException extends Exception {
    private double amount;
    
    public InsufficientBalanceException(double amount) {
        super("Số dư không đủ. Thiếu: " + amount);
        this.amount = amount;
    }
    
    public double getAmount() {
        return amount;
    }
}

// Sử dụng custom exception
public class BankAccount {
    private double balance;
    
    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
    }
    
    public void withdraw(double amount) throws InsufficientBalanceException {
        if (amount > balance) {
            double shortage = amount - balance;
            throw new InsufficientBalanceException(shortage);
        }
        balance -= amount;
        System.out.println("Rút thành công: " + amount);
        System.out.println("Số dư còn lại: " + balance);
    }
    
    public static void main(String[] args) {
        BankAccount account = new BankAccount(1000);
        
        try {
            account.withdraw(500);  // OK
            account.withdraw(700);  // Exception
        } catch (InsufficientBalanceException e) {
            System.out.println("Lỗi: " + e.getMessage());
            System.out.println("Thiếu: " + e.getAmount());
        }
    }
}
```

## Best Practices

### 1. Catch specific exceptions
```java
// ❌ Tránh
try {
    // code
} catch (Exception e) {
    // Quá chung chung
}

// ✅ Nên
try {
    // code
} catch (FileNotFoundException e) {
    // Xử lý cụ thể
} catch (IOException e) {
    // Xử lý cụ thể
}
```

### 2. Đừng catch và không làm gì
```java
// ❌ Tránh
try {
    // code
} catch (Exception e) {
    // Im lặng, rất nguy hiểm!
}

// ✅ Nên
try {
    // code
} catch (Exception e) {
    e.printStackTrace();
    // hoặc log error
    logger.error("Error occurred", e);
}
```

### 3. Đóng resources
```java
// ✅ Tốt nhất
try (Resource resource = new Resource()) {
    // Sử dụng resource
}

// ✅ Hoặc dùng finally
Resource resource = null;
try {
    resource = new Resource();
    // Sử dụng
} finally {
    if (resource != null) {
        resource.close();
    }
}
```

### 4. Tạo meaningful exception messages
```java
// ❌ Tránh
throw new Exception("Error");

// ✅ Nên
throw new IllegalArgumentException(
    "User ID không hợp lệ: " + userId + ". Phải là số dương."
);
```

## Ví dụ thực tế

```java
public class UserService {
    public User findUser(int userId) throws UserNotFoundException {
        if (userId <= 0) {
            throw new IllegalArgumentException("User ID phải > 0");
        }
        
        User user = database.findById(userId);
        if (user == null) {
            throw new UserNotFoundException("Không tìm thấy user: " + userId);
        }
        
        return user;
    }
    
    public void updateUser(User user) {
        try {
            validateUser(user);
            database.update(user);
            logger.info("Updated user: " + user.getId());
        } catch (ValidationException e) {
            logger.error("Validation failed: " + e.getMessage());
            throw e;
        } catch (DatabaseException e) {
            logger.error("Database error: " + e.getMessage());
            throw new ServiceException("Không thể cập nhật user", e);
        }
    }
}
```

## Kết luận

Exception handling giúp:
- Xử lý lỗi một cách có tổ chức
- Tăng tính ổn định của ứng dụng
- Debug dễ dàng hơn
- Code dễ maintain

Nhớ:
- Luôn catch specific exceptions
- Không bỏ qua exceptions
- Sử dụng try-with-resources cho resources
- Tạo custom exceptions khi cần thiết
