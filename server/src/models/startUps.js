import mongoose from "mongoose";

var urlLogo = 'https://picsum.photos/id/37/200/'

const StartUpSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
    },
    website: {
        type: String,
    },
    founders: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        default: urlLogo,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    salary: {
        type: String,
        default: 'Unpaid'
    },
    equity :{
        type: Number,
        default: 0,
    },
    jobLocation: {
        type: String,
        default: 'Anywhere in the world'
    },
    jobDescription: {
        type: String,
        required: true
    },
    yearStarted: {
        type: Number,
        required: true
    },
    amountRaised: {
        type: Number
    },
    ideas: {
        type: String,
        required: true
    }, 
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    }
})

export const StartUpModel = mongoose.model('startUps', StartUpSchema)