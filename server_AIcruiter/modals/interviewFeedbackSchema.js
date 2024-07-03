const mongoose = require("mongoose")
const interview = require("./interviewSchema")

const Schema = mongoose.Schema



const MainFeedbackSchema = new Schema({
    question: {
        type: String,
        required:true
    },
    answer: {
        type: String,
        required:true
    },
    marks: {
        type: String,
        required:true
    },
    feedback: {
        type: String,
        required:true
    }
    
})


const InterviewFeedbackSchema = new Schema({
    marks: {
        type: String,
       required:true
    },
    generalFeedback: {
        type: String,
    },
    mainFeedback: [MainFeedbackSchema],
    interviewid: {
        type: String,
        required:true
    }
})

const InterviewFeedback=mongoose.model("InterviewFeedBack",InterviewFeedbackSchema)

module.exports=InterviewFeedback