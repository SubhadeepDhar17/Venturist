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
    },
    jobLocation: {
        type: String,
        default: 'Anywhere in the world'
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
    }
})

export const StartUpModel = mongoose.model('startUps', StartUpSchema)