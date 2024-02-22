const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const jobDetailRouter = require("./router/jobDetailRouter");
// app.use(cors({
//   origin: ["https://frontend-anchors.onrender.com","http://localhost:5173","*"],
//   methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"], 
//   credentials:true
// }));
let corsOptions = {
  origin: function (origin, callback) {
    // db.loadOrigins is an example call to load
    // a list of origins from a backing database
    db.loadOrigins(function (error, origins) {
      callback(error, origins)
    })
  }
}
app.use(cors(corsOptions));


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