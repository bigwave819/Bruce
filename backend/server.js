const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const songRoute = require("./routes/songRoutes");
const productRoute = require("./routes/productRoutes")

const app = express();

dotenv.config()

app.use(cors());
app.use(express.json());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form data

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
connectDB();

// Ensure uploads directory exists
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
    next()
});

//Routes
app.use("/api/song", songRoute);
app.use("/api/product", productRoute)



const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`the server is running at the port ${PORT}`);    
})