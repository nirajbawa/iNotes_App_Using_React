const express = require("express");
const router = new express.Router();
const authMiddleware = require("../middlewares/auth.middleware")
const {body} = require('express-validator');
// routes and controller

// get all the notes using GET /api/notes/ sign in required

const notes = require("../controllers/notes.controller")

router.get("/:cat", authMiddleware, notes.getNotes.bind(notes))

// create note using POST /api/notes/ sign in required

router.post("/", authMiddleware, [
    body('title', 'title must be atleast 3 and max 100 characters').isLength({min:3, max:200}),
    body('description', 'description must be required').exists({min:0})
], notes.postNote.bind(notes))


// update notes using PATCH /api/notes/ sign in required

router.patch("/:id", authMiddleware, notes.patchNote.bind(notes))


// delete notes using DELETE /api/notes/ sign in required

router.delete("/:id", authMiddleware, notes.deleteNotes.bind(notes))


module.exports = router