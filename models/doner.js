const mongoose = require("mongoose")

// creating model

const donerSchema = new mongoose.Schema({
    name: {
        type: String
    },
    place: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    bloodGroup: {
        type: String
    }

})
const doner = mongoose.model("doner", donerSchema)

module.exports = doner