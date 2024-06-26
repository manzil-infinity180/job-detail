const Job = require("../model/jobDetailModel");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const redisClient = require("../utils/redisConnect");

const storage = multer.memoryStorage();
const upload = multer({storage});

exports.uploadLogo = upload.single('logo');

exports.getallJob = async(req,res,next)=>{
    try{
     const detail = await Job.find();
     const key = req.originalUrl || req.url;
    try{
      await redisClient.set(key,JSON.stringify({data : detail}),'ex',5*60*60);
    }catch(err){
      console.error("Redis Error "+err);
    }

        res.status(200).json({
            length:detail.length,
            status:"Success",
              detail
            
        });
    }catch(err){
        es.status(404).json({
            status:"Failed",
            err:err.message
          })
    }
}

exports.createJob = async(req,res,next)=>{
    try{
    console.log(req.body);
    // let url;
    
    // const b64 = Buffer.from(req.file.buffer).toString("base64");
    // let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    // // imageURL = req.file.filename;
    // // let imagePath = `https://cloudinary-devs.github.io/cld-docs-assets/assets/images/${imageURL}`;
    // let result = await cloudinary.uploader.upload(dataURI,{
    //   folder:"job-logo"
    // });
    // url = result.url;



        const user = await Job.create(req.body);
        res.status(200).json({
            status:"Success",
              user
            
        });
    }catch(err){
        res.status(404).json({
            status:"Failed",
              err:err.message
           
          })
    }
}
exports.findById = async(req,res,next)=>{
    try{
        const {id} = req.params;
        const user = await Job.findById(id);
        res.status(200).json({
            status:"Success",
              user
            
        });
    }catch(err){
        res.status(404).json({
            status:"Failed",
              err:err.message
           
          })
    }
}

exports.searchField = async(req,res,next)=>{
  try{
    console.log(req.params.search);
    console.log(req.query.name);
    let results = [];
     results = await Job.aggregate([
      { $search: {
          index: 'default',
          text: {
            query: req.params.search,
            path:["companyname","roleName"],
            // path:{
            //   wildcard:"*"
            // },
            fuzzy:{}
          }
        }
      }
    ]);
    console.log(results);

    res.status(200).json({
        status:"success",
     results
    })

  }catch(err){
    
    res.status(404).json({
      status:"Failed",
      err:err.message
    })

  }
}
exports.autoComplete = async(req,res,next)=>{
  try{

    let result = [];
    results = await Job.aggregate([
      {
        '$search': {
          'index': 'autoComplete', 
          'autocomplete': {
            'query': req.params.autocomplete, 
            'path': "roleName",
            "tokenOrder":"sequential"
          }
        }
      }, {
        '$limit': 10
      }, {
        '$project': {
          'roleName': 1,
          'companyname': 1
        }
      }
    ])
    
    res.status(200).json({
      status:"success",
      results
    })

  }catch(err){
    res.status(404).json({
      status:"Failed",
      err:err.message
    })
  }
}
