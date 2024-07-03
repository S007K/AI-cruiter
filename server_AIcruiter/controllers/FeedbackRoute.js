const express = require("express")
const InterviewFeedback=require("../modals/interviewFeedbackSchema")

const router = express.Router()


router.post("/", async (req, res) => {
    try {
        console.log(req.body)
        const data = new InterviewFeedback(req.body)
        await data.save()

        res.send({ result: "done",message:"record has been created",data:data})
    
    }
    catch (error) {
        console.log(error)
        res.status(500).send({result:"fail",message:error.message})
    }

})

router.get("/:id", async(req, res) => {
    try
    {
        const interviewid =  req.params.id 
        console.log(interviewid)
        const data = await InterviewFeedback.find({interviewid:interviewid })
        // console.log(data)
        if (data.length>0) {
        
            res.send({ result: "done",message:"record found",data:data})
        }
        else {
            throw {message:"no record found"}
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({result:"fail",message:error.message})
    }
})

module.exports=router