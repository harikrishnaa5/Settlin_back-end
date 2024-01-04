const router = require("express").Router()
const Expense = require("../model/expense")

// add a new expense for logged in user
router.post("/add", async(req, res) => {
   console.log(req.body);
    const {date, category, amount} = req.body
    if(!date || !category || isNaN(amount))
     return res.status(400).json({error: "Invalide data input"})

     try {
        const newExpense = new Expense({
            date, category, amount
        })
        await newExpense.save()
        res.status(200).json({message: "Expense added successfully"})
     } catch (error) {
        console.log("error saving form data to mongodb");
        res.status(500).json({error: "Internal server error"})
     }
})




module.exports = router