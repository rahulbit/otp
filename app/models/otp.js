const mongoose = require('mongoose'),
 Schema = mongoose.Schema;

const otpSchema = new Schema({
    
    number :{
        type:'String',
        default:''
    },

  

    sentTime:{
        type:"Date",
        default:''
    },

   otp:{
     type:'String',
     default:''
    },

    verified:{
     type:'Boolean',
     default :false
    }


})

mongoose.model('otp', otpSchema);