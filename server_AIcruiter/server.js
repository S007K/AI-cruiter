const express = require("express")
const dotenv = require("dotenv")
var cors = require('cors')

require("./dbconnect")


// routes

const interviewRoute=require("./controllers/interviewRoute")
const userRoute=require("./controllers/userRoute")
const feedbackRoute=require("./controllers/FeedbackRoute")

dotenv.config()

const app = express()

// cors
app.use(cors())
app.use(express.json())

app.use("/api/interview",interviewRoute)
app.use("/api/feedback",feedbackRoute)
app.use("/api/user",userRoute)

const PORT = process.env.PORT || 8000

app.listen((PORT), () => {
    console.log(`server runing at http://localhost:${PORT}`)
})