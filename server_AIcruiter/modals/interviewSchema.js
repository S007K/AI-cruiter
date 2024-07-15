const mongoose = require("mongoose")
// const InterviewFeedback=require("./interviewFeedbackSchema")
const Schema = mongoose.Schema

const questionDetailSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
    },
    type: {
        type: String,
    }
}, { _id : false });

const MainFeedbackSchema = new Schema({
    question: {
        type: String,
    },
    answer: {
        type: String,
    },
    marks: {
        type: String,
    },
    feedback: {
        type: String,
    }
    
})


const InterviewFeedbackSchema = new Schema({
    marks: {
        type: String,
    },
    generalFeedback: {
        type: String,
    },
    mainFeedback: [MainFeedbackSchema],
    
})



const InterviewSchema = new Schema({
    userId: {
        type: String,
        required:true
    },
    interviewName: {
        type: String,
        required:true
    },
    skills: {
        type: String,
        required:true
    },
    yearsofex: {
        type: String,
        required:true
    },
    questionDetails: {
        type:[questionDetailSchema]
    },
    feedBack:{
    type: InterviewFeedbackSchema
},
    completed: {
        type: Boolean,
        default:false
    }
})

const interview = mongoose.model("Interview", InterviewSchema)

module.exports=interview