---
title: "JavaScript Async - Lập trình Bất đồng bộ"
date: 2025-12-23
description: "Callbacks, Promises, Async/Await, Fetch API"
tags: ["JavaScript", "Async", "Promises"]
image: "https://images.unsplash.com/photo-1537884944318-390069bb8665?w=800&h=400&fit=crop"
draft: false
---

## Async là gì?

JavaScript single-threaded. Async programming cho phép tasks (network, timers) chạy không block main thread.

## Callbacks

Function được gọi khi task hoàn thành.

```javascript
function getData(callback) {
    setTimeout(() => {
        const data = {id: 1, name: "Tai"};
        callback(data);
    }, 1000);
}

getData((result) => {
    console.log(result);  // Sau 1 giây
});
```

**Callback Hell**:
```javascript
getData((data) => {
    processData(data, (processed) => {
        saveData(processed, (result) => {
            // Quá sâu!
        });
    });
});
```

## Promises

Đại diện cho giá trị trong tương lai.

```javascript
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = true;
        if (success) {
            resolve("Thành công!");
        } else {
            reject("Lỗi!");
        }
    }, 1000);
});

// Sử dụng
promise
    .then(result => console.log(result))
    .catch(error => console.log(error));
```

### Promise Chaining

```javascript
function getUser(id) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({id, name: "Tai"}), 1000);
    });
}

function getPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => resolve([{id: 1, title: "Post 1"}]), 1000);
    });
}

// Chain
getUser(1)
    .then(user => {
        console.log("User:", user);
        return getPosts(user.id);
    })
    .then(posts => {
        console.log("Posts:", posts);
    })
    .catch(error => {
        console.log("Lỗi:", error);
    });
```

### Promise Methods

```javascript
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

// Promise.all - đợi tất cả
Promise.all([p1, p2, p3])
    .then(values => console.log(values));  // [1, 2, 3]

// Promise.race - cái nào xong trước
Promise.race([p1, p2, p3])
    .then(value => console.log(value));  // 1
```

## Async/Await - Cách tốt nhất

Làm async code trông như sync!

```javascript
async function fetchUser() {
    const user = await getUser(1);  // Đợi promise
    console.log(user);
    return user;
}

// Async function luôn trả về promise
fetchUser().then(user => console.log(user));
```

### Error Handling

```javascript
async function getData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log("Lỗi:", error);
    }
}
```

### Sequential vs Parallel

```javascript
// Sequential - chậm (3 giây)
async function sequential() {
    const user = await getUser(1);     // 1s
    const posts = await getPosts(1);   // 1s
    const comments = await getComments(1); // 1s
    return {user, posts, comments};
}

// Parallel - nhanh (1 giây)
async function parallel() {
    const [user, posts, comments] = await Promise.all([
        getUser(1),
        getPosts(1),
        getComments(1)
    ]);
    return {user, posts, comments};
}
```

## Fetch API - HTTP Requests

```javascript
// GET request
async function getUser(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        if (!response.ok) {
            throw new Error(`Lỗi HTTP! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Lỗi:", error);
        return null;
    }
}

// POST request
async function createUser(userData) {
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    
    return await response.json();
}
```

## Ví dụ: GitHub User Search

```html
<input type="text" id="username" placeholder="GitHub username">
<button id="search">Tìm</button>
<div id="result"></div>
```

```javascript
const input = document.getElementById('username');
const searchBtn = document.getElementById('search');
const resultDiv = document.getElementById('result');

async function searchUser() {
    const username = input.value.trim();
    if (!username) return;
    
    resultDiv.innerHTML = '<p>Đang tải...</p>';
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        if (!response.ok) {
            throw new Error('Không tìm thấy user');
        }
        
        const user = await response.json();
        
        resultDiv.innerHTML = `
            <img src="${user.avatar_url}" width="100">
            <h2>${user.name || user.login}</h2>
            <p>Followers: ${user.followers}</p>
            <p>Repos: ${user.public_repos}</p>
            <a href="${user.html_url}" target="_blank">Xem Profile</a>
        `;
        
    } catch (error) {
        resultDiv.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

searchBtn.addEventListener('click', searchUser);

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchUser();
});
```

## Retry Logic

```javascript
async function fetchWithRetry(url, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            console.log(`Thử lại ${i + 1}/${maxRetries}`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}
```

## Timeout

```javascript
function timeout(ms) {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout')), ms);
    });
}

async function fetchWithTimeout(url, ms = 5000) {
    try {
        const response = await Promise.race([
            fetch(url),
            timeout(ms)
        ]);
        return await response.json();
    } catch (error) {
        console.log("Timeout hoặc lỗi");
    }
}
```

## Lỗi thường gặp

```javascript
// 1. Quên await
const data = fetch('/api');  // Trả về promise, không phải data!

// Đúng
const data = await fetch('/api').then(r => r.json());

// 2. Không check response.ok
const response = await fetch('/api');
if (!response.ok) throw new Error('Lỗi');

// 3. Sequential không cần thiết
// Chậm
const user = await getUser();
const posts = await getPosts();

// Nhanh
const [user, posts] = await Promise.all([getUser(), getPosts()]);
```

## Lời khuyên

1. **Async/await** thay vì promise chains
2. **Try-catch** cho error handling
3. **Promise.all()** cho parallel operations
4. **Check response.ok** với fetch
5. **Loading states** cho UX tốt
6. **Timeout** tránh requests treo

## Tổng kết

Async programming essential cho JavaScript hiện đại. Evolution: callbacks → promises → async/await. Fetch API cho HTTP. Luôn xử lý errors và optimize với parallel execution.
