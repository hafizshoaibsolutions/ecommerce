const mongoose = require('mongoose');


const db = process.env.MONGO_URI 

const connectDb = async  ()=> {
    try {
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000
        });
        console.log("MongoDB is connected...")
        
    } catch (error) {
        
        console.error("MongoDB connection error:", error)
        process.exit(1);
    }

}

module.exports = connectDb;