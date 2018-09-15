const  mongoose = require ('mongoose'),

 Schema = mongoose.Schema;

let communicationSchema = new Schema({

    
    emailto:{
        type:'String',
        default:''

    },

    messageid:{
        type:'String',
        default:'',
        unique:'true'
    },
    
    messageBody:{
        type:'String',
        default:''
    },

    sentTime:{
     type:'Date',
     default:''
    },

    subject:{
          type:'String',
          default:''
    }

    


})

mongoose.model('email' , communicationSchema);
