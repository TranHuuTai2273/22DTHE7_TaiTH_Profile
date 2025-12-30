---
title: "JavaScript Cơ bản"
date: 2025-12-30
description: "Biến, kiểu dữ liệu, hàm và vòng lặp"
tags: ["JavaScript", "Cơ bản"]
image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop"
draft: false
---

## Giới thiệu

JavaScript là ngôn ngữ lập trình chạy trên trình duyệt và server (Node.js). Dùng để tạo website tương tác.

## Biến

```javascript
// let - có thể thay đổi
let tuoi = 25;
tuoi = 26;  // OK

// const - không thay đổi
const PI = 3.14159;
// PI = 3.14;  // Lỗi!

// var - cũ, tránh dùng
var ten = "Tai";
```

## Kiểu dữ liệu

### Kiểu nguyên thủy

```javascript
let so = 42;                    // Number
let gia = 19.99;                // Number (không phân biệt int/float)
let ten = "Tai";                // String
let hoatDong = true;            // Boolean
let khongCo = null;             // Null
let chuaGan;                    // Undefined

// Kiểm tra kiểu
typeof 42;          // "number"
typeof "text";      // "string"
typeof true;        // "boolean"
```

### Object và Array

```javascript
// Object
const nguoi = {
    ten: "Tai",
    tuoi: 25,
    email: "tai@example.com"
};

console.log(nguoi.ten);     // "Tai"
console.log(nguoi["tuoi"]); // 25

// Array
const mang = [1, 2, 3, 4, 5];
console.log(mang[0]);       // 1
console.log(mang.length);   // 5
```

## Toán tử

```javascript
// Số học
let a = 10, b = 3;
console.log(a + b);   // 13
console.log(a - b);   // 7
console.log(a * b);   // 30
console.log(a / b);   // 3.333...
console.log(a % b);   // 1

// So sánh
console.log(5 == "5");   // true (chỉ so giá trị)
console.log(5 === "5");  // false (so cả kiểu)
console.log(5 != "5");   // false
console.log(5 !== "5");  // true

// Logic
console.log(true && false);  // false
console.log(true || false);  // true
console.log(!true);          // false
```

## Cấu trúc điều khiển

### If-Else

```javascript
let diem = 85;

if (diem >= 90) {
    console.log("Xuất sắc");
} else if (diem >= 80) {
    console.log("Giỏi");
} else {
    console.log("Khá");
}

// Toán tử 3 ngôi
let ketQua = diem >= 60 ? "Đậu" : "Rớt";
```

### Switch

```javascript
let ngay = 2;

switch (ngay) {
    case 1:
        console.log("Thứ hai");
        break;
    case 2:
        console.log("Thứ ba");
        break;
    default:
        console.log("Không hợp lệ");
}
```

### Vòng lặp

```javascript
// For
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// For...of (duyệt array)
const mang = [10, 20, 30];
for (let so of mang) {
    console.log(so);
}

// While
let j = 0;
while (j < 5) {
    console.log(j++);
}
```

## Hàm

```javascript
// Function declaration
function tong(a, b) {
    return a + b;
}

// Function expression
const nhan = function(a, b) {
    return a * b;
};

// Arrow function (ngắn gọn)
const binh = (a, b) => a * b;

// Gọi hàm
console.log(tong(5, 3));    // 8
console.log(nhan(4, 2));    // 8
console.log(binh(3, 3));    // 9
```

## Array Methods

```javascript
const arr = [1, 2, 3, 4, 5];

// forEach - duyệt
arr.forEach(num => console.log(num));

// map - biến đổi
const doubled = arr.map(num => num * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]

// filter - lọc
const chan = arr.filter(num => num % 2 === 0);
console.log(chan);  // [2, 4]

// reduce - tổng hợp
const tong = arr.reduce((sum, num) => sum + num, 0);
console.log(tong);  // 15

// find - tìm phần tử đầu
const first = arr.find(num => num > 3);
console.log(first);  // 4
```

## Ví dụ: Quản lý Công việc

```javascript
const todos = [];

function themCongViec(ten) {
    todos.push({
        id: Date.now(),
        ten: ten,
        hoanThanh: false
    });
}

function hoanThanhCongViec(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.hoanThanh = true;
    }
}

function hienThiCongViec() {
    console.log("\n=== DANH SÁCH CÔNG VIỆC ===");
    todos.forEach(todo => {
        const trangThai = todo.hoanThanh ? "✓" : "○";
        console.log(`${trangThai} ${todo.ten}`);
    });
}

// Sử dụng
themCongViec("Học JavaScript");
themCongViec("Làm bài tập");
themCongViec("Đọc sách");

hoanThanhCongViec(todos[0].id);

hienThiCongViec();
// ○ Học JavaScript
// ○ Làm bài tập
// ○ Đọc sách
```

## Lời khuyên

1. Dùng `const` mặc định, `let` khi cần thay đổi
2. Tránh dùng `var`
3. Dùng `===` thay vì `==`
4. Arrow function cho callback ngắn gọn
5. Array methods thay vì for loop

## Tổng kết

JavaScript cơ bản: biến lưu dữ liệu, hàm thực hiện logic, array methods xử lý danh sách. Nắm vững để học ES6+ và DOM manipulation.
