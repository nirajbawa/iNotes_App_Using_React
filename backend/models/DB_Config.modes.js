const mongoose = require("mongoose");

mongoose.set("strictQuery", true)
mongoose.connect(`${process.env.DATABASE}`, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection successful");
}, (e)=>{

    console.log("database connection error\n"+e);
});