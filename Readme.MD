<div align="center">

  <h1>🎓 EduNexus - LMS Platform</h1>
  <i>Empowering Learning, Connecting Students & Educators</i>
  
  <br><br>
  
  ![last commit](https://img.shields.io/badge/last%20commit-today-blue)
  ![javascript](https://img.shields.io/badge/javascript-99.7%25-yellow)
  ![languages](https://img.shields.io/badge/languages-3-red)
  
  <br>
  
  <i>Built with the tools and technologies:</i>
  
  <br><br>
  
  ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
  ![JSON](https://img.shields.io/badge/JSON-000000?style=flat&logo=json&logoColor=white)
  ![Markdown](https://img.shields.io/badge/Markdown-000000?style=flat&logo=markdown&logoColor=white)
  ![npm](https://img.shields.io/badge/npm-CB3837?style=flat&logo=npm&logoColor=white)
  ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongoose&logoColor=white)
  ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)
  ![.ENV](https://img.shields.io/badge/.ENV-ECD53F?style=flat&logo=.env&logoColor=black)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
  
  ![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=flat&logo=nodemon&logoColor=white)
  ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
  ![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=flat&logo=razorpay&logoColor=white)
  ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
  ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white)
  ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)
  ![React Redux](https://img.shields.io/badge/React%20Redux-764ABC?style=flat&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=flat&logo=react-router&logoColor=white)
![React Spinners](https://img.shields.io/badge/React%20Spinners-61DAFB?style=flat&logo=react&logoColor=black)
![React Toastify](https://img.shields.io/badge/React%20Toastify-FF6C37?style=flat&logo=react&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini-AI-8E75B2?style=flat&logo=google&logoColor=white)
![Brevo](https://img.shields.io/badge/Brevo-0B996E?style=flat&logo=mail&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
  
</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

---

## 🌟 Overview

**EduNexus** is a modern full-stack Ai Learning Management System (LMS) designed to provide a seamless online learning experience. Users can browse courses, enroll in programs, access learning materials, track progress, and complete secure payments..

### 🚀 Key Highlights

- MERN stack based full-stack architecture
- Secure course purchase system
- Interactive learning dashboard
- Modern and responsive UI built with React

---

## ✨ Features

### 👤 Student Features

- 🔐 User Authentication (Signup / Login using Firebase)
- 📚 Browse and explore courses
- 🔎 Search and filter courses
- 🛒 Enroll in courses
- 💳 Secure online payment integration (Razorpay)
- 📁 Access course materials (videos, PDFs, etc.)
- 🧾 Course history & enrolled courses view

---

### 👨‍🏫 Instructor Features

- ➕ Create and upload new courses
- ✏️ Edit / update course content
- ❌ Delete courses
- 📋 Manage enrolled students
- 📁 Upload course resources (Cloudinary)

---

### 🛡️ Security & Performance

- 🔑 JWT-based authentication
- 🌐 Protected API routes
- ⚙️ Optimized REST APIs
- 📁 Secure environment variable configuration (.env)

---

## 🛠️ Tech Stack

### 🎨 Frontend

- ⚛️ React.js (User Interface)
- ⚡ Vite (Build Tool)
- 📡 Axios (API Requests)
- 🎨 CSS / Tailwind (Styling)

---

### 🖥️ Backend

- 🟢 Node.js (Runtime Environment)
- 🚀 Express.js (Backend Framework)
- 🔌 Socket.io (Real-time Communication)
- 🔐 JWT (Authentication & Authorization)

---

### 🗄️ Database

- 🍃 MongoDB (NoSQL Database)
- 🧩 Mongoose (ODM)

---

### 🔥 Third-Party Services

- 🔐 Firebase (Authentication)
- ☁️ Cloudinary (Image Upload & Storage)
- 💳 Razorpay (Payment Gateway)

---

### 🛠️ Development Tools

- 📦 npm (Package Manager)
- 🔄 Nodemon (Auto Server Restart)
- 🧹 ESLint (Code Linting)
- 📁 dotenv (.env Configuration)
- 🧪 Postman (API Testing)

---

## 🚀 Installation

Follow these steps to run the project locally on your system

1. Clone the repository

```bash
git clone https://github.com/rohitnishad06/Edunexus-LMS-website-.git
cd Edunexus-LMS-website-
```

### Backend Setup

2. Install Backend dependencies

```bash
cd backend
npm install
```

### Create Backend .env File

3. Create a .env file inside the backend folder and add:

```bash

PORT=8000
MONGODB_URL=MONGO_URL
JWT_SECRET=JWT_SECRET

EMAIL=Your_Email
BREVO_API_KEY=Your_Brevo_api

NODE_ENV="development"

CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

RAZORPAY_KEY_ID=your_Razorpay_Id
RAZORPAY_KEY_SECRET=your_Razorpay_Secret

GEMINI_API_KEY=gemini_api_key

```

4. Run the development server

```bash
npm run dev
```

### Frontend Setup

2. Install Frontend dependencies

```bash
cd frontend
npm install
```

### Create Frontend .env File

3. Create a .env file inside the Frontend folder and add:

```bash

VITE_FIREBASE_API=your_firebase_api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id

```

4. Run the development server

```bash
npm run dev
```

---

## 💻 Usage

Once the application is running locally, follow these steps:

---

### 👤 For Users

1. Register or Login using Firebase authentication
2. Browse available courses
3. Enroll in your desired course
4. Complete payment (via Razorpay)
5. Access course content
6. View enrolled courses anytime

---

### 👨‍🏫 For Instructors

1. Login with delivery credentials.
2. View assigned delivery orders.
3. Access customer location via live map.
4. Update delivery status:
   - Picked Up
   - Delivered
5. Share live location updates.

---

### 🔄 System Workflow

- Student enrolls in a course
- Instructor gets notified
- Payment is processed securely
- Student gets instant access to content

---

## 🤝 Contributors

<a href="https://github.com/rohitnishad06/Edunexus-LMS-website-/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=rohitnishad06/Edunexus-LMS-website-" />
</a>

---

### 📌 How to Contribute

1. Fork the repository.
2. Clone your forked repository:

```bash
git clone https://github.com/rohitnishad06/Edunexus-LMS-website-.git
```

### Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

### Make your changes and commit:

```bash
git commit -m "Add: your feature description"
```

### Push to your branch:

```bash
git push origin feature/your-feature-name
```

Open a Pull Request.

---

<div align="center">
  <h3>❤️ Made with Passion by Rohit & Team EduNexus 🚀</h3>
</div>
