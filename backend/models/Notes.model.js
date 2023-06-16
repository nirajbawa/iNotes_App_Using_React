const mongoose = require("mongoose");


const NotesSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    tag:{
        type:String,
        default:"General"
    },
    Date:{
        type:Date,
        default: Date.now
    }
});


const NotesSchemaModel = new mongoose.model("Notes", NotesSchema);

module.exports = NotesSchemaModel;