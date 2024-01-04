const mongoose = require("mongoose")

const expense = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    category:{
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required:true
    },
    date: {
        type: Date,
        required: true
    }
})

const expenseModel = mongoose.model("expense", expense)
module.exports = expenseModel