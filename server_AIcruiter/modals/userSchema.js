const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique:true
    }
    
})

const user = mongoose.model("Userschema", UserSchema)

module.exports=user