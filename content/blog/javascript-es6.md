---
title: "JavaScript ES6+ Features - Tính năng hiện đại"
date: 2024-12-26
description: "Khám phá các tính năng mới trong ES6 và các phiên bản sau: arrow functions, destructuring, spread/rest, modules"
tags: ["JavaScript", "ES6", "Modern JavaScript"]
draft: false
---

## ES6 (ECMAScript 2015) là gì?

ES6 là phiên bản JavaScript lớn nhất với nhiều tính năng mới giúp code ngắn gọn, dễ đọc và mạnh mẽ hơn.

## 1. Let và Const

```javascript
// var - function scoped (cũ)
var x = 1;

// let - block scoped
let age = 25;
if (true) {
    let age = 30;
    console.log(age); // 30
}
console.log(age); // 25

// const - immutable reference
const PI = 3.14159;
// PI = 3.14; // Error!

const person = { name: "Tài" };
person.name = "An";  // OK
person.age = 25;     // OK
// person = {};      // Error!
```

## 2. Arrow Functions

```javascript
// Traditional function
function add(a, b) {
    return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// Với 1 parameter
const square = x => x * x;

// Không parameter
const greet = () => "Hello!";

// Multiple lines
const calculate = (a, b) => {
    const sum = a + b;
    const product = a * b;
    return { sum, product };
};

// Arrow function không có 'this' riêng
const person = {
    name: "Tài",
    // Regular function - 'this' = person
    sayHi: function() {
        console.log(`Hi, I'm ${this.name}`);
    },
    // Arrow function - 'this' từ outer scope
    sayBye: () => {
        console.log(`Bye, I'm ${this.name}`); // undefined
    }
};
```

## 3. Template Literals

```javascript
const name = "Tài";
const age = 25;

// Old way
const message1 = "Tôi là " + name + ", " + age + " tuổi";

// Template literal
const message2 = `Tôi là ${name}, ${age} tuổi`;

// Multiline
const html = `
    <div>
        <h1>${name}</h1>
        <p>Age: ${age}</p>
    </div>
`;

// Expressions
const price = 100;
const total = `Total: ${price * 1.1} VND`;

// Function calls
const upper = `Name: ${name.toUpperCase()}`;
```

## 4. Destructuring

### Array Destructuring
```javascript
const colors = ["red", "green", "blue"];

// Old way
const red = colors[0];
const green = colors[1];

// Destructuring
const [r, g, b] = colors;
console.log(r, g, b); // red green blue

// Skip elements
const [first, , third] = colors;
console.log(first, third); // red blue

// Default values
const [a, b, c, d = "yellow"] = colors;
console.log(d); // yellow

// Rest pattern
const [head, ...tail] = colors;
console.log(head); // red
console.log(tail); // ["green", "blue"]

// Swapping variables
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2 1
```

### Object Destructuring
```javascript
const person = {
    name: "Tài",
    age: 25,
    city: "Hà Nội"
};

// Basic
const { name, age } = person;
console.log(name, age); // Tài 25

// Rename variables
const { name: fullName, age: years } = person;
console.log(fullName, years); // Tài 25

// Default values
const { name, country = "Vietnam" } = person;
console.log(country); // Vietnam

// Nested destructuring
const student = {
    name: "An",
    scores: {
        math: 90,
        english: 85
    }
};

const { scores: { math, english } } = student;
console.log(math, english); // 90 85

// Function parameters
function greet({ name, age }) {
    console.log(`${name}, ${age} tuổi`);
}
greet(person); // Tài, 25 tuổi
```

## 5. Spread và Rest Operators

### Spread Operator (...)
```javascript
// Array spread
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Copy array
const original = [1, 2, 3];
const copy = [...original];

// Object spread
const person = { name: "Tài", age: 25 };
const student = { ...person, school: "HUST" };
console.log(student);
// { name: "Tài", age: 25, school: "HUST" }

// Override properties
const updated = { ...person, age: 26 };

// Function arguments
const numbers = [1, 2, 3, 4, 5];
console.log(Math.max(...numbers)); // 5
```

### Rest Parameters
```javascript
// Collect remaining arguments
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3));        // 6
console.log(sum(1, 2, 3, 4, 5));  // 15

// Mixed with normal parameters
function introduce(greeting, ...names) {
    return `${greeting} ${names.join(", ")}!`;
}

console.log(introduce("Hello", "An", "Bình", "Cường"));
// Hello An, Bình, Cường!

// Object rest
const { name, ...others } = { name: "Tài", age: 25, city: "HN" };
console.log(others); // { age: 25, city: "HN" }
```

## 6. Default Parameters

```javascript
function greet(name = "Khách", greeting = "Xin chào") {
    return `${greeting}, ${name}!`;
}

console.log(greet());              // Xin chào, Khách!
console.log(greet("Tài"));         // Xin chào, Tài!
console.log(greet("An", "Hi"));    // Hi, An!

// Expressions as defaults
function createUser(name, id = Date.now()) {
    return { name, id };
}

// Using previous parameters
function calculate(a, b = a * 2) {
    return a + b;
}
console.log(calculate(5)); // 15
```

## 7. Enhanced Object Literals

```javascript
const name = "Tài";
const age = 25;

// Shorthand properties
const person = {
    name,    // name: name
    age      // age: age
};

// Shorthand methods
const calculator = {
    // Old: add: function(a, b) { return a + b; }
    add(a, b) {
        return a + b;
    },
    subtract(a, b) {
        return a - b;
    }
};

