// dotenv config
require("dotenv").config();
// import packages
const express = require("express");
const cors = require('cors');

// app creation
const app = express();
const port = process.env.PORT || 8000;

// app configurations
app.use(express.json());


// cors configurations
let origins = process.env.ORIGINS.split(',')


let corsOptions = {
    origin: origins,
    optionsSuccessStatus: 200
  }

app.use(cors(corsOptions))

// database connection
require("./models/DB_Config.modes")

// middlewares
const logger = require("./middlewares/logger.middleware")
app.use(logger)

//routes
app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/notes", require("./routes/notes.routes"))

app.listen(port,()=>{
    console.log("http://127.0.0.1:"+port);
});