const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productId={
        type:String,
        required:true,
    },
    name={
        type:String,
        trim:true,
        required:true,
    },
    price={
        type:Number,
        required:true,
    },

    stock={
        type:Number,
    },
    category={
        type:String,
    }
},{ timestamps: true });


module.exports = mongoose.model("Product", productSchema);







