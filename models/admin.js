const mongoose = require("mongoose")

// creating model

const adminSchema = new mongoose.Schema({
    username: {
        type : String},
    password: {
        type : String},
    
        
})


const admin= mongoose.model("admin",adminSchema)

module.exports = admin