# <div align="center">🚀 **NexaAuth**

### **Modern Authentication System built with Next.js 15 + MongoDB + JWT + Email Verification**

</div>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/JWT-Secure-orange?style=for-the-badge&logo=jsonwebtokens" />
  <img src="https://img.shields.io/badge/Nodemailer-Email-yellow?style=for-the-badge&logo=maildotru" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" />
</p>

---

# 📌 **Overview**

**NexaAuth** is a complete authentication system featuring:

* 🔐 Registration + Login
* 📧 Email verification
* 🔑 Password reset via email
* 🛡 JWT-based authentication
* 🍪 HttpOnly secure cookies
* 🧭 Protected routes
* 👤 User profile system

Built using **Next.js App Router**, fully compatible with **Next.js 15**, **Turbopack**, and **Edge Middleware limitations**.

---

# ⭐ **Features**

### 🔐 Authentication

* Register new users
* Login using secure JWT
* Logout (cookie destruction)

### 📧 Email System

* Gmail App Password integration
* Email verification flow
* Forgot + reset password flow

### 🧱 Protected Routes

* Middleware guards `/profile`
* JWT verified on server-side
* HttpOnly cookies (XSS protected)

### 🛡 Security

* Password hashing using bcrypt
* Server-only JWT verification
* Crypto-safe token generation
* Token expiry logic

---

# 🗂 **Directory Structure**

```
src/
│
├── app/
│   ├── api/
│   │   └── users/
│   │       ├── register/route.js
│   │       ├── login/route.js
│   │       ├── logout/route.js
│   │       ├── verifyemail/route.js
│   │       ├── forgotpassword/route.js
│   │       ├── resetpassword/route.js
│   │       └── me/route.js
│   │
│   ├── register/page.jsx
│   ├── profile/page.jsx
│   ├── verifyemail/page.jsx
│   ├── forgotpassword/page.jsx
│   ├── resetpassword/page.jsx
│   ├── page.jsx          # Login
│   ├── layout.js
│   └── globals.css
│
├── lib/
│   ├── auth-server.js    # JWT logic
│   ├── token.js          # Random token generator
│   └── db.js             # MongoDB connection
│
├── models/
│   └── User.js
│
├── utils/
│   └── sendEmail.js
│
├── proxy.js
└── .env
```

---

# 🖼 **Screenshots**

> *(Replace these placeholders with your own screenshots later)*

| Page               | Screenshot                            |
| ------------------ | ------------------------------------- |
| Login Page         | ![login](<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/a188c801-69e2-4355-881d-26b5b20d504a" />)  |      |
| Register Page      | ![register](<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/b147c2b3-087f-48e0-a17b-ffa7db7368c8" />) |
| Profile Page       | ![profile](<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/c5e7bc04-658d-4634-b1de-4438b19fe12b" />)   |
| Forgot Password    | ![forgot](<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/9b8580b3-3b30-4143-8592-180f7072d8d2" />)     |

---

# 🧰 **Tech Stack**

### Frontend

* ⚡ Next.js 15 (App Router)
* 🎨 TailwindCSS
* 🔥 react-hot-toast
* 🌐 Axios

### Backend

* 🟢 MongoDB Atlas
* 🧬 Mongoose
* 🔐 JSON Web Tokens
* 🔑 BcryptJS
* 📧 Nodemailer (Gmail App Password)

---

# ⚙️ **Environment Variables (.env)**

```
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_gmail
EMAIL_PASS=your_app_password
JWT_SECRET=your_secret_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> ⚠ **Make sure Gmail has 2FA enabled** → generate App Password via Google Security.

---

# 🧪 **API Documentation**

### 📌 **Register**

`POST /api/users/register`

Body:

```json
{
  "name": "John",
  "email": "test@gmail.com",
  "password": "123456"
}
```

---

### 📌 **Login**

`POST /api/users/login`

Body:

```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

Response sets **HttpOnly cookie**:

```
token=eyJhbGciOi....
```

---

### 📌 **Verify Email**

`POST /api/users/verifyemail`

Body:

```json
{ "token": "random-token" }
```

---

### 📌 **Forgot Password**

`POST /api/users/forgotpassword`

Body:

```json
{ "email": "test@gmail.com" }
```

---

### 📌 **Reset Password**

`POST /api/users/resetpassword`

Body:

```json
{
  "token": "reset-token",
  "password": "newpassword"
}
```

---

### 📌 **Get Logged In User**

`GET /api/users/me`

Requires cookie:

```
token=<jwt>
```

---

# 🚀 **Deployment Guide (Vercel)**

### 1️⃣ Push project to GitHub

### 2️⃣ Go to Vercel → “New Project”

### 3️⃣ Import your repository

### 4️⃣ Add environment variables

In Vercel Dashboard → Project → Settings → Environment Variables

Add:

```
MONGO_URI=
EMAIL_USER=
EMAIL_PASS=
JWT_SECRET=
NEXT_PUBLIC_BASE_URL=https://your-vercel-url.vercel.app
```

### 5️⃣ Deploy 🎉

### 6️⃣ Update verification email link

Ensure this is correct in your register route:

```js
const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verifyemail?token=${verifyToken}`;
```

---

# 🎯 **Future Enhancements**

* Google OAuth
* Refresh token flow
* Admin dashboard
* Themes + UI improvements
* Rate limiting for security
* Session management

---

# 💬 **Author**

**Prathamesh Wadekar**
🔥 *Building secure full-stack web apps with modern tools.*

---

# ⭐ Like this project?

If yes, add a **star ⭐ on GitHub** to support the project!

