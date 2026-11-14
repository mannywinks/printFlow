import mongoose from "mongoose";
import { MdDescription } from "react-icons/md";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true,
    
    },
    client: { 
        type: String,
        default: "",
        trim: true,
    },
    status: {
        type: String,
        enum: ["Active", "Completed"],
        default: "Active",

    },
     description: {
        type: String,
        default: "",
        trim: true,
     },
     deadline: {
        type: Date,
        default: null,
     }
})

const Project = mongoose.model("project", projectSchema);

export default Project;