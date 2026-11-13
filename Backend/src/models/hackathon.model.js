const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },

    fullName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    mobile: {
        type: String,
        required: true,
        match: [/^[6-9]\d{9}$/, 'Enter a valid Indian mobile number']
    },

    college: {
        type: String,
        required: true,
        trim: true
    },

    course: {
        type: String,
        required: true
    },

    branch: {
        type: String,
        required: true
    },

    year: {
        type: String,
        required: true
    },

    domain: {
        type: String,
        required: true
    },

    projectName: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },

    pptUrl: {
        type: String,
        required: true
    },

    prototypeUrl: {
        type: String,
        required: true
    },

    demoUrl: {
        type: String,
        default: ''
    },

    teamSize: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

    teamMembers: [
        {
            name: {
                type: String,
                required: true,
                trim: true
            },
            email: {
                type: String,
                required: true,
                lowercase: true,
                trim: true
            }
        }
    ]

}, { timestamps: true });

const Hackathon = mongoose.model('Hackathon', hackathonSchema);

module.exports = Hackathon;