# Online Store App 🛍️

A full-stack e-commerce web application where users can register, log in, publish products, browse by category, and manage a personal wishlist.

---

## Tech Stack

**Frontend**
- React 17, React Router v5
- Redux Toolkit (state management)
- Axios (HTTP requests)
- Bootstrap 5, FontAwesome
- Joi (client-side validation)

**Backend**
- Node.js, Express
- MongoDB, Mongoose
- JWT (jsonwebtoken) — authentication
- bcryptjs — password hashing
- Joi — server-side validation
- Morgan + Chalk — logging

---

## Features

- **User Registration & Login** — accounts with name, email, password, address, phone, and profile image
- **JWT Authentication** — token-based auth with 4-hour expiry; protected routes on both client and server
- **Password Security** — passwords hashed with bcrypt before storage
- **Create & Manage Products** — authenticated users can publish products with name, description, price, category, and image
- **Edit & Delete Products** — users can update or remove only their own products
- **Browse by Category** — filter all products by category
- **Wishlist** — like/unlike products; view a personal wishlist of liked items
- **My Products Page** — view all products published by the logged-in user
- **Auth Guard** — protected client-side routes redirect unauthenticated users to login
- **Admin Role** — users can be assigned an admin flag (`isAdmin`)
- **404 Page** — custom not-found page for unknown routes

---

## Project Structure

```
Final - Project/
├── Client/
│   └── online_store_app/
│       └── src/
│           ├── components/       # NavBar, Footer, ProductCard, ProductEditor, PresentCard, AuthGuardRoute
│           ├── pages/            # HomePage, LoginPage, RegisterPage, MyProductsPage,
│           │                     # CreateProductPage, WishListPage, ProductsByCategoryPage,
│           │                     # AboutUsPage, NotFoundPage
│           ├── store/            # Redux store (auth slice)
│           └── validation/       # Joi schemas for login, register, create product
└── Server/
    ├── app.js                    # Express app entry point (port 8181)
    ├── Routes/
    │   ├── Products/             # productRouter, productModel, validation
    │   └── Users/                # userRouter, userModel, validation
    ├── middlewares/
    │   ├── connectToDB.js        # MongoDB connection
    │   └── middleware.js         # JWT auth middleware
    ├── services/
    │   ├── token.js              # JWT generate & verify
    │   └── bcrypt.js             # Password hash & compare
    └── config/
        └── default.json          # Secret key config
```

---

## API Endpoints

### Users — `/api/users`
| Method | Endpoint      | Auth | Description          |
|--------|---------------|------|----------------------|
| POST   | `/register`   | ❌   | Register a new user  |
| POST   | `/login`      | ❌   | Login and get JWT    |
| GET    | `/allusers`   | ✅   | Get all users        |

### Products — `/api/products`
| Method | Endpoint                          | Auth | Description                        |
|--------|-----------------------------------|------|------------------------------------|
| GET    | `/allproducts`                    | ✅   | Get all products                   |
| GET    | `/allproducts/:category`          | ✅   | Get products by category           |
| GET    | `/myproducts`                     | ✅   | Get current user's products        |
| GET    | `/wishlist`                       | ✅   | Get current user's liked products  |
| POST   | `/createnewproduct`               | ✅   | Create a new product               |
| POST   | `/addtowishlist/:productid`       | ✅   | Like a product                     |
| POST   | `/removefromwishlist/:productid`  | ✅   | Unlike a product                   |
| PUT    | `/:productid`                     | ✅   | Update a product (owner only)      |
| DELETE | `/:productid`                     | ✅   | Delete a product (owner only)      |

---

## Getting Started

### Prerequisites
- Node.js
- MongoDB running locally

### Server
```bash
cd "Final - Project/Server"
npm install
npm start        # runs with nodemon on port 8181
```

### Client
```bash
cd "Final - Project/Client/online_store_app"
npm install
npm start        # runs on port 3000
```

---

## Notes
- The app runs locally only (no deployment)
- JWT tokens expire after 4 hours
- Unauthenticated users are redirected to the login page
