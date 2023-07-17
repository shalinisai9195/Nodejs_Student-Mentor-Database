const mongoose = require('mongoose');
mongoose.set('strictQuery',false);
const connectDB = async()=>{
    try {
        
        const conn =await mongoose.connect((process.env.MongoDB_URL));
        console.log(`Database connected: ${conn.connection.host}`);

    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;
