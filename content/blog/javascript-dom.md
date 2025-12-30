---
title: "JavaScript DOM Manipulation - Tương tác với HTML"
date: 2024-12-27
description: "Học cách thao tác với DOM để tạo trang web động và tương tác"
tags: ["JavaScript", "DOM", "Web Development"]
draft: false
---

## DOM là gì?

DOM (Document Object Model) là cây cấu trúc biểu diễn HTML document, cho phép JavaScript tương tác và thay đổi nội dung, cấu trúc và style của trang web.

## Selecting Elements

### getElementById
```javascript
// Lấy element theo ID (trả về 1 element)
const header = document.getElementById('header');
console.log(header);
```

### getElementsByClassName
```javascript
// Lấy elements theo class (trả về HTMLCollection)
const items = document.getElementsByClassName('item');
console.log(items); // HTMLCollection

// Convert to array để dùng array methods
const itemsArray = Array.from(items);
itemsArray.forEach(item => console.log(item));
```

### getElementsByTagName
```javascript
// Lấy elements theo tag name
const paragraphs = document.getElementsByTagName('p');
const allDivs = document.getElementsByTagName('div');
```

### querySelector
```javascript
// Lấy element đầu tiên match CSS selector
const firstItem = document.querySelector('.item');
const title = document.querySelector('#title');
const input = document.querySelector('input[type="text"]');

// Nested selector
const firstLink = document.querySelector('.menu a');
```

### querySelectorAll
```javascript
// Lấy TẤT CẢ elements match CSS selector (NodeList)
const allItems = document.querySelectorAll('.item');
const allLinks = document.querySelectorAll('a');

// NodeList có forEach
allItems.forEach(item => {
    console.log(item.textContent);
});
```

## Modifying Content

### textContent
```javascript
const title = document.querySelector('h1');

// Đọc text
console.log(title.textContent);

// Ghi text (chỉ text, không parse HTML)
title.textContent = 'Tiêu đề mới';
```

### innerHTML
```javascript
const container = document.querySelector('.container');

// Đọc HTML
console.log(container.innerHTML);

// Ghi HTML (parse và render HTML)
container.innerHTML = '<p>Đoạn văn mới</p>';
container.innerHTML += '<p>Thêm đoạn nữa</p>';

// ⚠️ Cẩn thận với XSS attacks
const userInput = '<img src=x onerror="alert(1)">';
// container.innerHTML = userInput; // Nguy hiểm!
```

### innerText
```javascript
const element = document.querySelector('.text');

// innerText chỉ lấy text hiển thị (không lấy hidden)
console.log(element.innerText);
```

## Modifying Attributes

```javascript
const img = document.querySelector('img');

// Get attribute
console.log(img.getAttribute('src'));
console.log(img.src); // Hoặc direct property

// Set attribute
img.setAttribute('src', 'new-image.jpg');
img.setAttribute('alt', 'New image');

img.src = 'another-image.jpg';
img.alt = 'Another image';

// Remove attribute
img.removeAttribute('alt');

// Check attribute exists
if (img.hasAttribute('src')) {
    console.log('Image has src');
}

// Data attributes
const element = document.querySelector('.item');
element.setAttribute('data-id', '123');
console.log(element.dataset.id); // "123"
```

## Modifying Styles

### Inline styles
```javascript
const box = document.querySelector('.box');

// Single style
box.style.backgroundColor = 'red';
box.style.color = 'white';
box.style.padding = '20px';

// Multiple styles
Object.assign(box.style, {
    backgroundColor: 'blue',
    color: 'white',
    padding: '20px',
    borderRadius: '10px'
});

// Get computed style
const styles = window.getComputedStyle(box);
console.log(styles.backgroundColor);
console.log(styles.fontSize);
```

### CSS Classes
```javascript
const element = document.querySelector('.item');

// Add class
element.classList.add('active');
element.classList.add('highlight', 'selected');

// Remove class
element.classList.remove('active');

// Toggle class (thêm nếu chưa có, xóa nếu đã có)
element.classList.toggle('active');

// Check class exists
if (element.classList.contains('active')) {
    console.log('Element is active');
}

// Replace class
element.classList.replace('old-class', 'new-class');
```

## Creating Elements

```javascript
// Tạo element mới
const newDiv = document.createElement('div');
newDiv.textContent = 'Tôi là div mới';
newDiv.className = 'box';
newDiv.id = 'new-box';

// Tạo element với attributes
const link = document.createElement('a');
link.href = 'https://example.com';
link.textContent = 'Click me';
link.target = '_blank';

// Tạo text node
const textNode = document.createTextNode('Plain text');
```

## Adding Elements to DOM

```javascript
const container = document.querySelector('.container');
const newElement = document.createElement('p');
newElement.textContent = 'New paragraph';

// Append (thêm vào cuối)
container.appendChild(newElement);

// Prepend (thêm vào đầu)
container.insertBefore(newElement, container.firstChild);

// Modern methods (IE không support)
container.append(newElement);    // Thêm cuối
container.prepend(newElement);   // Thêm đầu

// Insert adjacent
const reference = document.querySelector('.reference');

// beforebegin: trước element
reference.insertAdjacentHTML('beforebegin', '<p>Before</p>');

// afterbegin: đầu element (first child)
reference.insertAdjacentHTML('afterbegin', '<p>First child</p>');

// beforeend: cuối element (last child)
reference.insertAdjacentHTML('beforeend', '<p>Last child</p>');

// afterend: sau element
reference.insertAdjacentHTML('afterend', '<p>After</p>');
```