// Computed property names
const key = "email";
const user = {
    name: "An",
    [key]: "an@example.com",
    [`${key}Verified`]: true
};
console.log(user);
// { name: "An", email: "an@example.com", emailVerified: true }
```

## 8. Classes

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    // Method
    greet() {
        return `Xin chào, tôi là ${this.name}`;
    }
    
    // Getter
    get info() {
        return `${this.name}, ${this.age} tuổi`;
    }
    
    // Setter
    set birthYear(year) {
        this.age = new Date().getFullYear() - year;
    }
    
    // Static method
    static compare(p1, p2) {
        return p1.age - p2.age;
    }
}

// Inheritance
class Student extends Person {
    constructor(name, age, school) {
        super(name, age);  // Gọi constructor cha
        this.school = school;
    }
    
    // Override method
    greet() {
        return `${super.greet()}, học tại ${this.school}`;
    }
}

const student = new Student("Tài", 25, "HUST");
console.log(student.greet());
// Xin chào, tôi là Tài, học tại HUST
```

## 9. Modules

### Export
```javascript
// math.js

// Named exports
export const PI = 3.14159;
export function add(a, b) {
    return a + b;
}
export function subtract(a, b) {
    return a - b;
}

// Or export all at once
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
export { multiply, divide };

// Default export
export default function calculate(a, b) {
    return { add: a + b, subtract: a - b };
}
```

### Import
```javascript
// app.js

// Import named exports
import { add, subtract, PI } from './math.js';

// Import with alias
import { add as sum } from './math.js';

// Import all
import * as math from './math.js';
console.log(math.add(5, 3));

// Import default
import calculate from './math.js';

// Mixed import
import calculate, { add, PI } from './math.js';
```

## 10. Array Methods mới

```javascript
const numbers = [1, 2, 3, 4, 5];

// find - tìm phần tử đầu tiên thỏa điều kiện
const found = numbers.find(n => n > 3);
console.log(found); // 4

// findIndex - tìm index
const index = numbers.findIndex(n => n > 3);
console.log(index); // 3

// includes - kiểm tra có chứa
console.log(numbers.includes(3)); // true

// Array.from - tạo array từ iterable
const str = "hello";
const chars = Array.from(str);
console.log(chars); // ['h', 'e', 'l', 'l', 'o']

// Array.of - tạo array từ arguments
const arr = Array.of(1, 2, 3);
console.log(arr); // [1, 2, 3]
```

## 11. String Methods mới

```javascript
const str = "JavaScript";

// startsWith
console.log(str.startsWith("Java")); // true

// endsWith
console.log(str.endsWith("Script")); // true

// includes
console.log(str.includes("Script")); // true

// repeat
console.log("Ha".repeat(3)); // "HaHaHa"

// padStart, padEnd
console.log("5".padStart(3, "0"));  // "005"
console.log("5".padEnd(3, "0"));    // "500"
```

## 12. Object Methods mới

```javascript
const obj1 = { a: 1 };
const obj2 = { b: 2 };
const obj3 = { c: 3 };

// Object.assign - merge objects
const merged = Object.assign({}, obj1, obj2, obj3);
console.log(merged); // { a: 1, b: 2, c: 3 }

// Or use spread
const merged2 = { ...obj1, ...obj2, ...obj3 };

// Object.keys, values, entries
const person = { name: "Tài", age: 25 };

console.log(Object.keys(person));    // ["name", "age"]
console.log(Object.values(person));  // ["Tài", 25]
console.log(Object.entries(person)); // [["name", "Tài"], ["age", 25]]

// Convert entries back to object
const entries = [["name", "An"], ["age", 30]];
const obj = Object.fromEntries(entries);
console.log(obj); // { name: "An", age: 30 }
```

## 13. Symbols

```javascript
// Create unique identifiers
const id1 = Symbol('id');
const id2 = Symbol('id');
console.log(id1 === id2); // false

// Use as object keys
const user = {
    name: "Tài",
    [id1]: 123
};

// Symbols are not enumerable
console.log(Object.keys(user)); // ["name"]

// Get symbol properties
console.log(Object.getOwnPropertySymbols(user)); // [Symbol(id)]
```

## 14. Map và Set

### Map
```javascript
// Map: key-value pairs với bất kỳ kiểu key nào
const map = new Map();

map.set('name', 'Tài');
map.set(1, 'number key');
map.set(true, 'boolean key');

console.log(map.get('name')); // "Tài"
console.log(map.size);        // 3
console.log(map.has('name')); // true

map.delete(1);
// map.clear(); // Xóa tất cả

// Iterate
for (let [key, value] of map) {
    console.log(`${key}: ${value}`);
}
```

### Set
```javascript
// Set: collection của unique values
const set = new Set([1, 2, 3, 2, 1]);
console.log(set); // Set { 1, 2, 3 }

set.add(4);
set.add(2); // Không thêm được (đã có)

console.log(set.has(2)); // true
console.log(set.size);   // 4

set.delete(1);

// Convert to array
const arr = [...set];

// Remove duplicates từ array
const numbers = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(numbers)];
console.log(unique); // [1, 2, 3, 4]
```

## Kết luận

ES6+ đã mang đến JavaScript:
- Cú pháp ngắn gọn hơn (arrow functions, destructuring)
- Code dễ đọc hơn (template literals, spread/rest)
- Tính năng OOP tốt hơn (classes)
- Module system chuẩn
- Collections mới (Map, Set, Symbol)

Đây là foundation cho JavaScript hiện đại!
