const express = require("express");
const router = new express.Router();
const {body} = require('express-validator');
const authMiddleware = require("../middlewares/auth.middleware")

// routes and controller

// create user using POST /api/auth/signup sign in not required
const auth = require("../controllers/auth.controller")

router.post("/signup", [
    body('name', 'enter valid name').isLength({min:2}),
    body('name', 'name must be atleast 3 characters').isLength({min:3, max:100}),
    body('email', 'enter valid email').isEmail(),
    body('password', 'password must be atleast 8 characters long').isLength({min:8, max:100})
], auth.signUp.bind(auth))

// signin using POST /api/auth/signin sign in not required
router.post("/signin", [
    body('email', 'enter valid email').isEmail(),
    body('password', 'password must be atleast 8 characters long').isLength({min:8, max:100})
], auth.signIn.bind(auth))


// fetch user details using POST /api/auth/getuser sign in required
router.get("/getuser", authMiddleware, auth.getuse.bind(auth))


module.exports = router