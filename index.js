const express = require("express");
const app = express();
const cors = require("cors");
const user = require("./router/user");
const mongoose = require("mongoose");
const port = 5000;
require("dotenv").config();

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

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});
