const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
//const upload = multer({dest: 'uploads/'});
const Basicdetail = require('../models/Basicdetails');
const path=require('path');
const sharp=require('sharp');
const fs = require('fs');


/*const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads/')
    },
    filename: (req, file, callBack) => {
        callBack(null, `File_${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage })*/



router.post('/list-your-property',(req, res, next) => {
  //  console.log(req.file);
    const user=new Basicdetail({
    _id: new mongoose.Types.ObjectId(),
     premium:req.body.premium
    /*name:req.body.name,
    email:req.body.email,
    premium_Pack:req.body.premium_Pack,
    mobile:req.body.mobile,
    person:req.body.person,
    rera_id:req.body.rera_id,
    rera_url:req.body.rera_url,
    Listmy_propertyfor:req.body.Listmy_propertyfor,
    Available_for:req.body.Available_for,
    Typeof_property:req.body.Typeof_property,
    Property_status:req.body.Property_status,
    Possession_from:req.body.Possession_from,
    Available_from:req.body.Available_from,
    Bachelors_allowed:req.body.Bachelors_allowed,
    //Pets_allowed:req.body.Pets_allowed,
    //Nonveg_allowed:req.body.Nonveg_allowed,
    
    /*location:{
      city:req.body.city,
      Building_area:req.body.Building_area,
     },
  
     configuration_and_pricing:{
      Bhk:req.body.Bhk,
      Carpet_Area:req.body.Carpet_Area,
      BuiltUp_Area:req.body.BuiltUp_Area,
      Sale_price:req.body.Sale_price,
      Price_negotiable:req.body.Price_negotiable,
      Include_registration:req.body.Include_registration,
     },
     other_details:{
     Bathrooms:req.body.Bathrooms,
     Frunish_status:req.body.Frunish_status,
     Reserved_parking:req.body.Reserved_parking,
     total_floors:req.body.total_floors,
     property_on_floor:req.body.property_on_floor,
     Balconices:req.body.Balconices,
     Description:req.body.Description,
   },
    premium:req.body.premium,
  
  });
 if(req.files)
     {
       let path=''
       req.files.forEach((files,index,arr)=>{
        path=path+ files.path + ',' 
       })
       path=path.substring(0,path.lastIndexOf(","))
       user.files=path
     }

if(req.body.tags)
     {
       var string =req.body.tags
       strx   = string.split(" ");
       array  = [];
   
      array = array.concat(strx);
      user.tags=array
     }*/
    })
      user.save((err, registeredUser) => {
        if (err) {
          console.log(err)      
        } else {
        console.log(registeredUser);
        return res.status(200).json({
          
          message:"successfully uploaded property details"
        });
        }
      })
  
  });


  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")




/*const uploadpath=path.join(__dirname,'../','uploads')
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,uploadpath)
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

var upload = multer({ storage: storage }).single('file');*/



//=================================
//             Product
//=================================




router.post("/uploadImage",upload, (req, res) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
       
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })
    
  /*let compresssedImageFilesSavePath=path.join(__dirname,'../','public','images',new Date().getTime() + ".jpeg")
    sharp(req.file.path).resize(640,400).jpeg({
    quality:100,
    chromaSubsampling:'4:4:4'
   }).toFile(compresssedImageFilesSavePath,(err,info)=>{
       if(err){
           res.send(err)
       }
      return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
   
       
   })*/
    
   

});


/*router.post("/uploadProduct",(req, res) => {

    //save all the data we got from the client into the DB 
    const product = new Basicdetail(req.body)

    product.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});*/
  
  
  
  
  
  
  router.get('/list-your-all-property',(req, res, next) => {
    Basicdetail.find()
      .select("files")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          basicdetail: docs.map(doc => {
            return {
            files: doc.files.split(',')

            };
          })
        };
        //   if (docs.length >= 0) {
        res.status(200).json(response);
        //   } else {
        //       res.status(404).json({
        //           message: 'No entries found'
        //       });
        //   }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });


router.get('/list-your-property/:userId',(req, res, next) => {
  const id = req.params.userId;
  Basicdetail.findById(id)
    .select("files")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          Builder: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/list-your-property"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});


module.exports = router;