product-inventory-api/
│── node_modules/
│── config/
│ └── db.js
│── controllers/
│ ├── authController.js
│ ├── productController.js
│── middleware/
│ └── authMiddleware.js
│── models/
│ ├── User.js
│ ├── Product.js
│── routes/
│ ├── authRoutes.js
│ ├── productRoutes.js
│── .env
│── server.js
│── package.json
│── README.md

npm init -y
npm install express mongoose dotenv bcryptjs jsonwebtoken cors body-parser
