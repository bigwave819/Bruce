const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("connected to the database successfully");        
    } catch (error) {
        console.error("the error connection to the db: ", error.message);        
    }
}

module.exports = connectDB;