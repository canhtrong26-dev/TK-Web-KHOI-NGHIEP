# Todo Frontend

Ứng dụng quản lý công việc (Todo List) xây dựng bằng Next.js. Cho phép thêm, sửa, xóa và đánh dấu hoàn thành công việc. Dữ liệu lấy/gửi tới API backend tại `http://localhost:5000/api/tasks`.

## Chức năng chính

- Thêm công việc (tiêu đề, mô tả không bắt buộc)
- Hiển thị danh sách công việc
- Đánh dấu hoàn thành / chưa hoàn thành
- Sửa tiêu đề, mô tả
- Xóa công việc

## Công nghệ sử dụng

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4

## Getting Started

Dự án gồm 2 phần, cần chạy cả hai cùng lúc (mở 2 terminal):

**1. Chạy backend (kết nối MySQL)**

```bash
cd todo-backend
npm run dev
```

Backend sẽ chạy tại `http://localhost:5000`.

**2. Chạy frontend**

```bash
cd todo-frontend
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.
