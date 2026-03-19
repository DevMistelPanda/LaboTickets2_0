# LaboTickets 2.0

## 🚀 Project Overview
`LaboTickets 2.0` is a web-based ticketing and reporting system built for a school event (Schulball). It provides:

- **User authentication & role-based access** (admin / staff)
- **Ticket sales & scanning**
- **Live statistics & charts**
- **Exportable visitor lists (Excel)**
- **News management (hot news / pub news / general news)**

The project is split into two parts:
- `BE/`: Node.js + Express backend (API + MySQL) that also serves the frontend in production
- `FE/`: React + Vite frontend (TypeScript + TailwindCSS + shadcn/ui)

---

## 🧰 Tech Stack

### Backend (BE)
- Node.js + Express
- MySQL (via `mysql2`)
- JWT authentication
- Excel export (`exceljs`)
- Chart image generation (`chartjs-node-canvas`)

### Frontend (FE)
- React + TypeScript
- Vite + SWC
- Tailwind CSS
- shadcn/ui components
- React Router
- React Query

---

## 🛠️ Getting Started (Development)

### 1) Clone repository

```bash
git clone https://github.com/<your-org>/LaboTickets2_0.git
cd LaboTickets2_0
```

### 2) Backend setup (BE)

```bash
cd BE
npm install
```

Create a `.env` file in `BE/` with these values (example):

```env
PORT=4000
JWT_SECRET=your_secret_here
DISCORD_BOT_TOKEN=your_bot_token_if_used

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_db_password
DB_NAME=labo_tickets
```

> ⚠️ Keep `JWT_SECRET` and any tokens safe. Do not commit `.env` to source control.

### 3) Frontend setup (FE)

```bash
cd ../FE
npm install
npm run dev
```

Open your browser at: http://localhost:3000

> The frontend expects the backend API to be available under `/api/*` (same origin). When running in dev, you can run both the backend and frontend simultaneously.

---

## 🧩 Production Build / Deployment

### 1) Build frontend

```bash
cd FE
npm run build
```

This generates a `dist/` folder inside `FE/`.

### 2) Copy `dist/` into backend

Copy (or symlink) `FE/dist/` into `BE/dist/` so the backend can serve the frontend:

```bash
cp -r ../FE/dist ./BE/dist
```

### 3) Start the backend server (production)

```bash
cd BE
npm start
```

The backend will serve the frontend and API from the same origin.

---

## 🗂️ Project Structure

```
/BE          # Backend (Express + MySQL)
/FE          # Frontend (Vite + React + Tailwind)
/build       # Duplicate backend copy (production packaging)
```

### Important Backend Files
- `BE/server.js` — Express API + static file serving
- `BE/.env` (not committed) — environment config

### Important Frontend Files
- `FE/src/main.tsx` — app entrypoint
- `FE/src/pages` — major page views (Login, Admin, Staff, Scanner, etc.)

---

## 🗄️ Database Notes

The backend expects a MySQL database with at least these tables:

- `accounts` (user authentication + roles)
- `besucher` (visitor tickets / scanning / stats)
- `news` (hot news / pub news / general news)

> Tip: The easiest way to start is to create the database and populate a few rows manually, or reuse an existing export.

---

## ✅ Common Commands

| Location | Command | What it does |
|---|---|---|
| `BE/` | `npm install` | Install backend dependencies |
| `BE/` | `npm start` | Run backend server |
| `FE/` | `npm install` | Install frontend dependencies |
| `FE/` | `npm run dev` | Run frontend dev server |
| `FE/` | `npm run build` | Build frontend for production |

---

## 🤝 Contributing

Feel free to open issues or PRs for bugs, improvements, or feature ideas.

---

## 📄 License

This project uses the [ISC License](https://opensource.org/licenses/ISC).

