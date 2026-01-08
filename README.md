# Admin CRUD Dashboard (JWT Auth)

A full-stack **admin-controlled inventory management system**.  
The application allows **admin users to securely manage products** through a protected dashboard using **JWT authentication**.

---

## Live Demo

- **Admin Dashboard (Frontend)**  
   https://admin-crud-app.netlify.app/

- **Backend API (Render)**  
   https://admin-crud-app.onrender.com/

---

## Project Overview

This project was built to demonstrate:

- Secure **JWT-based authentication**
- Admin-only **Create, Update, Delete** operations
- Clean separation between **frontend and backend**
- Real-world deployment using **Render + Netlify**
- MongoDB Atlas integration

---

## Features

### Authentication
- Admin login using JWT
- Token stored in `localStorage`
- Protected admin routes
- Logout functionality

### Product Management (Admin Only)
- Create new products
- View product list
- Update existing products
- Delete products
- Loading state & empty state handling

### Dashboard
- Displays total number of products (live data)

### Accounts Page
- Displays logged-in admin details
- Role-based layout (Admin)

### UI / UX
- Sidebar-based admin layout
- Tailwind CSS styling
- Toast notifications for actions
- Smooth form handling and validations

---

## Tech Stack

### Frontend
- HTML5
- Tailwind CSS
- Vanilla JavaScript

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcryptjs

### Deployment
- **Frontend:** Netlify
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## Authentication Flow

1. Admin logs in via `/api/auth/login`
2. Backend validates credentials
3. JWT token is generated and returned
4. Token is stored in `localStorage`
5. Protected routes verify token via middleware
6. Logout clears token and redirects to login


---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/auth/login` | Admin login |

### Products
| Method | Endpoint | Access |
|------|---------|-------|
| GET | `/api/products` | Public |
| POST | `/api/products` | Admin |
| PUT | `/api/products/:id` | Admin |
| DELETE | `/api/products/:id` | Admin |

---

## Environment Variables (Backend)

MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
PORT=5001


