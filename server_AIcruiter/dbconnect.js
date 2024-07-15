
const mongoose = require("mongoose")

async function getdatabase() {
    const url = process.env.MONGODB_URL
    try {
        await mongoose.connect(url)
        console.log("database connected")
    }
    catch(error) {
        console.log(error)
    }
}


getdatabase()