const Job = require("../model/jobDetailModel");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;


const storage = multer.memoryStorage();
const upload = multer({storage});

exports.uploadLogo = upload.single('logo');

exports.getallJob = async(req,res,next)=>{
    try{
     const detail = await Job.find();

        res.status(200).json({
            length:detail.length,
            status:"Success",
            data:{
              detail
            }
        });
    }catch(err){
        es.status(404).json({
            status:"Failed",
            data:{
              err:err.message
            }
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
            data:{
              user
            }
        });
    }catch(err){
        res.status(404).json({
            status:"Failed",
            data:{
              err:err.message
            }
          })
    }
}
exports.findById = async(req,res,next)=>{
    try{
        const {id} = req.params;
        const user = await Job.findById(id);
        res.status(200).json({
            status:"Success",
            data:{
              user
            }
        });
    }catch(err){
        res.status(404).json({
            status:"Failed",
            data:{
              err:err.message
            }
          })
    }
}
