# TaiTH Tech Blog

Blog cá nhân chia sẻ kiến thức về lập trình mạng, Java và JavaScript.

## Đặc điểm

- ✅ Theme hiện đại "TechBlog" với thiết kế tối giản
- ✅ Responsive design
- ✅ Menu: Home, Blog, Về tôi
- ✅ 9 bài viết chất lượng về Java & JavaScript
- ✅ Syntax highlighting cho code
- ✅ Hỗ trợ tiếng Việt

## Nội dung Blog

### Bài viết về Java (5 bài)
1. Tổng quan về Java - Ngôn ngữ lập trình hướng đối tượng
2. OOP trong Java - Lập trình hướng đối tượng
3. Java Collections Framework - Quản lý dữ liệu hiệu quả
4. Exception Handling trong Java - Xử lý ngoại lệ
5. Java Stream API - Xử lý dữ liệu hiện đại

### Bài viết về JavaScript (4 bài)
6. JavaScript Cơ Bản - Bắt đầu với ngôn ngữ web phổ biến nhất
7. JavaScript ES6+ Features - Tính năng hiện đại
8. JavaScript DOM Manipulation - Tương tác với HTML
9. JavaScript Async Programming - Promise và Async/Await

## Cài đặt và chạy

### Yêu cầu
- Hugo Extended version (>= 0.112.0)

### Chạy local
```bash
# Di chuyển vào thư mục project
cd 22DTHE7_TaiTH_Profile

# Chạy Hugo server
hugo server -D

# Truy cập http://localhost:1313
```

### Build cho production
```bash
hugo

# File HTML được tạo trong thư mục public/
```

## Cấu trúc thư mục

```
22DTHE7_TaiTH_Profile/
├── hugo.toml              # Cấu hình chính
├── content/
│   ├── about.md          # Trang giới thiệu
│   └── blog/             # Thư mục bài viết
│       ├── _index.md
│       ├── java-co-ban.md
│       ├── java-oop.md
│       ├── java-collections.md
│       ├── java-exception.md
│       ├── java-stream.md
│       ├── javascript-co-ban.md
│       ├── javascript-es6.md
│       ├── javascript-dom.md
│       └── javascript-async.md
└── themes/
    └── techblog/         # Theme custom
        ├── layouts/      # HTML templates
        ├── static/       # CSS, JS, images
        └── theme.toml
```

## Deploy lên GitHub Pages

1. Tạo repository: `username.github.io`
2. Push code lên GitHub
3. Cấu hình GitHub Pages trong Settings
4. Website sẽ có địa chỉ: `https://username.github.io/`

## Tác giả

**Tài TH**
- Email: taith@example.com
- GitHub: [@taith](https://github.com/taith)

## License

MIT License - Tự do sử dụng cho mục đích học tập.
