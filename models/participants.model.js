const mongoose = require('mongoose')
const Schema = mongoose.Schema

const participantsSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    target:{
        type: String,
        default: null
    }
})

const Participans = mongoose.model('Participant', participantsSchema)
module.exports = Participans