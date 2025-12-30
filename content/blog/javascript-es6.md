---
title: "JavaScript ES6+ - Tính năng hiện đại"
date: 2025-12-24
description: "Arrow functions, Destructuring, Classes, Modules"
tags: ["JavaScript", "ES6"]
image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=400&fit=crop"
draft: false
---

## Arrow Functions

Cú pháp ngắn gọn cho functions.

```javascript
// Function cũ
function tong(a, b) {
    return a + b;
}

// Arrow function
const tong2 = (a, b) => a + b;

// Nhiều dòng
const tinhToan = (a, b) => {
    const sum = a + b;
    return sum * 2;
};

// Một tham số - bỏ ngoặc
const binhPhuong = x => x * x;

// Không tham số
const xinChao = () => console.log("Xin chào!");
```

## Template Literals

Nối chuỗi dễ dàng với backticks.

```javascript
const ten = "Tai";
const tuoi = 25;

// Cũ
const message1 = "Tên: " + ten + ", Tuổi: " + tuoi;

// Template literal
const message2 = `Tên: ${ten}, Tuổi: ${tuoi}`;

// Nhiều dòng
const html = `
    <div>
        <h1>${ten}</h1>
        <p>Tuổi: ${tuoi}</p>
    </div>
`;
```

## Destructuring

Gán giá trị từ array/object.

```javascript
// Array destructuring
const mang = [1, 2, 3, 4, 5];
const [first, second, ...rest] = mang;
console.log(first);   // 1
console.log(second);  // 2
console.log(rest);    // [3, 4, 5]

// Object destructuring
const nguoi = {
    ten: "Tai",
    tuoi: 25,
    email: "tai@example.com"
};

const {ten, tuoi} = nguoi;
console.log(ten);   // "Tai"
console.log(tuoi);  // 25

// Đổi tên biến
const {ten: name, tuoi: age} = nguoi;

// Giá trị mặc định
const {sdt = "Không có"} = nguoi;
```

## Spread và Rest

### Spread Operator (...)

```javascript
// Copy array
const arr1 = [1, 2, 3];
const arr2 = [...arr1];  // [1, 2, 3]

// Nối array
const arr3 = [...arr1, 4, 5];  // [1, 2, 3, 4, 5]

// Copy object
const obj1 = {a: 1, b: 2};
const obj2 = {...obj1, c: 3};  // {a: 1, b: 2, c: 3}

// Merge objects
const merged = {...obj1, ...obj2};
```

### Rest Parameters

```javascript
function tong(...numbers) {
    return numbers.reduce((sum, n) => sum + n, 0);
}

console.log(tong(1, 2, 3, 4));  // 10
```

## Default Parameters

```javascript
function chao(ten = "Khách") {
    return `Xin chào, ${ten}!`;
}

console.log(chao());        // "Xin chào, Khách!"
console.log(chao("Tai"));   // "Xin chào, Tai!"
```

## Classes

Cú pháp OOP dễ đọc.

```javascript
class NguoiDung {
    constructor(ten, tuoi) {
        this.ten = ten;
        this.tuoi = tuoi;
    }
    
    gioi thieu() {
        return `Tôi là ${this.ten}, ${this.tuoi} tuổi`;
    }
    
    // Getter
    get thongTin() {
        return this.gioiThieu();
    }
    
    // Static method
    static taoAdmin() {
        return new NguoiDung("Admin", 0);
    }
}

// Kế thừa
class SinhVien extends NguoiDung {
    constructor(ten, tuoi, lop) {
        super(ten, tuoi);  // Gọi constructor cha
        this.lop = lop;
    }
    
    gioiThieu() {
        return `${super.gioiThieu()}, lớp ${this.lop}`;
    }
}

const sv = new SinhVien("Tai", 20, "22DTHE7");
console.log(sv.gioiThieu());  // "Tôi là Tai, 20 tuổi, lớp 22DTHE7"
```

## Modules

Tách code thành files.

```javascript
// math.js - Export
export const PI = 3.14159;

export function tong(a, b) {
    return a + b;
}

export default class Calculator {
    nhan(a, b) {
        return a * b;
    }
}

// app.js - Import
import Calculator, {PI, tong} from './math.js';

console.log(PI);           // 3.14159
console.log(tong(5, 3));   // 8

const calc = new Calculator();
console.log(calc.nhan(4, 2));  // 8
```

## Enhanced Object Literals

```javascript
const ten = "Tai";
const tuoi = 25;

// Shorthand properties
const nguoi = {
    ten,      // Thay vì ten: ten
    tuoi,     // Thay vì tuoi: tuoi
    
    // Method shorthand
    chao() {  // Thay vì chao: function()
        return `Xin chào, ${this.ten}`;
    }
};

// Computed property names
const key = "email";
const obj = {
    [key]: "tai@example.com",
    [`${key}Verified`]: true
};
console.log(obj);  // {email: "tai@example.com", emailVerified: true}
```

## Ví dụ: Quản lý Người dùng

```javascript
class User {
    #password;  // Private field (ES2022)
    
    constructor(username, password) {
        this.username = username;
        this.#password = password;
    }
    
    verify(pwd) {
        return this.#password === pwd;
    }
    
    get info() {
        return `User: ${this.username}`;
    }
}

class UserManager {
    constructor() {
        this.users = [];
    }
    
    add(user) {
        this.users.push(user);
    }
    
    find(username) {
        return this.users.find(u => u.username === username);
    }
    
    list() {
        return this.users.map(u => u.info);
    }
}

// Sử dụng
const manager = new UserManager();

manager.add(new User("tai", "123456"));
manager.add(new User("nam", "pass123"));

console.log(manager.list());
// ["User: tai", "User: nam"]

const user = manager.find("tai");
console.log(user.verify("123456"));  // true
console.log(user.verify("wrong"));   // false
```

## Optional Chaining (?.)

```javascript
const user = {
    name: "Tai",
    address: {
        city: "HCM"
    }
};

// Cũ - lỗi nếu address null
// console.log(user.address.street.name);  // Error!

// Optional chaining - trả về undefined
console.log(user.address?.street?.name);  // undefined (không lỗi)

// Với methods
user.greet?.();  // Chỉ gọi nếu method tồn tại
```

## Nullish Coalescing (??)

```javascript
const value1 = null ?? "default";      // "default"
const value2 = undefined ?? "default"; // "default"
const value3 = 0 ?? "default";         // 0 (không phải null/undefined)
const value4 = "" ?? "default";        // "" (không phải null/undefined)

// So với ||
const value5 = 0 || "default";         // "default" (0 là falsy)
const value6 = 0 ?? "default";         // 0 (chỉ check null/undefined)
```

## Lời khuyên

1. **Arrow functions** cho callbacks ngắn gọn
2. **Destructuring** giảm code dài dòng
3. **Spread** để copy/merge arrays/objects
4. **Classes** cho OOP rõ ràng
5. **Optional chaining** tránh lỗi null
6. **Template literals** cho string formatting

## Tổng kết

ES6+ modernize JavaScript: arrow functions ngắn gọn, destructuring tiện lợi, classes OOP rõ ràng, modules tách code. Sử dụng để code sạch và hiệu quả hơn.
