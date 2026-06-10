# CodeAlpha_ECommerceStore 🛒✨

A complete, professional, and visually stunning student-level full-stack e-commerce project designed and developed as a **CodeAlpha Internship task submission and showcase project**. 

The goal of this application is to demonstrate clean UI aesthetics, modular backend routing, local JSON file-based database persistence, secure route auth simulations, dynamic carts management, and purchase flow logs in a simple, fully self-contained codebase.

---

## 🚀 Key Features

### Frontend (HTML/CSS/JS)
- **Premium UI Aesthetics**: Harmonies of blue and dark slate (`#2563eb`, `#1e293b`), smooth drop shadows, responsive flexbox/grids layouts, hover effects, and CSS micro-animations.
- **Dynamic Product Rendering**: Generates high-fidelity product cards dynamically, complete with custom SVG vector illustrations that guarantee offline performance.
- **Interactive Session Cart**: Local-storage-backed shopping cart that tracks subtotal adjustments, item counters, delivery fees, and standard GST in real-time.
- **Secure Route Guards**: Authentication checks that automatically redirect guest users to the Login panel if checkout coordinates are accessed.
- **Popup Notifications & Animations**: Absolute CSS toast alert notifications (success, error, warning, info) and center-floating loading spinners.

### Backend (Node.js & Express)
- **Local JSON Storage**: Robust data model using local storage persistence (`data/products.json`, `data/users.json`, `data/carts.json`, `data/orders.json`), eliminating external DB setup requirements.
- **Modular Routing**: Separated controllers for catalog search (`/api/products`), user authorization (`/api/login`, `/api/register`), cart synchronization (`/api/cart`), and orders execution (`/api/checkout`, `/api/orders`).
- **Auth Session Middleware**: Middleware checking Bearer tokens on orders/checkout fetches to protect secure user data scopes.

---

## 🛠️ Technology Stack
- **Frontend Core**: HTML5, Vanilla CSS3 (Custom Variables, CSS Grids/Flexbox), Vanilla ES6 JavaScript
- **Backend Server**: Node.js, Express.js
- **Persistence Layer**: Local JSON Files Database (No MongoDB/SQL required)
- **Execution Tools**: nodemon, cors, body-parser

---

## 📂 Project Structure
```
CodeAlpha_ECommerceStore/
├── server.js               # Core server entry configuration
├── package.json            # Node dependencies and execution scripts
├── README.md               # Developer documentation
│
├── data/                   # JSON Persistence Layer
│   ├── products.json       # Pre-seeded catalog containing 15 tech items
│   ├── users.json          # Pre-seeded demo user credentials
│   ├── carts.json          # Synchronized database cart allocations
│   └── orders.json         # Invoice transaction receipts records
│
├── middleware/             # Express Middlewares
│   └── authMiddleware.js   # Secure header verification logic
│
├── routes/                 # Express API Endpoint Modules
│   ├── authRoutes.js       # Register and login API controllers
│   ├── productRoutes.js    # Catalog details fetch controllers
│   ├── cartRoutes.js       # User specific cart backup controllers
│   └── orderRoutes.js      # Checkout and orders log controllers
│
└── public/                 # Static Public Assets
    ├── index.html          # Landing Hero page
    ├── css/
    │   └── style.css       # Unified modern CSS design system
    ├── js/
    │   ├── common.js       # Global Navbar/Footer injections, toast alerts
    │   ├── home.js         # Homepage logic
    │   ├── products.js     # Catalog search/filter logic
    │   ├── product-details.js # Specs viewer logic
    │   ├── cart.js         # Invoice lists calculations logic
    │   ├── login.js        # Auth gate controller logic
    │   ├── register.js     # New account builder logic
    │   ├── checkout.js     # Payments execution logic
    │   └── orders.js       # Purchase receipts history logic
    └── pages/              # Secondary HTML subpages
        ├── products.html
        ├── product-details.html
        ├── cart.html
        ├── login.html
        ├── register.html
        ├── checkout.html
        └── orders.html
```

---

## 🔑 Demo Login Credentials
For instant showcase demonstration, a demo student account is pre-created and pre-seeded. A convenient **Auto-fill Demo Account** button is also available on the Login page for immediate click-to-login.

* **Email Address:** `student@example.com`
* **Password:** `student123`

---

## 💻 Installation & Quickstart

Follow these simple commands to run the project locally in VS Code:

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server (with nodemon)
```bash
npm run dev
```

### 3. Open in Browser
Click or navigate to:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🔌 API Route Reference

### Authentication (Public)
- `POST /api/register` : Create a brand new user profile on users.json database.
- `POST /api/login`    : Verify email/password and returns a mock user auth token.

### Catalog Explorer (Public)
- `GET /api/products`  : Retrieve all 15 pre-seeded products (supports query filters `?category=XYZ&search=ABC`).
- `GET /api/product/:id` : Retrieve comprehensive specifications metadata for a single product ID.

### Shopping Cart (Protected - Requires Bearer Token)
- `GET /api/cart`      : Fetch backup cart items array mapped to authenticated user's email.
- `POST /api/cart`     : Synchronize/update current local cart array with backend server database.

### Purchases & Fulfillment (Protected - Requires Bearer Token)
- `POST /api/checkout` : Processes shipping coordinates form, generates a mock invoice code matching `ORDxxxxx`, and appends results to orders.json database.
- `GET /api/orders`    : Retrieve history log records of all orders placed belonging to logged-in user email.
