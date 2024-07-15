const express = require("express")

const user = require("../modals/userSchema")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


const router = express.Router()

router.post("/", async(req, res) => {
    const data = new user(req.body)
    bcrypt.hash(data.password, 12, async (err, hash) => {
        if (err) {
            throw {
                result: "fail",
                message:"internal server error"
            }
        }
        else {
                try { 
                data.password=hash
                await data.save()
                res.send({ result: "done",message:"record has been created",data:{firstName:data.firstName,lastName:data.lastName,email:data.email,_id:data._id}})
            }
            catch (error) {
                if (error.code, Object.keys(error.keyValue).includes("email")) {
                error.message="email Already exists"
            }
                res.status(500).send({result:"fail",message:error.message})
        }
    }
        })

})

router.post("/login",async (req, res) => {
    const email = req.body.email

    const password = req.body.password
    console.log(email)
    try {
        const data = await user.findOne({ email: email })
        if (data) {
            const match = await bcrypt.compare(password, data.password);
            if (match) {
                const userInfo={firstName:data.firstName,lastName:data.lastName,email:data.email,_id:data._id}
                const token = jwt.sign(userInfo, process.env.JWT_SECRETE_KEY, {
                    expiresIn:"24h"
                })
                console.log(token)
                res.cookie("token", token, {
                    expires: new Date(Date.now() + 24 * 60 * 60 * 60 * 1000),
                    sameSite: "None",
    secure: true,
                    // Set to the backend domain or a common parent domain
    domain:"localhost",
    path: '/'
                })
                
                res.send({result:"done",message:"user found",data:userInfo})
            }
            else {
                throw {
                    result: "fail",
                    message:"password does not match"
                }
            }
        }
        else {
            throw {
                result: "fail",
                message:"email does not exists"
            }
        }

    }
    catch (error) {
        res.status(500).send({result:"fail",message:error.message})
    }
})


router.get("/auth", (req, res) => {
    // console.log(req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token,process.env.JWT_SECRETE_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token');
        }
        res.send({ message: 'Token is valid', data: decoded });
    });
})

module.exports=router