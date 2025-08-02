# 🍽️ ChopChop: Restaurant Food Ordering Application

**ChopChop** is a full-stack food ordering platform designed for seamless restaurant operations and fast delivery. Built with **Next.js 14**, **Tailwind CSS**, **Express.js**, and integrated with **Shipday** for efficient delivery management, ChopChop enables customers to browse menus, place orders, pay securely, and track deliveries in real-time. Restaurants manage menus and orders, while admins oversee operations.

---

## 📚 Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Architecture](#architecture)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Configuration](#configuration)
* [Running the Application](#running-the-application)
* [Usage](#usage)

  * [Customer Flow](#customer-flow)
  * [Restaurant Flow](#restaurant-flow)
  * [Admin Flow](#admin-flow)
* [Shipday Integration](#shipday-integration)
* [API Endpoints](#api-endpoints)
* [Deployment](#deployment)
* [Contributing](#contributing)
* [License](#license)

---

## ✨ Features

### Customer Features:

* Browse restaurants and menus with responsive UI.
* Add items to cart, calculate totals, and pay via **Stripe**.
* Real-time order tracking with **Shipday** integration.
* User authentication (email, Google) via **NextAuth.js**.

### Restaurant Features:

* Manage menus (add/edit items) via a dashboard.
* View and update order statuses (e.g., preparing, shipped).

### Admin Features:

* Oversee all restaurants, orders, and users.
* Monitor delivery performance via **Shipday** analytics.

### Delivery:

* Fast delivery via Shipday’s AI-powered dispatch and tracking.
* Supports in-house and third-party drivers (US, Canada, Australia).

### UI & Performance:

* Responsive Design: Mobile-friendly interface using Tailwind CSS.
* Scalability: PostgreSQL for robust data management.

---

## 🛠 Tech Stack

| Layer       | Technology                          |
| ----------- | ----------------------------------- |
| Frontend    | Next.js 14, Tailwind CSS, shadcn/ui |
| Backend     | Express.js (Node.js), REST API      |
| Database    | PostgreSQL via Prisma ORM           |
| Auth        | NextAuth.js (Email, Google)         |
| Payment     | Stripe                              |
| Delivery    | Shipday API                         |
| State Mgmt  | Zustand                             |
| HTTP Client | Axios                               |
| Deployment  | Vercel (Frontend), Render (Backend) |

---

## 🧱 Architecture

**Client-Server Architecture** with modular design.

### Frontend (Next.js):

* App Router with SSR for SEO and performance.
* Components: `Home`, `Restaurant`, `Cart`, `OrderTracking`, `RestaurantDashboard`, `AdminDashboard`.
* Styling: Tailwind CSS and shadcn/ui.

### Backend (Express.js):

* RESTful API for managing restaurants, menus, orders, and users.
* Shipday API calls for delivery management.

### Database (PostgreSQL):

* Schema includes: `Users`, `Restaurants`, `Menus`, `Orders`, `Drivers`.

### External Services:

* Stripe for payments.
* NextAuth.js for authentication.
* Shipday for delivery dispatch & tracking.

---

## 📦 Prerequisites

* Node.js: v18+
* PostgreSQL: v14+
* Shipday Account: [shipday.com](https://www.shipday.com)
* Stripe Account: [stripe.com](https://stripe.com)
* Vercel & Render Accounts for deployment

---

## 📥 Installation

### 1. Clone the Repository:

```bash
git clone https://github.com/bayisagit/insa-ctc2017group5.git
cd chopchop
```

### 2. Install Frontend:

```bash
cd frontend
npm install
```

### 3. Install Backend:

```bash
cd backend
npm install
```

### 4. Setup Database:

* Install PostgreSQL.
* Create a database named `chopchop`.
* Update `backend/prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

* Run migrations:

```bash
npx prisma migrate dev --name init
```

---

## ⚙️ Configuration

### Frontend (`frontend/.env.local`):

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### Backend (`backend/.env`):

```
DATABASE_URL=postgresql://user:password@localhost:5432/chopchop
SHIPDAY_API_KEY=your_shipday_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
PORT=5000
```

### Tailwind Config (`frontend/tailwind.config.js`):

```js
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

### Shipday API Test:

```bash
curl -H "Authorization: Bearer YOUR_SHIPDAY_API_KEY" https://api.shipday.com/orders
```

---

## ▶️ Running the Application

### Backend:

```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

### Frontend:

```bash
cd frontend
npm run dev
# Runs on http://localhost:3000
```

### Seed Database:

```bash
npx prisma db seed
```

---

## 🧭 Usage

### Customer Flow

* **Browse**: View restaurants at `localhost:3000`
* **Order**: Add to cart and checkout
* **Pay**: Stripe payment gateway
* **Track**: Shipday tracking link via UI

### Restaurant Flow

* **Login**: `localhost:3000/restaurant/dashboard`
* **Manage Menu**: Add/edit items
* **Process Orders**: Update statuses (e.g., Preparing, Ready)

### Admin Flow

* **Login**: `localhost:3000/admin`
* **Monitor**: View all restaurants and orders
* **Analytics**: Use Shipday insights

---

## 🚚 Shipday Integration

### Order Dispatch:

```js
const axios = require('axios');
await axios.post('https://api.shipday.com/orders', {
  orderId: order.id,
  customer: {
    name: user.name,
    address: user.address,
    phone: user.phone,
  },
  restaurant: {
    name: 'ChopChop',
    address: restaurant.address,
  },
}, {
  headers: { Authorization: `Bearer ${process.env.SHIPDAY_API_KEY}` },
});
```

### Tracking:

```js
const tracking = await axios.get(`https://api.shipday.com/orders/${orderId}`, {
  headers: { Authorization: `Bearer ${process.env.SHIPDAY_API_KEY}` },
});
```

Display tracking map on the order detail page.

---

## 🔌 API Endpoints

### Restaurants:

* `GET /api/restaurants`
* `POST /api/restaurants` (Admin)

### Menus:

* `GET /api/menus/:restaurantId`
* `POST /api/menus` (Restaurant role)

### Orders:

* `POST /api/orders`
* `GET /api/orders/:id`

### Users:

* `GET /api/users/me`

### Shipday API:

* `POST /orders`: Dispatch order
* `GET /orders/:id`: Tracking

---

## 🚀 Deployment

### Frontend (Vercel):

```bash
cd frontend
vercel --prod
```

* Set environment variables in Vercel dashboard.

### Backend (Render):

* Push to GitHub.
* Deploy on Render.
* Set environment variables in Render dashboard.

### Database:

* Use a managed PostgreSQL (Neon, Render, etc.)
* Update `DATABASE_URL`

### Post-Deployment:

* Test Shipday delivery dispatch
* Test Stripe payments
* Check responsive UI

---

## 🤝 Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/xyz`
3. Commit changes: `git commit -m "Add feature xyz"`
4. Push to GitHub: `git push origin feature/xyz`
5. Open a pull request

---

## 📄 License

MIT License. See `LICENSE` file for details.

---

### Made with ❤️ by Insa and the ChopChop Team
