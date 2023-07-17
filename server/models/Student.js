const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
   firstname: {
      type:String,
      required: true
    },
    lastname: {
      type:String,
      required: true 
    },
    telephone: {
      type: String,
      required:true
    },
    email: {
        type:String,
        required:true
    },
    details:{
      type: String,
      
    },
    createdAt: {
        type:Date,
        default:Date.now()
        
    },
    updatedAt: {
        type:Date,
        default:Date.now()
       }
});

module.exports = mongoose.model('Student', StudentSchema);