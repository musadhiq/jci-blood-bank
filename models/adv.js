const mongoose = require("mongoose")
const imgSchema = new mongoose.Schema({
    imgname: {
        type: String
    },
    link: {
        type: String,
        require: true
    },
    path: {
        type: String,
        require: true
    }
})
const image = mongoose.model("advertisement", imgSchema)

module.exports = image