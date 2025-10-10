# 🏨 HostelValy Backend API

This is the backend API for **HostelValy**, a smart and seamless hostel-finding app. Built using **Node.js**, **Express**, and **MongoDB**, this backend powers user authentication, hostel listings, booking flows, and more for the HostelValy mobile frontend.

---

## 🚀 Features

* 🔐 **User Authentication**: Secure registration, login, and OTP verification and password-change with JWT-based protection.
* 🛡️ **User Authorization**: Recognizing user roles and assigning permissions accordingly.
* 🏠 **Hostel Listings API**: Fetch and manage hostel properties with full details.
* 📆 **Booking System**: Handle monthly hostel bookings with server-side validation.
* 📩 **Visit Requests**: Allow users to request visits before booking.
* ⭐ **Reviews**: Users can submit reviews and ratings for hostels they’ve stayed in.
* 🗂️ **Modular Structure**: Organized routes, controllers, and models for scalability.
* 🛡️ **Auth Middleware**: Protects routes and automatically extracts user info from JWT.

---

## 🧑‍💻 Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB (via Mongoose)**
* **dotenv** for environment variable handling
* **cors** for cross-origin API access
* **morgan** for request logging
* **jsonwebtoken** for secure token handling

---

## 🗃️ MongoDB Database: `hostel_valy`

The backend uses a MongoDB database with the following collections:

| Collection      | Purpose                                            |
| --------------- | -------------------------------------------------- |
| `users`         | Stores user credentials, OTPs, and profile data    |
| `hostels`       | Contains hostel property data and room information |
| `bookings`      | Tracks user bookings and payment details           |
| `visitRequests` | Stores visit request data                          |
| `reviews`       | User-generated reviews and ratings for hostels     |

---

## 📁 Project Structure

```
📦 hostelvaly-backend-api
├── config/                     # Configuration files
│   └── database.js             # MongoDB connection setup
├── controllers/                # Business logic for each entity
│   ├── bookings.js
│   ├── hostels.js
│   ├── reviews.js
│   ├── users.js
│   └── visitRequests.js
├── models/                     # Mongoose schemas
│   ├── Booking.js
│   ├── Hostel.js
│   ├── Review.js
│   ├── User.js
│   └── VisitRequest.js
├── middlewares/                # Custom middlewares like ID validation
│   ├── api-limit.js
│   ├── auth.js
│   ├── checkBanned.js
│   ├── cloudinary.js
│   ├── jsonErrorHandler.js
│   ├── upload.js
│   ├── validateId.js
│   └── validateRequest.js
├── routes/                     # API routes
│   ├── bookings.js
│   ├── hostels.js
│   ├── reviews.js
│   ├── users.js
│   └── visitRequests.js
├── seeders/                    # Seeder files to populate database
│   ├── seedBookings.js
│   ├── seedHostels.js
│   ├── seedReviews.js
│   ├── seedUsers.js
│   └── seedVisitRequests.js
├── utils/                     # In order to send email
│   └── send-mail.js
├── views/                     # Containing email handlebars
│   └── email.handlebars.js
├── .example.env               # Environment variable example file
├── index.js                   # Entry point and server setup
├── run-seeder.js              # Seeder runner
├── package.json               # Project metadata and scripts
└── README.md                  # Project documentation
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/sdqaamr/hostelvaly-backend-api.git
cd hostelvaly-backend-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file using the provided `.example.env`:

```env
PORT=3000
HOST="127.0.0.1"
MONGODB_URI="mongodb://localhost:27017/hostel_valy"
APP_URL="http://localhost:8081"
JWT_SECRET="my_jwt_secret"
JWT_EXPIRES_IN="1h"
JWT_ISSUER="my_jwt_issuer"
JWT_AUDIENCE="my_jwt_audience"
EMAIL_HOST = "sandbox.smtp.mailtrap.io"
EMAIL_PORT = 587
EMAIL_USER = my_email_user
EMAIL_PASSWORD = my_password
EMAIL_FROM = "noreply@imsdq.dev"
EMAIL_FROM_NAME = "No Reply"
OTP_TTL_MINUTES = 10
CLOUDINARY_CLOUD_NAME = mu_cloud_name
CLOUDINARY_API_KEY = my_api_key
CLOUDINARY_API_SECRET = my_api_secret
```

### 4. Run the Development Server

```bash
npm run dev
```

The server will start at: [http://127.0.0.1:3000](http://127.0.0.1:3000)

To run in production mode:

```bash
npm start
```

### 🌱 Run Seeders

Populate the database with initial data:

```bash
node run-seeder.js
```

Make sure MongoDB is running locally before executing the seeder.

---

## 📬 API Endpoints Overview

| Entity         | Endpoint             |
| -------------- | -------------------- |
| Hostels        | `/api/hostels`       |
| Users          | `/api/auth`          |
| Bookings       | `/api/bookings`      |
| Visit Requests | `/api/visitRequests` |
| Reviews        | `/api/reviews`       |

Each route supports standard CRUD operations (**GET**, **POST**, **PUT**, **DELETE**).

---

## 🔗 Postman Collection

You can explore and test all API endpoints using our shared Postman collection:

📂 **HostelValy Postman Collection**: [View on Postman](https://galactic-eclipse-587759.postman.co/workspace/My-Workspace~afe2bc9b-58bc-4a8d-89e9-46ba42b47c95/collection/42859315-82d88a55-611d-48a6-bcb5-1450e4502fc3?action=share&creator=42859315&active-environment=42859315-529d16a1-d3d5-47e6-9b36-198b70e4e334)

This Postman collection is named **hostelvaly-backend-api** and contains folders corresponding to the database collections (`hostels`, `users`, `bookings`, `visitRequests`, `reviews`). Each folder includes requests for all CRUD operations.

An environment named **hostelvaly-api-dev** is also included, with a variable:

* `hostelApiUrl` = `http://127.0.0.1:3000/api/`

You can send requests like this:

```
{{hostelApiUrl}}hostels
```

for fetching all hostels.

---

## 🔗 Related Projects

* 📦 **Frontend App** → [HostelValy Frontend](https://github.com/sdqaamr/hostelvaly-frontend)

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👤 Authors & Mentors

| Role         | Name                                                                 |
| ------------ | -------------------------------------------------------------------- |
| 🧑‍💻 Author   | [Saddiqa](https://github.com/sdqaamr) – Developer of HostelValy Backend API |
| 🎓 Mentor    | [Sir Allah Rakha](https://github.com/sudo-allahrakha) – Project Supervisor |

