---
title: "JavaScript Async Programming - Promise và Async/Await"
date: 2024-12-28
description: "Nắm vững lập trình bất đồng bộ trong JavaScript với Callbacks, Promises và Async/Await"
tags: ["JavaScript", "Async", "Promises", "Modern JavaScript"]
draft: false
---

## Lập trình bất đồng bộ là gì?

Asynchronous programming cho phép thực hiện các tác vụ mất thời gian (API calls, file operations) mà không block main thread.

## Callback Functions

Cách cổ điển để xử lý async operations.

```javascript
// Callback example
function fetchData(callback) {
    setTimeout(() => {
        const data = { id: 1, name: "Tài" };
        callback(data);
    }, 1000);
}

fetchData((data) => {
    console.log('Data received:', data);
});

console.log('This runs first!');
```

### Callback Hell (Pyramid of Doom)
```javascript
// ❌ Callback hell - khó đọc, khó maintain
fetchUser(userId, (user) => {
    fetchPosts(user.id, (posts) => {
        fetchComments(posts[0].id, (comments) => {
            fetchLikes(comments[0].id, (likes) => {
                console.log(likes);
            });
        });
    });
});
```

## Promises

Promise là đối tượng đại diện cho kết quả của async operation trong tương lai.

### Promise States
- **Pending**: Đang chờ
- **Fulfilled**: Thành công
- **Rejected**: Thất bại

### Creating a Promise
```javascript
const myPromise = new Promise((resolve, reject) => {
    // Async operation
    setTimeout(() => {
        const success = true;
        
        if (success) {
            resolve('Thành công!'); // Fulfilled
        } else {
            reject('Có lỗi xảy ra!'); // Rejected
        }
    }, 1000);
});

// Consuming the promise
myPromise
    .then(result => {
        console.log(result); // "Thành công!"
    })
    .catch(error => {
        console.error(error);
    });
```

### Practical Promise Example
```javascript
function fetchUser(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "Tài", age: 25 });
            } else {
                reject(new Error('Invalid user ID'));
            }
        }, 1000);
    });
}

// Usage
fetchUser(1)
    .then(user => {
        console.log('User:', user);
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
```

### Promise Chaining
```javascript
// ✅ Promise chain - dễ đọc hơn callback hell
fetchUser(1)
    .then(user => {
        console.log('User:', user);
        return fetchPosts(user.id); // Return promise
    })
    .then(posts => {
        console.log('Posts:', posts);
        return fetchComments(posts[0].id);
    })
    .then(comments => {
        console.log('Comments:', comments);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

### finally()
```javascript
showLoadingSpinner();

fetchData()
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    })
    .finally(() => {
        hideLoadingSpinner(); // Luôn chạy
    });
```

## Promise Static Methods

### Promise.all()
Chờ TẤT CẢ promises hoàn thành.

```javascript
const promise1 = fetchUser(1);
const promise2 = fetchUser(2);
const promise3 = fetchUser(3);

Promise.all([promise1, promise2, promise3])
    .then(([user1, user2, user3]) => {
        console.log('All users:', user1, user2, user3);
    })
    .catch(error => {
        console.error('One of them failed:', error);
    });

// Practical example
const urls = [
    'https://api.example.com/user/1',
    'https://api.example.com/user/2',
    'https://api.example.com/user/3'
];

Promise.all(urls.map(url => fetch(url)))
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then(users => {
        console.log('All users loaded:', users);
    });
```

### Promise.race()
Trả về promise đầu tiên hoàn thành (fulfilled hoặc rejected).

```javascript
const slow = new Promise(resolve => 
    setTimeout(() => resolve('Slow'), 3000)
);

const fast = new Promise(resolve => 
    setTimeout(() => resolve('Fast'), 1000)
);

Promise.race([slow, fast])
    .then(result => {
        console.log(result); // "Fast"
    });

// Timeout pattern
function timeout(ms) {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout!')), ms);
    });
}

Promise.race([
    fetchData(),
    timeout(5000)
])
.then(data => console.log(data))
.catch(error => console.error(error)); // Timeout sau 5s
```

### Promise.allSettled()
Chờ TẤT CẢ promises hoàn thành, không quan tâm thành công hay thất bại.

```javascript
const promises = [
    Promise.resolve('Success 1'),
    Promise.reject('Error 1'),
    Promise.resolve('Success 2'),
    Promise.reject('Error 2')
];

Promise.allSettled(promises)
    .then(results => {
        results.forEach(result => {
            if (result.status === 'fulfilled') {
                console.log('Success:', result.value);
            } else {
                console.log('Failed:', result.reason);
            }
        });
    });
```

### Promise.any()
Trả về promise đầu tiên FULFILLED.

```javascript
const promises = [
    Promise.reject('Error 1'),
    Promise.resolve('Success 1'),
    Promise.resolve('Success 2')
];

Promise.any(promises)
    .then(result => {
        console.log(result); // "Success 1"
    })
    .catch(error => {
        console.log('All failed');
    });
```

## Async/Await

Cú pháp hiện đại để viết async code như sync code.

### Basic Syntax
```javascript
// Async function luôn return Promise
async function fetchUser() {
    return { id: 1, name: "Tài" };
}

fetchUser().then(user => console.log(user));

