# 📝 Full‑Stack TODO Application

A modern **full‑stack TODO application** built to practice and demonstrate real‑world web development concepts such as authentication, protected routes, CRUD operations, state management, and RESTful APIs.

This project is designed as a **portfolio‑ready application** and follows clean architecture and scalable practices used in production‑grade apps.

---

## 🚀 Features

### 👤 Authentication & Authorization

* User **Signup & Login** using JWT authentication
* Password hashing for security
* Protected routes (only logged‑in users can access their tasks)
* Persistent login using tokens

### ✅ TODO Management

* Create, read, update, and delete TODOs
* Mark tasks as completed or pending
* Each user can access **only their own tasks**
* Task timestamps (created & updated)

### 🧠 State Management

* Global state handled using **Redux / Zustand** (depending on implementation)
* Centralized auth and task state
* Optimistic UI updates

### 🎨 UI / UX

* Responsive design (mobile‑first)
* Dark‑themed modern UI
* Clean dashboard layout
* Toast notifications for actions (success/error)
* Smooth animations with Framer Motion

### 🛡️ Security

* JWT‑based authentication
* Secure API routes
* Environment variables for sensitive data
* Proper error handling

---

## 🏗️ Tech Stack

### Frontend

* **React (Vite)**
* **React Router DOM** – routing & protected routes
* **Redux Toolkit / Zustand** – state management
* **Tailwind CSS** – styling
* **Framer Motion** – animations
* **React Hot Toast** – notifications

### Backend

* **Node.js**
* **Express.js**
* **MongoDB** with **Mongoose**
* **JWT** – authentication
* **bcrypt.js** – password hashing

### Tools & Utilities

* Thunder Client / Postman (API testing)
* MongoDB Compass
* Ngrok (for testing webhooks / remote APIs)

---

## 📂 Project Structure

```bash
fullstack-todo/
│
├── client/                  # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── app/             # Redux store
│   │   ├── services/        # API calls
│   │   └── main.jsx
│   └── package.json
│
├── server/                  # Backend (Node + Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the **server** folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/fullstack-todo.git
cd fullstack-todo
```

### 2️⃣ Backend Setup

```bash
cd server
npm install
npm run dev
```

Server will start on **[http://localhost:5000](http://localhost:5000)**

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend will start on **[http://localhost:5173](http://localhost:5173)**

---

## 🔐 API Endpoints

### Auth Routes

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | /api/auth/register | Register new user |
| POST   | /api/auth/login    | Login user        |

### TODO Routes (Protected)

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| GET    | /api/todos     | Get user todos  |
| POST   | /api/todos     | Create new todo |
| PUT    | /api/todos/:id | Update todo     |
| DELETE | /api/todos/:id | Delete todo     |

---

## 📸 Screenshots

> *Add screenshots of Login, Dashboard, and Task Management UI here*

---

## 🎯 Learning Outcomes

This project helped me gain hands‑on experience with:

* Full‑stack application architecture
* Authentication & authorization flows
* Secure REST API development
* State management in React
* MongoDB schema design
* Real‑world project structuring

---

## 🧩 Future Enhancements

* Task categories & filters
* Due dates & reminders
* Search functionality
* Role‑based access (Admin/User)
* Drag & drop task reordering
* Deployment with Docker

---

## 🌍 Deployment

Frontend and backend can be deployed separately using:

* **Frontend:** Vercel / Netlify
* **Backend:** Render / Railway / AWS
* **Database:** MongoDB Atlas

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch
3. Commit changes
4. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Sagar Singha**
Frontend / Full‑Stack Developer

* GitHub: [https://github.com/your-username](https://github.com/your-username)
* LinkedIn: [https://linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)

---

⭐ If you like this project, don’t forget to **star** the repository!
