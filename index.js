const express = require("express");
const app = express();
const cors = require("cors");
const user = require("./router/user");
const expense = require("./router/expense")
const mongoose = require("mongoose");
const port = 5000;
const jwt = require("jsonwebtoken")
require("dotenv").config();
const access_token = process.env.ACCESS_TOKEN

//jwt authMiddleware
const authenticateJWT = function(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, access_token, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};


//database connection
try {
    const db = async () => {
        await mongoose.connect(process.env.MONGO_URI);
    };
    db();
} catch (error) {
    console.log("database connection failed");
}

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


//user route
app.use("/user", user);
app.use("/expense", authenticateJWT, expense);

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});
