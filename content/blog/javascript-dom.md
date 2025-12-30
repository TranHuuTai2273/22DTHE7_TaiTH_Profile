---
title: "JavaScript DOM - Thao tác HTML"
date: 2025-12-30
description: "Chọn elements, thay đổi nội dung, xử lý sự kiện"
tags: ["JavaScript", "DOM"]
image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&h=400&fit=crop"
draft: false
---

## DOM là gì?

Document Object Model - cây đối tượng đại diện cho HTML, cho phép JavaScript thao tác trang web.

## Chọn Elements

```javascript
// Chọn theo ID
const header = document.getElementById('header');

// Chọn theo selector (giống CSS)
const btn = document.querySelector('.btn');
const allBtns = document.querySelectorAll('.btn');

// Chọn theo class/tag
const items = document.getElementsByClassName('item');
const paragraphs = document.getElementsByTagName('p');

// Duyệt NodeList
allBtns.forEach(btn => {
    console.log(btn.textContent);
});
```

## Thay đổi nội dung

```javascript
const elem = document.querySelector('#message');

// Text thuần
elem.textContent = "Xin chào";

// HTML (cẩn thận XSS!)
elem.innerHTML = "<strong>Xin chào</strong>";

// Attributes
const link = document.querySelector('a');
link.setAttribute('href', 'https://google.com');
link.href = 'https://github.com';  // Truy cập trực tiếp

// Data attributes
link.dataset.userId = '123';
console.log(link.dataset.userId);  // "123"
```

## Styling

```javascript
const box = document.querySelector('.box');

// CSS Classes (khuyên dùng)
box.classList.add('active');
box.classList.remove('hidden');
box.classList.toggle('dark');  // Thêm/xóa

// Kiểm tra class
if (box.classList.contains('active')) {
    console.log('Active!');
}

// Inline styles (tránh)
box.style.backgroundColor = 'blue';
box.style.padding = '10px';
```

## Tạo và xóa Elements

```javascript
// Tạo element
const div = document.createElement('div');
div.textContent = 'Hello';
div.className = 'box';

// Thêm vào DOM
document.body.appendChild(div);

// Thêm vị trí cụ thể
const container = document.querySelector('.container');
container.prepend(div);      // Đầu
container.appendChild(div);  // Cuối
container.before(div);       // Trước container
container.after(div);        // Sau container

// Xóa element
div.remove();
```

## Xử lý sự kiện

```javascript
const btn = document.querySelector('#myBtn');

// Click event
btn.addEventListener('click', function(e) {
    console.log('Clicked!');
    console.log(e.target);  // Element được click
});

// Arrow function
btn.addEventListener('click', (e) => {
    console.log('Clicked!');
});

// Form events
const input = document.querySelector('#email');

input.addEventListener('input', (e) => {
    console.log(e.target.value);  // Giá trị hiện tại
});

input.addEventListener('focus', () => {
    console.log('Input focused');
});

// Form submit
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();  // Chặn submit
    console.log('Form submitted');
});

// Keyboard
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        console.log('Enter pressed!');
    }
});
```

## Event Delegation

Gắn listener cho parent, xử lý events từ children.

```javascript
// Tốt - một listener
const list = document.querySelector('.list');

list.addEventListener('click', (e) => {
    if (e.target.classList.contains('item')) {
        console.log('Item clicked:', e.target.textContent);
    }
});

// Xấu - listener cho từng item
const items = document.querySelectorAll('.item');
items.forEach(item => {
    item.addEventListener('click', () => {
        console.log('Clicked');
    });
});
```

## Ví dụ: Todo List

```html
<input type="text" id="todoInput" placeholder="Thêm việc...">
<button id="addBtn">Thêm</button>
<ul id="todoList"></ul>
```

```javascript
const input = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('todoList');

function themTodo() {
    const text = input.value.trim();
    if (!text) return;
    
    // Tạo li
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="text">${text}</span>
        <button class="delete">Xóa</button>
    `;
    
    list.appendChild(li);
    input.value = '';
}

// Click nút Thêm
addBtn.addEventListener('click', themTodo);

// Enter trong input
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        themTodo();
    }
});

// Event delegation cho xóa
list.addEventListener('click', (e) => {
    // Xóa todo
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
    }
    
    // Toggle hoàn thành
    if (e.target.classList.contains('text')) {
        e.target.classList.toggle('completed');
    }
});
```

```css
.completed {
    text-decoration: line-through;
    color: #999;
}
```

## Performance Tips

```javascript
// 1. Cache DOM references
const container = document.querySelector('.container');
for (let i = 0; i < 100; i++) {
    container.innerHTML += '<p>Text</p>';  // Chậm
}

// 2. Dùng DocumentFragment
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
    const li = document.createElement('li');
    li.textContent = i;
    fragment.appendChild(li);
}
list.appendChild(fragment);  // Một lần reflow
```

## Lời khuyên

1. **querySelector** cho selector CSS
2. **classList** thay vì inline styles
3. **Event delegation** cho dynamic content
4. **textContent** an toàn hơn innerHTML
5. **Cache DOM** references
6. **addEventListener** thay vì onclick

## Tổng kết

DOM manipulation để tạo website tương tác. Chọn elements, thay đổi nội dung, xử lý events. Event delegation hiệu quả cho dynamic content.