## Removing Elements

```javascript
const element = document.querySelector('.remove-me');

// Modern way
element.remove();

// Old way
element.parentNode.removeChild(element);

// Remove all children
const container = document.querySelector('.container');
container.innerHTML = ''; // Cách đơn giản nhất

// Hoặc
while (container.firstChild) {
    container.removeChild(container.firstChild);
}
```

## Traversing the DOM

### Parent, Children, Siblings
```javascript
const element = document.querySelector('.item');

// Parent
const parent = element.parentElement;
const parentNode = element.parentNode;

// Closest parent matching selector
const container = element.closest('.container');

// Children
const children = element.children; // HTMLCollection (chỉ elements)
const childNodes = element.childNodes; // NodeList (gồm cả text nodes)

const firstChild = element.firstElementChild;
const lastChild = element.lastElementChild;

// Siblings
const nextSibling = element.nextElementSibling;
const prevSibling = element.previousElementSibling;
```

### Practical example
```html
<div class="container">
    <div class="item" data-id="1">Item 1</div>
    <div class="item active" data-id="2">Item 2</div>
    <div class="item" data-id="3">Item 3</div>
</div>
```

```javascript
const activeItem = document.querySelector('.item.active');

// Get parent container
const container = activeItem.parentElement;

// Get next item
const nextItem = activeItem.nextElementSibling;

// Get all siblings
const allItems = Array.from(container.children);
const siblings = allItems.filter(item => item !== activeItem);
```

## Event Handling

### addEventListener
```javascript
const button = document.querySelector('button');

// Click event
button.addEventListener('click', function(event) {
    console.log('Button clicked!');
    console.log('Event:', event);
    console.log('Target:', event.target);
});

// Arrow function
button.addEventListener('click', (e) => {
    console.log('Clicked!');
});

// Multiple listeners
button.addEventListener('click', handler1);
button.addEventListener('click', handler2);

// Remove listener
button.removeEventListener('click', handler1);
```

### Common Events
```javascript
const input = document.querySelector('input');

// Input events
input.addEventListener('input', (e) => {
    console.log('Value:', e.target.value);
});

input.addEventListener('change', (e) => {
    console.log('Changed to:', e.target.value);
});

input.addEventListener('focus', () => {
    console.log('Input focused');
});

input.addEventListener('blur', () => {
    console.log('Input blurred');
});

// Form events
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Ngăn submit mặc định
    console.log('Form submitted');
});

// Mouse events
const box = document.querySelector('.box');
box.addEventListener('mouseenter', () => console.log('Mouse enter'));
box.addEventListener('mouseleave', () => console.log('Mouse leave'));
box.addEventListener('mousemove', (e) => {
    console.log('Position:', e.clientX, e.clientY);
});

// Keyboard events
document.addEventListener('keydown', (e) => {
    console.log('Key:', e.key);
    if (e.key === 'Enter') {
        console.log('Enter pressed');
    }
});
```

### Event Delegation
```javascript
// ❌ Inefficient: Attach listener to each item
const items = document.querySelectorAll('.item');
items.forEach(item => {
    item.addEventListener('click', () => {
        console.log('Item clicked');
    });
});

// ✅ Efficient: Event delegation
const list = document.querySelector('.list');
list.addEventListener('click', (e) => {
    if (e.target.classList.contains('item')) {
        console.log('Item clicked:', e.target.textContent);
    }
});
```

## Practical Examples

### Todo List
```javascript
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const todoText = todoInput.value.trim();
    if (!todoText) return;
    
    // Create todo item
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
        <span>${todoText}</span>
        <button class="delete-btn">Xóa</button>
    `;
    
    todoList.appendChild(li);
    todoInput.value = '';
});

// Event delegation for delete
todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
    }
});
```

### Show/Hide Toggle
```javascript
const toggleBtn = document.querySelector('#toggle-btn');
const content = document.querySelector('#content');

toggleBtn.addEventListener('click', () => {
    content.classList.toggle('hidden');
    
    if (content.classList.contains('hidden')) {
        toggleBtn.textContent = 'Hiện';
    } else {
        toggleBtn.textContent = 'Ẩn';
    }
});
```

### Dynamic Form Validation
```javascript
const form = document.querySelector('#register-form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

emailInput.addEventListener('input', () => {
    const email = emailInput.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailPattern.test(email)) {
        emailInput.classList.add('invalid');
        showError(emailInput, 'Email không hợp lệ');
    } else {
        emailInput.classList.remove('invalid');
        clearError(emailInput);
    }
});

function showError(input, message) {
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains('error-message')) {
        error = document.createElement('span');
        error.className = 'error-message';
        input.after(error);
    }
    error.textContent = message;
}

function clearError(input) {
    const error = input.nextElementSibling;
    if (error && error.classList.contains('error-message')) {
        error.remove();
    }
}
```

## Kết luận

DOM Manipulation cho phép:
- Truy cập và modify elements
- Tạo/xóa elements động
- Thay đổi styles và classes
- Xử lý user interactions
- Tạo ứng dụng web động và interactive

Đây là kỹ năng nền tảng cho mọi web developer!
