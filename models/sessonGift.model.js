const mongoose = require('mongoose')
const Schema = mongoose.Schema

const seassonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    leadUser: {
        type: Schema.Types.ObjectId,
        required: true
    },
    description: {
        type: String
    },
    maxAmount:{
        type: Number,
        required: true
    },
    deliverDate:{
        type: Date,
        required: [true, 'La fecha de entrega es requerida']
    }
}, { timestamps: true })

const Seasson = mongoose.model('Seasson', seassonSchema)
module.exports = Seasson