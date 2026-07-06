# GHI CHÚ CÁC CHỨC NĂNG HIỆN CÓ (tiếng Việt)

Dựa trên code hiện tại trong thư mục Backend.

---

## 1) Trang (Pages) - `routes/pageRouters.js`
- **GET /**
  - Trả về: `pages/login.html`

- **GET /login**
  - Trả về: `pages/login.html`

- **GET /register**
  - Trả về: `pages/register.html`

- **GET /dashboard**
  - Trả về: `pages/dashboard.html`

---

## 2) Auth (Xác thực) - `routes/authRoutes.js`, `controllers/authController.js`

### 2.1. Đăng ký
- **POST /api/auth/register**
  - Payload: `username, email, password`
  - Kiểm tra: email đã tồn tại hay chưa (`User.findOne({ email })`)
  - Hash mật khẩu: `bcrypt.hash(password, 10)`
  - Tạo user: `User.create({ username, email, password: hashedPassword })`
  - Trả về: `{ message: "Đăng ký thành công" }`

### 2.2. Đăng nhập
- **POST /api/auth/login**
  - Payload: `email, password`
  - Kiểm tra: user theo email
  - So khớp mật khẩu: `bcrypt.compare(password, user.password)`
  - Tạo JWT:
    - `jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" })`
  - Trả về: `{ token, role, username }`

---

## 3) Middleware quyền truy cập

### 3.1. Xác thực token - `middleware/authMiddleware.js`
- Đọc header: `Authorization: Bearer <token>`
- Nếu **không có token**: trả `401 { message: "Chưa đăng nhập" }`
- Nếu **token không hợp lệ**: trả `401 { message: "Token không hợp lệ" }`
- Nếu OK: gán `req.user = decoded` rồi `next()`

### 3.2. Phân quyền admin - `middleware/isAdmin.js`
- Nếu `req.user.role !== "admin"`:
  - trả `403 { message: "Chỉ admin được phép" }`
- Nếu OK: `next()`

---

## 4) API User - `routes/userRoutes.js`
- **GET /api/users/me**
  - Middleware: `auth`
  - Trả về:
    - `user.id`, `user.email`, `user.role`

---

## 5) Orders (Đơn hàng)

### 5.1. Model - `models/Order.js`
- `user`: ObjectId ref `User`
- `totalPrice`: Number (required)
- `status`: enum `['pending','confirmed','shipping','done','cancel']`, default `pending`
- `note`: String

### 5.2. Routes/API - `routes/orderRoutes.js`, `controllers/orderController.js`

#### User (cần đăng nhập)
- **POST /api/orders**
  - Auth: `auth`
  - Tạo order với:
    - `user: req.user.id`
    - `totalPrice: req.body.totalPrice`
    - `status: "pending"`
  - Trả về: order vừa tạo

- **GET /api/orders/my-orders**
  - Auth: `auth`
  - Lấy order của user hiện tại: `Order.find({ user: req.user.id })`
  - Trả về: danh sách order

#### Admin
- **GET /api/orders**
  - Auth + Admin: `auth` + `isAdmin`
  - Lấy toàn bộ order: `Order.find().populate('user','username email')`
  - Trả về: danh sách order (có populate thông tin user)

- **PUT /api/orders/:id**
  - Auth + Admin
  - Update status:
    - tìm `Order.findById(req.params.id)`
    - nếu không có: `404 { message: "Order not found" }`
    - set `order.status = req.body.status` rồi `save()`
  - Trả về: order đã cập nhật

- **DELETE /api/orders/:id**
  - Auth + Admin
  - Xóa order:
    - `Order.findByIdAndDelete(req.params.id)`
    - nếu không có: `404 { message: "Order not found" }`
  - Trả về: `{ message: "Order deleted" }`

---

## 6) Tasks (Công việc/đầu việc)

### 6.1. Model - `models/Task.js`
- `title`: String (required)
- `user`: ObjectId ref `User` (required)

### 6.2. Routes/API - `routes/taskRoutes.js`, `controllers/taskController.js`

- **GET /api/tasks**
  - Auth: `auth`
  - Lấy task của user đang login: `Task.find({ user: req.user.id })`
  - Trả về: danh sách task

- **POST /api/tasks**
  - Auth: `auth`
  - Tạo task:
    - `title: req.body.title`
    - `user: req.user.id`
  - Trả về: task vừa tạo

- **PUT /api/tasks/:id**
  - Auth
  - Update task của đúng user:
    - `findOneAndUpdate({ _id: req.params.id, user: req.user.id }, { title }, { new: true })`
  - Trả về: task đã cập nhật

- **DELETE /api/tasks/:id**
  - Auth
  - Xóa task của đúng user:
    - `findOneAndDelete({ _id: req.params.id, user: req.user.id })`
  - Trả về: `{ message: "Deleted" }`

---

## 7) Ghi chú kỹ thuật (liên quan hành vi hiện tại)
- `controllers/orderController.js` có field `note` trong model `Order`, nhưng hiện tại **controller tạo order không set `note` từ `req.body`**.
- `controllers/authController.js` khi sign JWT có payload `{ id, role }`. Middleware `authMiddleware.js` gán `req.user = decoded`.
  - Với `userRoutes.js` đang trả thêm `email` từ `req.user.email`, trong khi payload JWT hiện tại **chỉ có id và role** (có thể dẫn tới `email` không có trong response).

