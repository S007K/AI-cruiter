
const mongoose = require("mongoose")

async function getdatabase() {
    const url = process.env.MONGODB_URL
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 20000, // Increase the timeout to 20 seconds
  socketTimeoutMS: 45000,
        })
        console.log("database connected")
    }
    catch(error) {
        console.log(error)
    }
}


getdatabase()