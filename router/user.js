const router = require('express').Router()
const userModel = require("../model/user")


//register a user
router.post("/register", async(req, res) => {
    const {fullName, email, password} = req.body
    console.log(req.body);
    try {
        const existingUser = await userModel.findOne({email: email})
        if(!existingUser){
            const newUser = new userModel({
                fullName,
                email,
                password
            })

            const response = await newUser.save()
            res.status(200).json({response,message: "user saved into database"})
        }
        else{
            res.status(403).json({message: "user already exists"})
        }
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
})

//user login
router.post('/login', async(req, res) => {
    const {email} = req.body
    try {
        const user = await userModel.findOne({email: email})
        if(user)
        res.status(200).json(user)
    else
        res.status(404).json({message: "user not found"})
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
})

module.exports = router