# 🛍️ Vibe Commerce

Vibe Commerce is a full-stack **e-commerce web application** built using **React + TypeScript** for the frontend and **Node.js + Express + MongoDB** for the backend.  
It features user authentication, product management, cart functionality, and checkout with real MongoDB integration.

---

## 🚀 Features
- 🔐 User Signup/Login using JWT
- 🛒 Add, View, and Delete products from the cart
- 💳 Checkout and transaction creation
- 📦 MongoDB for persistent data storage
- ⚙️ Type-safe implementation with TypeScript
- 🌐 REST API architecture
- 🍃 Environment variables for configuration
- 🧠 Modular folder structure for scalability

---

## 🧩 Tech Stack
### Frontend
- React
- TypeScript
- React Router
- Axios
- TailwindCSS (optional for styling)

### Backend
- Node.js
- Express.js
- MongoDB (native driver)
- JWT for authentication
- dotenv for environment configuration

---

## 📁 Folder Structure
```
Vibe_Commerce/
├── backend/
│   ├── authRouter.ts
│   ├── database/
│   │   ├── mongo.ts
│   │   └── models.ts
│   ├── middleware/
│   │   └── middleware.ts
│   ├── server.ts
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.tsx
    │   │   ├── Login.tsx
    │   │   ├── Signup.tsx
    │   │   └── Cart.tsx
    │   ├── components/
    │   ├── api/
    │   └── App.tsx
    └── package.json
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/AyushhS12/Vibe_Commerce.git
cd Vibe_Commerce
```

---

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file:
```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

Start the backend:
```bash
npm start
```

---

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env` file:
```env
VITE_API_URL=http://localhost:3000
```

Run the frontend:
```bash
npm run dev
```

---

## 🧠 Application Workflow

1. **Authentication:**
   - Users can sign up or log in.
   - JWT is issued on successful login and stored in a cookie.

2. **Products:**
   - `/api/products` returns product data from MongoDB.

3. **Cart:**
   - Authenticated users can add or remove products.
   - `/api/cart` and `/api/cart/:id` manage the user's cart.

4. **Checkout:**
   - `/api/checkout` processes transactions and clears the cart.

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/auth/signup` | Create new user |
| POST | `/api/auth/login` | Login existing user |
| GET | `/api/products` | Fetch product list |
| GET | `/api/cart` | Fetch cart (requires auth) |
| DELETE | `/api/cart/:id` | Remove item from cart |
| POST | `/api/checkout` | Checkout cart |

---

## 🧑‍💻 Author
**Ayush Pal Singh (AyushhS12)**  
GitHub: [@AyushhS12](https://github.com/AyushhS12)

---

## 🪪 License
This project is licensed under the **MIT License**.  
Feel free to use, modify, and share!

---
✨ *Made with love and TypeScript by Ayush Pal Singh* ✨
