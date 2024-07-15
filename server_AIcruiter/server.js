const express = require("express")
const dotenv = require("dotenv")
var cors = require('cors')
const cookieParser = require('cookie-parser')
dotenv.config()

require("./dbconnect")


// routes

const interviewRoute=require("./controllers/interviewRoute")
const userRoute=require("./controllers/userRoute")
const feedbackRoute=require("./controllers/FeedbackRoute")


const app = express()

// cors
app.use(cors({
    origin: 'http://localhost:5173'||"https://aicruiter.netlify.app/", // Replace with your frontend domain and port
    credentials: true // Allow credentials (cookies) to be included in the requests
}));
app.use(cookieParser())
app.use(express.json())

app.use("/api/interview",interviewRoute)
app.use("/api/feedback",feedbackRoute)
app.use("/api/user",userRoute)

const PORT = process.env.PORT || 8000

app.listen((PORT), () => {
    console.log(`server runing at http://localhost:${PORT}`)
})