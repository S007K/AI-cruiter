const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    firstName: {
        type: String,
        required:true
    },
    lastName: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true,
    },
    role: {
        type: String,
        default:"candidate"
    }


})

const user = mongoose.model("Userschema", UserSchema)

module.exports=user