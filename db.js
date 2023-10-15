const mongoose = require('mongoose');

mongoURI = 'mongodb+srv://kaustabh:kaustabh@cluster0.miviyoq.mongodb.net/chat';

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to mongodb successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = connectToMongo;