// Await chỉ dùng trong async function
async function getUser() {
    const user = await fetchUser(); // Chờ promise resolve
    console.log(user);
    return user;
}
```

### Error Handling with try-catch
```javascript
async function getUserData(userId) {
    try {
        const user = await fetchUser(userId);
        const posts = await fetchPosts(user.id);
        const comments = await fetchComments(posts[0].id);
        
        return { user, posts, comments };
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw nếu cần
    }
}

// Usage
getUserData(1)
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

### Sequential vs Parallel
```javascript
// ❌ Sequential - chậm (tổng 3s)
async function sequential() {
    const user1 = await fetchUser(1);  // 1s
    const user2 = await fetchUser(2);  // 1s
    const user3 = await fetchUser(3);  // 1s
    return [user1, user2, user3];
}

// ✅ Parallel - nhanh (tổng 1s)
async function parallel() {
    const [user1, user2, user3] = await Promise.all([
        fetchUser(1),
        fetchUser(2),
        fetchUser(3)
    ]);
    return [user1, user2, user3];
}
```

### Real-world Example: Fetch API
```javascript
async function getUsers() {
    try {
        // Fetch data
        const response = await fetch('https://api.example.com/users');
        
        // Check response
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parse JSON
        const users = await response.json();
        
        return users;
    } catch (error) {
        console.error('Failed to fetch users:', error);
        throw error;
    }
}

// Usage
async function displayUsers() {
    try {
        const users = await getUsers();
        users.forEach(user => {
            console.log(user.name);
        });
    } catch (error) {
        console.error('Error displaying users:', error);
    }
}
```

### Multiple Async Operations
```javascript
async function getUserProfile(userId) {
    try {
        // Parallel requests
        const [user, posts, friends] = await Promise.all([
            fetch(`/api/users/${userId}`).then(r => r.json()),
            fetch(`/api/users/${userId}/posts`).then(r => r.json()),
            fetch(`/api/users/${userId}/friends`).then(r => r.json())
        ]);
        
        return {
            user,
            posts,
            friends
        };
    } catch (error) {
        console.error('Error loading profile:', error);
        throw error;
    }
}
```

### Async Iteration
```javascript
async function processUsers(userIds) {
    for (const userId of userIds) {
        // Sequential processing
        const user = await fetchUser(userId);
        await processUser(user);
    }
}

// Parallel processing
async function processUsersParallel(userIds) {
    await Promise.all(
        userIds.map(async (userId) => {
            const user = await fetchUser(userId);
            await processUser(user);
        })
    );
}
```

## Practical Examples

### API Call with Loading State
```javascript
class UserService {
    async fetchUsers() {
        const loadingEl = document.querySelector('#loading');
        const errorEl = document.querySelector('#error');
        const usersEl = document.querySelector('#users');
        
        try {
            // Show loading
            loadingEl.style.display = 'block';
            errorEl.style.display = 'none';
            
            const response = await fetch('/api/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            
            const users = await response.json();
            
            // Display users
            usersEl.innerHTML = users
                .map(user => `<div>${user.name}</div>`)
                .join('');
                
        } catch (error) {
            errorEl.textContent = error.message;
            errorEl.style.display = 'block';
        } finally {
            loadingEl.style.display = 'none';
        }
    }
}
```

### Retry Logic
```javascript
async function fetchWithRetry(url, options = {}, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            if (i === retries - 1) throw error;
            
            // Wait before retry (exponential backoff)
            await new Promise(resolve => 
                setTimeout(resolve, Math.pow(2, i) * 1000)
            );
        }
    }
}

// Usage
try {
    const data = await fetchWithRetry('/api/data', {}, 3);
    console.log(data);
} catch (error) {
    console.error('Failed after 3 retries:', error);
}
```

### Timeout with Async/Await
```javascript
function timeout(ms) {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout!')), ms);
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
        if (error.message === 'Timeout!') {
            console.error('Request timed out');
        }
        throw error;
    }
}
```

## Best Practices

### 1. Always handle errors
```javascript
// ❌ Bad
async function bad() {
    const data = await fetchData(); // Không xử lý error
    return data;
}

// ✅ Good
async function good() {
    try {
        const data = await fetchData();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
```

### 2. Avoid mixing patterns
```javascript
// ❌ Bad - mixing async/await và .then()
async function mixed() {
    const user = await fetchUser();
    return fetchPosts(user.id).then(posts => posts);
}

// ✅ Good - consistent async/await
async function consistent() {
    const user = await fetchUser();
    const posts = await fetchPosts(user.id);
    return posts;
}
```

### 3. Use Promise.all for parallel operations
```javascript
// ❌ Bad - sequential
async function sequential() {
    const user = await fetchUser();
    const posts = await fetchPosts();
    return { user, posts };
}

// ✅ Good - parallel
async function parallel() {
    const [user, posts] = await Promise.all([
        fetchUser(),
        fetchPosts()
    ]);
    return { user, posts };
}
```

## Kết luận

Async programming trong JavaScript:
- **Callbacks**: Cơ bản nhưng dễ callback hell
- **Promises**: Giải quyết callback hell với chaining
- **Async/Await**: Cú pháp hiện đại, dễ đọc nhất

Best practices:
- Luôn xử lý errors
- Sử dụng Promise.all cho parallel operations
- Consistent coding style
- Timeout cho long-running operations

Async/await là cách hiện đại nhất và nên được sử dụng trong code mới!
