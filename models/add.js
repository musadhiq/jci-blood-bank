const mongoose = require("mongoose")
const imgSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
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
const image = mongoose.model("add", imgSchema)

module.exports = image