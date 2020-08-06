const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
   id: mongoose.Schema.Types.ObjectId,
   premium:{ type:String,required:true }
   /* name: { type: String, required: true },
    email: { type: String,required:true },
    mobile: { type: Number, required: true },
    person: { type: String, required: true },
    rera_id: { type: String, default:null },
    rera_url: { type: String,default:null },
    Listmy_propertyfor:{ type: String,required: true },
    Available_for:{ type: String,default:null },
    Typeof_property:{ type: String, required: true },
    Property_status:{ type: String, default:null },
    Possession_from:{ type:String, default:null},
    Available_from:{ type: String,default:null},
    Bachelors_allowed:{ type: String,default:null},
    //Pets_allowed:{ type: String,default:null},
    //Nonveg_allowed:{ type: String,default:null},
    
    /*location:{
     city:{ type: String, required: true },
     Building_area:{ type: String, required: true },
    },
    configuration_and_pricing:{
     Bhk:{ type: String, required: true },
     Carpet_Area:{ type: Number, required: true },
     BuiltUp_Area:{ type: Number, required: true },
     Sale_price:{ type:Number, required: true },
     Price_negotiable:{ type:Boolean, required: true },
     Include_registration:{type:Boolean, required: true },
    },
    other_details:{
    Bathrooms:{ type:Number, required: true },
    Frunish_status:{ type: String, required: true },
    Reserved_parking:{ type: String, required: true },
    total_floors:{ type:Number, required: true },
    property_on_floor:{ type: Number, required: true },
    Balconices:{ type: Number, required: true },
    Description:{ type: String, required: true },
    },
   
   

   // files:{ type:String,required:true},
    //tags:{type:[String],required:true },
        
 
  // images: {
  //     type: Array,
  //     default: []
  // }*/

}, { timestamps: true });
 

module.exports = mongoose.model('Basicdetails', userSchema, 'basicdetails')