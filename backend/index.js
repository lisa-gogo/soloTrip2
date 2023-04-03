

const express = require("express");
const cors = require('cors')
const app = express();
const pool = require("./db")
const shareRoom = require("./api/shareRoom") 

const port = process.env.PORT || 5000
// middleware 
app.use(cors({
    origin: "*",
    methods: ["GET","PUT","POST","DELETE"]
})) //middle-ware
app.use(express.json()) // equal to body parse app.use(cors());

// routes 

app.use("/api",shareRoom)

app.listen(port, ()=>{
    console.log('server has started on port 5000')
})