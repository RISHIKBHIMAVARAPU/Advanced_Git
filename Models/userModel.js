import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : String,
    mobileNumber : Number,
    email : String,

})

const userModel = mongoose.model('User', userSchema);
export {userModel}