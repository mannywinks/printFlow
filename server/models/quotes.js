import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
    client : {
        type: String,
        required: true,
        trim: true
    },

    amount : {
        type: Number,
        required: true,
        min: 1
    },

    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    }
},
   { timestamps : true }
);

 const Quote = mongoose.model("Quote", quoteSchema);

 export default Quote;