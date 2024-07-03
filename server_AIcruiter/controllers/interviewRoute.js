const express = require("express")
const interview = require("../modals/interviewSchema")
const mongoose=require("mongoose")


const router = express.Router()


router.post("/",async (req, res) => {
    try {
        
        console.log(req.body)
        const data = new interview(req.body)
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
        const userId =  req.params.id 
        console.log(userId)
        const data = await interview.find({userId:userId })
        // console.log(data)
        if (data.length>0) {
        
            res.send({ result: "done", message: "record found", data: data })
            
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

router.get("/singleinterview/:id", async (req, res) => {
    try {
        const Id = req.params.id
        let data
             data =await interview.find({_id:Id})
        
        
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

router.put("/singleinterview/:id", async (req, res) => {
    try {
        const data = await interview.findOne({ _id: req.body.interviewid })
        if (data) {
            data.completed = true
            data.feedBack = req.body.feedbackResponse
            await data.save()
            res.send({result:"done",message:"Record is updated!!!",data:data})
        }
        else {
            throw {message:"no record found"}
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({result:"fail",message:error.message})
    }
})



module.exports=router