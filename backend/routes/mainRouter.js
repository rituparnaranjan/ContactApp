const express = require("express");
const mainRouter = express.Router();
const User = require("../models/User");
const Contact = require("../models/Contact");
const jwt = require("jsonwebtoken");
const key = require("../utils/jwtKey");
const auth = require("../middleware/auth");

mainRouter
    .route("/signIn")
    .get((req, res) => {
        res.send("SignIn router called");
    })
    .post((req, res) => {
        console.log(req.body);
        const email = req.body.email.email;
        const password = req.body.password.password;
        if (!email || !password) {
            res.send("Login Error");
        }
        User.findOne({ email: email })
            .then((user) => {
                if (user.password == password) {
                    const token = jwt.sign({ userId: user._id }, key);
                    res.send({ token });
                } else {
                    console.log("Wrong password or email");
                    res.send("Wrong password or email");
                }
            })
            .catch((err) => {
                console.error(err);
            });
    });
mainRouter
    .route("/signUp")
    .get((req, res) => {
        res.send("SignUp router called");
    })
    .post((req, res) => {
        const email = req.body.email.email;
        const password = req.body.password.password;
        const secretKey = req.body.secretKey.secretKey;
        // console.log(email);
        // console.log(password);
        // console.log(secretKey);
        const newUser = new User({ email, password, secretKey });
        newUser
            .save()
            .then((response) => {
                // console.log(response);
                console.log("Signed up successfully");
                res.send("Signed up successfully");
            })
            .catch((err) => {
                console.error(err);
            });
    });
mainRouter
    .route("/saveContact")
    .get((req, res) => {
        Contact.find()
            .then((response) => {
                console.log(response);
                res.send(response);
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .post((req, res) => {
        const name = req.body.name.name;
        const number = req.body.phone.phone;
        const email = req.body.email.email;
        const newContact = new Contact({ name, number, email });
        newContact
            .save()
            .then((response) => {
                console.log(response);
                res.send("Contact saved successfully");
            })
            .catch((err) => {
                console.error(err);
            });
    });
mainRouter
    .route("/auth")
    .get(auth, (req, res) => {
        const email = req.body.email;
        console.log(req.user);
        res.send(email);
    })
    .post((req, res) => {
        console.log("Post request is called on /api/auth");
    });

module.exports = mainRouter;
