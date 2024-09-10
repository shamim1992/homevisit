import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    contact:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    dob:{   
        type: Date,
        required: true
    },
    qualification:{
        type: String,
    },
    experience:{
        type: String,
    },
    address:{
        type: String,
    },
    resume:{
        type: String,
    },
    certificate:{
        type: String,
    }
},{timestamps: true});

export default mongoose.model("Application", applicationSchema);