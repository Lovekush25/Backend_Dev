const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    productid={
        type:String,
        required:true,
        
    }
},{ timestamps: true });


module.exports = mongoose.model("Order", OrderSchema);
