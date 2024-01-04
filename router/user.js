const router = require("express").Router();
const userModel = require("../model/user");
const jwt = require("jsonwebtoken")
require("dotenv").config();
// const access_token = process.env.ACCESS_TOKEN
const access_Token = process.env.ACCESS_TOKEN;
console.log(access_Token);

//register a user
router.post("/register", async (req, res) => {
    const { fullName, email, password } = req.body;
    console.log(req.body);
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            const newUser = new userModel({
                fullName,
                email,
                password,
            });

            const response = await newUser.save();
            res.status(200).json({ response, message: "user saved into database" });
        } else {
            res.status(403).json({ message: "user already exists" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

//user login
router.post("/login", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        console.log(user);
        if (user) {
            const accessToken = await new Promise((resolve, reject) => {
                jwt.sign({ user: user.fullName }, access_Token, { expiresIn: '48hr' }, (err, token) => {
                  if (err) reject(err);
                  resolve(token);
                });
              });
              console.log(accessToken);
            res.status(200).json({ user, accessToken });
        } else res.status(404).json({ message: "user not found" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
