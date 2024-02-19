const mongoose = require("mongoose");
const validator = require("validator");
const jobSchema = new mongoose.Schema({
     companyname: {
        type: String,
     },
     roleName:{
        type:String,
     },
     logo : {
        type:String,
        default:'https://internshala.com/static/images/company/logo.svg'
     },
     salary : {
        type:Number,
     },
     experience:{
        type:Number,
        default:0
     }

});


 const Job = mongoose.model('Job',jobSchema);
 module.exports = Job;