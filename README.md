# 🌐 DevSphere

**DevSphere** is an **ongoing full-stack social media platform for developers**, designed to foster collaboration, sharing, and professional networking in the tech community — inspired by platforms like Dev.to and Hashnode.

---

## 🚧 Project Status

> 🛠 **Ongoing Development**  
This project is currently under active development. Features and UI are being built incrementally. Contributions, feedback, and suggestions are welcome!

---

## 🚀 Features (Planned + In Progress)

- ✅ **User Authentication**
  - JWT-based login & registration
  - Role-based access control (user/admin)
  - Secure cookie sessions

- ✅ **Post Management**
  - Create, update, and delete posts
  - Upload images via Cloudinary
  - Like and comment posts

- ✅ **User Profiles**
  - Profile with username, bio, skills
  - Follow/unfollow other developers

- 🧪 **Private Messaging** *(Planned)*
- 🛡 **Admin Panel** *(Planned)*
- 📊 **Analytics & Notifications** *(Planned)*

---

## 🛠 Tech Stack

### Frontend
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [Zod](https://github.com/colinhacks/zod) for validation
- [Cloudinary](https://cloudinary.com/) for media uploads
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) for auth

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Ayanokoji1248/DevSphere.git
cd DevSphere
````

---

### 2. Backend Setup

```bash
cd server
npm install
npm run dev
```

**Environment Variables (`.env`):**

```env
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
SUPABASE_KEY=your_suypabse_key
SUPABASE_URL=your_supabase_url
```

---

### 3. Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

**Update API URL**
In `client/utils/index.ts`:

```ts
export const BACKEND_URL = "http://localhost:5000";
```

---

## 📁 Folder Structure

```
DevSphere/
├── client/        # React frontend (Vite)
│   ├── components/
│   ├── pages/
│   └── utils/
├── server/        # Node.js backend (Express)
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── utils/
```

---

## 📸 Screenshots

*(Coming soon...)*
UI is being built — screenshots will be added as the UI components stabilize.

---

## 🧪 Upcoming Features

* Real-time chat with WebSockets
* Notifications (likes, comments, follows)
* User settings (avatar, preferences)
* Explore page with filters
* Dark/light theme switcher
* Admin moderation panel
* Tests (Jest, Supertest)

---

## 🧑‍💻 Author

**Axel Blaze (aka Ayanokoji1248)**
🔗 [GitHub Profile](https://github.com/Ayanokoji1248)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 💡 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

## ⭐ Show Your Support

If you find this project helpful, consider giving it a ⭐ on GitHub!


