const mongoose = require("mongoose");

const connectDB = async (connection_url) => {
    try{
        mongoose.connect(connection_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected`);  
    }catch(e)  {
        console.log(`Error in connecting to MongoDB: ${e}`);
    };
}

const disconnectDB = async () => {
    await mongoose.disconnect();
};

module.exports = {connectDB, disconnectDB};
