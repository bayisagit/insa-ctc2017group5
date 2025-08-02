ChopChop: Restaurant Food Ordering Application
ChopChop is a full-stack food ordering platform designed for seamless restaurant operations and fast delivery. Built with Next.js 14, Tailwind CSS, Express.js, and integrated with Shipday for efficient delivery management, ChopChop enables customers to browse menus, place orders, pay securely, and track deliveries in real-time. Restaurants manage menus and orders, while admins oversee operations.

Table of Contents

Features
Tech Stack
Architecture
Prerequisites
Installation
Configuration
Running the Application
Usage
Customer Flow
Restaurant Flow
Admin Flow


Shipday Integration
API Endpoints
[Deployment](#deployment ....
Contributing
License


Features

Customer Features:
Browse restaurants and menus with responsive UI.
Add items to cart, calculate totals, and pay via Stripe.
Real-time order tracking with Shipday integration.
User authentication (email, Google) via NextAuth.js.


Restaurant Features:
Manage menus (add/edit items) via a dashboard.
View and update order statuses (e.g., preparing, shipped).


Admin Features:
Oversee all restaurants, orders, and users.
Monitor delivery performance via Shipday analytics.


Delivery:
Fast delivery via Shipday’s AI-powered dispatch and tracking.
Supports in-house and third-party drivers (US, Canada, Australia).


Responsive Design: Mobile-friendly interface using Tailwind CSS.
Scalability: PostgreSQL for robust data management.


Tech Stack

Frontend: Next.js 14 (React, TypeScript), Tailwind CSS, shadcn/ui
Backend: Express.js (Node.js), REST API
Database: PostgreSQL
Authentication: NextAuth.js (email, Google)
Payment: Stripe
Delivery: Shipday API
State Management: Zustand
HTTP Client: Axios
Deployment: Vercel (frontend), Render (backend)


Architecture
ChopChop follows a client-server architecture with a modular design:

Frontend (Next.js):
Uses App Router for dynamic routing.
Server-side rendering (SSR) for SEO and performance.
Components: Home, Restaurant, Cart, OrderTracking, RestaurantDashboard, AdminDashboard.
Tailwind CSS and shadcn/ui for styling.


Backend (Express.js):
REST API for managing restaurants, menus, orders, and users.
Integrates with PostgreSQL via Prisma ORM.
Handles Shipday API calls for delivery dispatch and tracking.


Database (PostgreSQL):
Schema: Users, Restaurants, Menus, Orders, Drivers.


Shipday Integration:
Sends orders to Shipday for driver assignment.
Fetches real-time tracking data for customers.


External Services:
Stripe for payments.
NextAuth.js for secure authentication.




Prerequisites

Node.js: v18 or higher
PostgreSQL: v14 or higher
Shipday Account: API key from www.shipday.com
Stripe Account: API keys from dashboard.stripe.com
Vercel Account: For frontend deployment
Render Account: For backend deployment


Installation

Clone the Repository:
git clone https://github.com/bayisagit/insa-ctc2017group5.git
cd chopchop


Frontend Setup:
cd frontend
npm install


Backend Setup:
cd backend
npm install


Database Setup:

Install PostgreSQL and create a database named chopchop.
Update Prisma schema (backend/prisma/schema.prisma):datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}


Run migrations:npx prisma migrate dev --name init






Configuration

Environment Variables:

Frontend (frontend/.env.local):NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
STRIPE_PUBLIC_KEY=your_stripe_public_key


Backend (backend/.env):DATABASE_URL=postgresql://user:password@localhost:5432/chopchop
SHIPDAY_API_KEY=your_shipday_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
PORT=5000




Tailwind CSS (frontend/tailwind.config.js):
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
};


Shipday API:

Obtain API key from Shipday dashboard.
Test API connectivity:curl -H "Authorization: Bearer YOUR_SHIPDAY_API_KEY" https://api.shipday.com/orders






Running the Application

Backend:
cd backend
npm run dev


Runs on http://localhost:5000.


Frontend:
cd frontend
npm run dev


Runs on http://localhost:3000.


Database:

Ensure PostgreSQL is running and seeded with initial data:npx prisma db seed






Usage
Customer Flow

Browse: Visit localhost:3000 to view restaurants.
Order: Select a restaurant, add items to cart, and proceed to checkout.
Pay: Complete payment via Stripe.
Track: Receive a Shipday tracking link to monitor delivery in real-time.

Restaurant Flow

Login: Access localhost:3000/restaurant/dashboard with restaurant credentials.
Manage Menu: Add/edit menu items via the dashboard.
Process Orders: Update order statuses (e.g., “preparing,” “ready”).

Admin Flow

Login: Access localhost:3000/admin with admin credentials.
Monitor: View all restaurants, orders, and delivery statuses.
Analytics: Use Shipday analytics to optimize delivery operations.


Shipday Integration
ChopChop integrates with Shipday for fast delivery:

Order Dispatch:
After payment, orders are sent to Shipday via API:const axios = require('axios');
await axios.post('https://api.shipday.com/orders', {
  orderId: order.id,
  customer: { name: user.name, address: user.address, phone: user.phone },
  restaurant: { name: 'ChopChop', address: restaurant.address },
}, {
  headers: { Authorization: `Bearer ${process.env.SHIPDAY_API_KEY}` },
});




Tracking:
Fetch real-time driver updates:const tracking = await axios.get(`https://api.shipday.com/orders/${orderId}`, {
  headers: { Authorization: `Bearer ${process.env.SHIPDAY_API_KEY}` },
});


Display tracking on the customer’s order page using Google Maps.




API Endpoints
Backend (Express.js)

Restaurants:
GET /api/restaurants: List all restaurants.
POST /api/restaurants: Create a restaurant (admin only).


Menus:
GET /api/menus/:restaurantId: Get menu for a restaurant.
POST /api/menus: Add menu item (restaurant role).


Orders:
POST /api/orders: Create an order.
GET /api/orders/:id: Get order details and tracking.


Users:
GET /api/users/me: Get user profile (authenticated).



Shipday API

POST /orders: Dispatch order to drivers.
GET /orders/:id: Fetch tracking data.


Deployment

Frontend (Vercel):
cd frontend
vercel --prod


Set environment variables in Vercel dashboard.


Backend (Render):

Push backend to a GitHub repository.
Deploy on Render, linking to PostgreSQL add-on.
Set environment variables in Render dashboard.


Database:

Use a managed PostgreSQL service (e.g., Neon or Render).
Update DATABASE_URL in backend .env.


Post-Deployment:

Test Shipday integration and Stripe webhooks.
Verify responsive design across devices.




Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/xyz).
Commit changes (git commit -m "Add feature xyz").
Push to the branch (git push origin feature/xyz).
Open a pull request.


License
MIT License. See LICENSE for details.