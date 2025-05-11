# Backend Template – Node.js, Express, PostgreSQL (Drizzle ORM, Clerk Auth)

This is a modular backend template built using **Node.js**, **Express.js**, **PostgreSQL**, **Drizzle ORM**, and **Clerk** for authentication. It is structured to enable easy scaling, testing, and development of production-grade backend APIs.

---

## 🚀 Features

* ⚙️ Modular route and controller architecture
* 🛡️ Clerk authentication middleware integration
* 🗄️ PostgreSQL + Drizzle ORM for type-safe and modern database handling
* 🌱 Environment-based configuration
* 📁 Clear folder structure for maintainability

---

## 📁 Folder Structure

```
backend/
├── controllers/           # Business logic for API endpoints
│   └── example.js
├── db/                    # Database schema and migrations
│   ├── index.js           # DB client and initialization
│   ├── schema.js          # Drizzle ORM schema definitions
│   └── migrate/           # Drizzle-generated migrations
├── middlewares/          # Custom middlewares (e.g., auth)
│   └── auth.middleware.js
├── routes/               # API route definitions
│   ├── public/
│   │   └── example1.js    # Public (unauthenticated) routes
│   ├── protected/
│   │   └── example2.js    # Protected (authenticated) routes
│   └── mainRouter.js      # Aggregates all route files
├── .env                  # Environment variables (should not be committed)
├── .gitignore            # Git ignored files and folders
├── index.js              # Entry point for the Express server
├── package.json
└── README.md
```

---

## 🧪 Environment Setup

Setup the `.env` file in the root directory with your credentials from Neon, and Clerk 


---

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/Devanand-Binil/Template_Node.js.git backend
cd Template_Node.js
```

2. Install dependencies:

```bash
npm install
```

3. Set up the database:

Make sure your database is ready and `DATABASE_URL` in `.env` is correct.

4. Run the server:

```bash
nodemon index.js
```

---

## 🧩 Clerk Integration

This backend uses Clerk for authentication. You must:

* Set `CLERK_SECRET_KEY` and `CLERK_PUBLISHABLE_KEY` in your `.env`
* Use Clerk’s frontend SDK (like `@clerk/nextjs`) for login/signup
* Send Clerk tokens in the `Authorization` header when calling protected API routes

Example header for authenticated request:

```http
Authorization: Bearer <clerk_token>
```

---

## 🔐 Routes Overview

### Public Route (No Auth)

```http
GET /example/data
```

### Protected Route (Requires Clerk Auth)

```http
GET /protected/secret
Authorization: Bearer <token>
```

---

## 📜 Scripts

| Script            | Description                  |
| ----------------- | ---------------------------- |
| `nodemon index.js`| Start the server             |
| `drizzle:push`    | Push schema to database      |

---

## 🤝 Contributing

1. Fork this repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Create a new Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

Feel free to open an issue or contribute to improving this template!

---

Made with ❤️ by Devanand Binil
