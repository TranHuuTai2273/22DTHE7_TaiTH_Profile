---
title: "JavaScript Cơ Bản - Bắt đầu với ngôn ngữ web phổ biến nhất"
date: 2024-12-25
description: "Tìm hiểu các khái niệm cơ bản của JavaScript: biến, kiểu dữ liệu, hàm và cấu trúc điều khiển"
tags: ["JavaScript", "Cơ bản", "Web Development"]
draft: false
---

## JavaScript là gì?

JavaScript là ngôn ngữ lập trình phổ biến nhất cho web development, chạy trên browser và có thể chạy trên server (Node.js).

## Đặc điểm của JavaScript

- **Interpreted**: Không cần biên dịch
- **Dynamic typing**: Kiểu dữ liệu linh hoạt
- **Prototype-based**: OOP dựa trên prototype
- **First-class functions**: Hàm là đối tượng
- **Event-driven**: Lập trình theo sự kiện

## Khai báo biến

```javascript
// var (cũ, tránh dùng)
var name = "Tài";

// let (có thể thay đổi)
let age = 25;
age = 26; // OK

// const (không thay đổi)
const PI = 3.14159;
// PI = 3.14; // Error!

// const với object/array
const person = { name: "An" };
person.name = "Bình"; // OK, thay đổi thuộc tính
person.age = 25;      // OK, thêm thuộc tính
// person = {};       // Error! Không thể gán lại
```

### Phạm vi biến (Scope)
```javascript
// Global scope
let globalVar = "global";

function testScope() {
    // Function scope
    let functionVar = "function";
    
    if (true) {
        // Block scope
        let blockVar = "block";
        console.log(blockVar);      // OK
        console.log(functionVar);   // OK
        console.log(globalVar);     // OK
    }
    
    // console.log(blockVar);       // Error!
}
```

## Kiểu dữ liệu

### Primitive Types
```javascript
// Number
let age = 25;
let price = 99.99;
let negative = -10;

// String
let name = "Tài";
let message = 'Hello';
let template = `Xin chào ${name}`; // Template literal

// Boolean
let isStudent = true;
let hasJob = false;

// Undefined
let x;
console.log(x); // undefined

// Null
let empty = null;

// Symbol (ES6)
let id = Symbol('id');

// BigInt (ES2020)
let bigNumber = 1234567890123456789012345678901234567890n;
```

### Kiểm tra kiểu dữ liệu
```javascript
console.log(typeof 25);           // "number"
console.log(typeof "Hello");      // "string"
console.log(typeof true);         // "boolean"
console.log(typeof undefined);    // "undefined"
console.log(typeof null);         // "object" (bug lịch sử)
console.log(typeof {});           // "object"
console.log(typeof []);           // "object"
console.log(typeof function(){}); // "function"
```

## Toán tử

### Toán tử số học
```javascript
let a = 10, b = 3;

console.log(a + b);  // 13 (Cộng)
console.log(a - b);  // 7  (Trừ)
console.log(a * b);  // 30 (Nhân)
console.log(a / b);  // 3.333... (Chia)
console.log(a % b);  // 1  (Chia lấy dư)
console.log(a ** b); // 1000 (Lũy thừa)

// Increment/Decrement
let count = 5;
count++;  // 6
count--;  // 5
++count;  // 6
--count;  // 5
```

### Toán tử so sánh
```javascript
console.log(5 == "5");   // true  (So sánh giá trị)
console.log(5 === "5");  // false (So sánh giá trị và kiểu)
console.log(5 != "5");   // false
console.log(5 !== "5");  // true

console.log(10 > 5);     // true
console.log(10 >= 10);   // true
console.log(5 < 10);     // true
console.log(5 <= 5);     // true
```

### Toán tử logic
```javascript
let x = true, y = false;

console.log(x && y);  // false (AND)
console.log(x || y);  // true  (OR)
console.log(!x);      // false (NOT)

// Short-circuit evaluation
let result = null || "default";  // "default"
let value = true && "yes";       // "yes"
```

## Cấu trúc điều khiển

### If-Else
```javascript
let score = 85;

if (score >= 90) {
    console.log("Xuất sắc");
} else if (score >= 80) {
    console.log("Giỏi");
} else if (score >= 70) {
    console.log("Khá");
} else {
    console.log("Trung bình");
}

// Ternary operator
let result = score >= 80 ? "Đậu" : "Rớt";
```

