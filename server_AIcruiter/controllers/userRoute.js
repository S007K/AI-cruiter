const express = require("express")

const user = require("../modals/userSchema")

const router = express.Router()

router.post("/", async(req, res) => {
    try { 
        const data = new user(req.body)
        await data.save()
        res.send({ result: "done",message:"record has been created",data:data})
    }
    catch (error) {
        console.log(error)
        res.status(500).send({result:"fail",message:error.message})
    }
})

module.exports=router