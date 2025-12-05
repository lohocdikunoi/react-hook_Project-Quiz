# 🎓 Quiz App Management System - ReactJS Capstone Project

Dự án website thi trắc nghiệm trực tuyến được xây dựng dựa trên thư viện ReactJS. Hệ thống cung cấp giải pháp toàn diện cho việc quản lý đề thi, người dùng và thực hiện các bài kiểm tra online.

## 🚀 Tính năng chính (Features)

### 👤 Dành cho Người dùng (User)

- **Authentication:** Đăng ký, Đăng nhập, Đăng xuất, Refresh Token.
- **Làm bài thi:** Giao diện thi trắc nghiệm trực quan, đồng hồ đếm ngược.
- **Kết quả:** Xem kết quả ngay sau khi nộp bài, xem lại đáp án đúng/sai.
- **Lịch sử:** Xem lại lịch sử các bài thi đã làm.
- **Profile:** Cập nhật thông tin cá nhân, đổi mật khẩu.
- **Tiện ích:** Hỗ trợ đa ngôn ngữ (Tiếng Việt / Tiếng Anh), Dark/Light mode (cấu trúc sẵn).

### 🛡️ Dành cho Quản trị viên (Admin)

- **Dashboard:** Thống kê tổng quan số lượng người dùng, bài thi, câu hỏi qua biểu đồ (Recharts).
- **Quản lý User:** CRUD (Thêm, Xem, Sửa, Xóa) người dùng, Phân trang, Tìm kiếm.
- **Quản lý Quiz:** Tạo đề thi mới, cập nhật thông tin đề thi.
- **Quản lý Câu hỏi (QA):** Soạn thảo câu hỏi, upload ảnh minh họa, gán đáp án đúng.
- **Phân quyền:** Chỉ định người dùng làm bài thi cụ thể.

## 🛠️ Công nghệ sử dụng (Tech Stack)

- **Core:** [React 18](https://reactjs.org/) (Hooks)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) & Redux Thunk (Xử lý bất đồng bộ).
- **Data Persistence:** Redux Persist (Lưu trữ state đăng nhập).
- **Routing:** React Router v6 (Nested Routes, Protected Routes).
- **HTTP Client:** Axios (Custom Instance & Interceptors).
- **UI Framework:** [Bootstrap 5](https://getbootstrap.com/) & React-Bootstrap.
- **Styling:** SCSS (Sass).
- **Internationalization:** i18next (Đa ngôn ngữ).
- **Charts:** Recharts.
- **Utilities:** Lodash, Nprogress, React-Toastify, React-Perfect-Scrollbar.

## 📂 Cấu trúc thư mục (Folder Structure)

```bash
src/
├── assets/          # Hình ảnh, video, media
├── components/      # Các React Components
│   ├── admin/       # Giao diện trang quản trị
│   ├── Auth/        # Login, Register
│   ├── header/      # Thanh điều hướng
│   ├── home/        # Trang chủ
│   └── users/       # Giao diện thi của người dùng
├── redux/           # Redux Store, Actions, Reducers
├── service/         # Cấu hình API endpoints
├── utils/           # Các hàm tiện ích (Axios instance, i18n config)
├── PrivateRoute/    # Higher-Order Components xử lý phân quyền
└── Layout.js        # Bố cục chính của ứng dụng
```

🔧 Cài đặt và Chạy dự án (Installation)
Yêu cầu: Node.js (v14 trở lên)

1. Clone dự án:
   git clone [https://github.com/lohocdikunoi/react-hook_project-quiz.git](https://github.com/lohocdikunoi/react-hook_project-quiz.git)
   cd react-hook_project-quiz
2. Cài đặt các gói phụ thuộc:
   npm install

# hoặc

yarn install 3. Khởi chạy ứng dụng:
npm start
Ứng dụng sẽ chạy tại: http://localhost:3000
👨‍💻 Tác giả
Trịnh Kim Viên (Developer)

Dự án phục vụ báo cáo đồ án chuyên ngành.
