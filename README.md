🍽️ Restaurant Delivery Web Application
📌 Project Overview
The Restaurant Delivery Web Application is a full-stack food ordering platform designed to connect customers with nearby restaurants. Built with Next.js, Prisma, and PostgreSQL, the system offers dedicated dashboards for Admins, Restaurant Owners, and Customers, allowing smooth management of users, menus, and orders.

The platform is optimized for performance, scalability, and user experience with modern web technologies.

🧰 Tech Stack
Layer	Technology
Frontend	Next.js (React), Tailwind CSS
Backend	Next.js API Routes, Prisma ORM
Database	PostgreSQL
Auth	NextAuth.js (JWT-based)
Deployment	Vercel (recommended)
Tooling	ESLint, Prettier, TypeScript

🗂️ Project Structure
bash
Copy
Edit
/restaurant-delivery-app

│
├── app/                # Application routes
│   ├── api/            # Backend API routes
│   ├── admin/          # Admin dashboard
│   ├── restaurant/     # Restaurant owner dashboard
│   ├── customer/       # Customer dashboard
│   ├── auth/           # Authentication routes
│   ├── globals.css     # Global Tailwind CSS
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Landing page
│

├── components/         # Reusable components
├── lib/                # Utilities and Prisma client
├── prisma/             # Prisma schema and migrations
├── public/             # Static assets (images, fonts)
├── styles/             # Optional custom styles
├── package.json        # Project dependencies
├── tailwind.config.js  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation


✨ Key Features
🔒 Authentication
Role-based login/signup: Admin, Restaurant Owner, and Customer

Secured with NextAuth.js (JWT)

📊 Admin Dashboard
Manage users and restaurants

Review and moderate menus

Track all orders

View platform-wide analytics

🏪 Restaurant Owner Dashboard
Create and manage menu items

Accept and update orders (Preparing → Ready → Delivered)

Manage tables for reservations

Analyze performance metrics

👨‍🍳 Customer Dashboard
Browse restaurants and menus

Place orders (Delivery/Pickup)

View order history and track order status

Submit reviews and manage profile

🌐 General Features
Real-time order updates (polling/WebSockets)

Fully responsive UI (Tailwind CSS)

Advanced restaurant/menu filtering

Stripe payment integration (mocked for hackathon)

Optional Email/SMS notifications

🗃️ Database Overview (Prisma)
The database schema is designed to clearly define roles and relationships between users, restaurants, orders, and menus.

📌 Core Models Overview
Model	Description
User	Represents all users with a role (Admin, Restaurant, Customer)
Customer	Links to User, holds address, phone, and orders
Restaurant	Links to User, contains restaurant info and menus
Menu	Items offered by a restaurant (name, price, image)
Order	Customer's order with status (Pending → Delivered)
OrderItem	Specific menu items within an order
Table	Restaurant tables for reservations
Review	Customer feedback with ratings and comments

Enum Types like Role, OrderStatus, and TableStatus help manage user roles and state transitions.

🚀 Getting Started
Follow the steps below to set up and run the project locally:

Clone the Repository

bash
Copy
Edit
git clone https://github.com/bayisagit/insa-ctc2017group5.git
cd insa-ctc2017group5
Install Dependencies

bash
Copy
Edit
npm install
Configure Environment

Create a .env file based on .env.example

Add your PostgreSQL, NextAuth, and Stripe credentials

Set Up the Database

bash
Copy
Edit
npx prisma migrate dev --name init
Run the App

bash
Copy
Edit
npm run dev
Visit

http://localhost:3000 to see the app in action

📎 Notes

Real-time updates can be improved using tools like Socket.IO or Ably for production.

📫 Contact
For questions or contributions, feel free to open an issue or contact the dev team.

