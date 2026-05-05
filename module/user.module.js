const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId={
        type:mongoose.Schema.Types.ObjectId,
        trim:true,
        required:true,
    },
    name={
        type:String,
        maxLength:25,
        minLength:3,
        trim:true,
        required:true,
    },
    email={
        type:String,
        unique:true,
        maxLength:30,
        minLength:10,
        required:true,
    },
    password={
        type:String,

        required:true,
    },
    role: { 
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
},{ timestamps: true });


module.exports = mongoose.model("User", userSchema);