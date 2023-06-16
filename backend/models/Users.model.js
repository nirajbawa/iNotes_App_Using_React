const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UsersSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        requrie:true
    },
    Date:{
        type:Date,
        default: Date.now
    }
});

UsersSchema.pre("save", async function(next){
    let salt = await bcrypt.genSalt(10)
    this.password  = await bcrypt.hash(String(this.password), salt);
    next();
});

const UsersSchemaModel = new mongoose.model("users", UsersSchema);

module.exports = UsersSchemaModel;