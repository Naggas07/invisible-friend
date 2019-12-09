const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 12

// Patterns
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const generateRandomToken = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'el usuario debe tener al menos 3 caracteres']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [EMAIL_PATTERN, 'Debes introducir un email correcto']
    },
    password: {
        type: String,
        required: true
    },
    validated:{
        type: Boolean,
        default: false
    },
    userToken: {
        type: String,
        default: generateRandomToken
    },
    rol: {
        type: String,
        enum: ['Admin', 'Moderator', 'User'],
        default: 'User'
    }
}, { timestamps: true})

userSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(SALT_WORK_FACTOR)
            .then(salt => {
                return bcrypt.hash(user.password, salt)
                    .then(hash => {
                        user.password = hash;
                        next();
                    });
            })
            .catch(error => next(error));
    } else {
        next();
    }
});

userSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
}


const User = mongoose.model('User', userSchema)

module.exports = User