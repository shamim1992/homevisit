import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username:{
        type: String,  
    },
    contact:{
        type: String,
    },
    email:{
        type: String,
    },
    dob:{   
        type: Date,
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
    state:{
        type: String,
    },
    district:{
        type: String,
    },
    city:{
        type: String,
    },
    resume:{
        type: String,
    },
    certificate:{
        type: String,
    },
    prefferedarea:{
        type: String,
    }
},{timestamps: true});

export default mongoose.model("Application", applicationSchema);