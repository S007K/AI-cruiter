
const mongoose = require("mongoose")

async function getdatabase() {
    const url=process.env.DB_URL||"mongodb://127.0.0.1/AIcruiter"
    try {
        await mongoose.connect(url)
        console.log("database connected")
    }
    catch(error) {
        console.log(error)
    }
}


getdatabase()