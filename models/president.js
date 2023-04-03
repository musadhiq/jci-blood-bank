const mongoose = require("mongoose")
const presidentSchema = new mongoose.Schema({
    name: {
        type: String
    },

    phone: {
        type: Number
    },
    place: {
        type: String
    },

    email: {
        type: String
    },
    nameOfOrganization: {
        type: String
    }

})
const president = mongoose.model("president", presidentSchema)

module.exports = president