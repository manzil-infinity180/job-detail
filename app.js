const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const jobDetailRouter = require("./router/jobDetailRouter");
app.use(cors({
  origin: ["https://frontend-anchors.onrender.com","http://localhost:5173","*"],
  // origin: ["*"],
  methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"], 
  credentials:true
}));


app.use(express.json());
app.use(bodyParser.json());
app.get("/message", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.use('/api/v1',jobDetailRouter);
app.get('/',(req,res)=>{
    res.send("Heellooo!!!!");
})

module.exports = app;