### Switch
```javascript
let day = "Monday";

switch (day) {
    case "Monday":
        console.log("Thứ Hai");
        break;
    case "Tuesday":
        console.log("Thứ Ba");
        break;
    case "Saturday":
    case "Sunday":
        console.log("Cuối tuần");
        break;
    default:
        console.log("Ngày khác");
}
```

## Vòng lặp

### For Loop
```javascript
// Traditional for
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// For...of (ES6) - duyệt array
let fruits = ["Táo", "Cam", "Chuối"];
for (let fruit of fruits) {
    console.log(fruit);
}

// For...in - duyệt object keys
let person = { name: "Tài", age: 25 };
for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}
```

### While và Do-While
```javascript
// While
let count = 0;
while (count < 5) {
    console.log(count);
    count++;
}

// Do-While (chạy ít nhất 1 lần)
let num = 0;
do {
    console.log(num);
    num++;
} while (num < 5);
```

## Hàm (Functions)

### Function Declaration
```javascript
function greet(name) {
    return `Xin chào, ${name}!`;
}

console.log(greet("Tài")); // Xin chào, Tài!
```

### Function Expression
```javascript
const add = function(a, b) {
    return a + b;
};

console.log(add(5, 3)); // 8
```

### Arrow Function (ES6)
```javascript
// Cú pháp ngắn gọn
const multiply = (a, b) => a * b;

// Nhiều dòng
const calculate = (a, b) => {
    let sum = a + b;
    let product = a * b;
    return { sum, product };
};

// 1 tham số, bỏ ngoặc
const square = x => x * x;

// Không tham số
const sayHi = () => console.log("Hi!");
```

### Default Parameters
```javascript
function greet(name = "Khách") {
    return `Xin chào, ${name}!`;
}

console.log(greet());        // Xin chào, Khách!
console.log(greet("Tài"));   // Xin chào, Tài!
```

### Rest Parameters
```javascript
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3));        // 6
console.log(sum(1, 2, 3, 4, 5));  // 15
```

## Arrays

```javascript
// Tạo array
let numbers = [1, 2, 3, 4, 5];
let mixed = [1, "two", true, null];

// Truy cập
console.log(numbers[0]);  // 1
console.log(numbers.length); // 5

// Thêm phần tử
numbers.push(6);      // Thêm cuối
numbers.unshift(0);   // Thêm đầu

// Xóa phần tử
numbers.pop();        // Xóa cuối
numbers.shift();      // Xóa đầu

// Array methods
let fruits = ["Táo", "Cam", "Chuối"];

// Map
let upperFruits = fruits.map(f => f.toUpperCase());

// Filter
let longFruits = fruits.filter(f => f.length > 3);

// Find
let found = fruits.find(f => f.startsWith("C"));

// Includes
console.log(fruits.includes("Táo")); // true

// Join
console.log(fruits.join(", ")); // "Táo, Cam, Chuối"

// Spread operator
let moreFruits = [...fruits, "Dưa"];
```

## Objects

```javascript
// Object literal
let person = {
    name: "Tài",
    age: 25,
    isStudent: true,
    greet: function() {
        return `Xin chào, tôi là ${this.name}`;
    },
    // Shorthand method (ES6)
    sayHi() {
        return "Hi!";
    }
};

// Truy cập thuộc tính
console.log(person.name);        // "Tài"
console.log(person["age"]);      // 25

// Thêm/sửa thuộc tính
person.email = "tai@example.com";
person.age = 26;

// Xóa thuộc tính
delete person.isStudent;

// Object destructuring
let { name, age } = person;
console.log(name); // "Tài"

// Object spread
let updatedPerson = { ...person, city: "Hà Nội" };
```

## Template Literals

```javascript
let name = "Tài";
let age = 25;

// Multiline string
let message = `
    Xin chào, tôi là ${name}.
    Tôi ${age} tuổi.
`;

// Expression
let price = 100;
let total = `Tổng: ${price * 1.1} VND`;

// Tagged template
function highlight(strings, ...values) {
    return strings.reduce((result, str, i) => {
        return result + str + (values[i] ? `<strong>${values[i]}</strong>` : '');
    }, '');
}

let html = highlight`Tên: ${name}, Tuổi: ${age}`;
```

## Kết luận

JavaScript cơ bản bao gồm:
- Biến (let, const)
- Kiểu dữ liệu (primitive & reference)
- Toán tử và biểu thức
- Cấu trúc điều khiển (if, switch, loops)
- Hàm (function, arrow function)
- Arrays và Objects

Đây là nền tảng để học các khái niệm nâng cao như async/await, ES6+, và frameworks!
