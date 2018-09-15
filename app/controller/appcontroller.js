const express = require('express');

const shortId =  require('shortid')

const check = require('../libs/checklib');
const logger = require('../libs/loggerlib');
const response = require('../libs/responselib');
const nodeMailer = require('nodemailer');
const mongoose = require('mongoose')




const emailModel = mongoose.model('email');
const smsModel = mongoose.model('sms')

const msg91sms = require('msg91-sms');

//function to send mail
let sendmail=(req, res)=>{

    if( check.isEmpty(req.body. messageBody)|| check.isEmpty(req.body.emailto)|| check.isEmpty(req.body.subject))
    {
        let apiresponse = response.generate('true', 'required parameter missing', 403, null)
        res.send(apiresponse);
    }

    else {
        let transport = nodeMailer.createTransport({
           
            service:'Gmail',
            
           
            auth:{
                user:' 	rahulparmarshk@gmail.com ',
                pass:' xyz@gmail	'

            },

           
        });
       

        const mailOptions ={
            from:'rahulparmarshk@gmail.com',
            to:req.body.emailto,
            subject:req.body.subject,

            text:req.body.messageBody
        }


    

        transport.sendMail(mailOptions, (err, info)=>{
            if(err)
            {
              
                console.log(err)
            }

            else {
               console.log( 'Message Sent :%s',info.messageId)
            }
        })



    }



    let newMessage = new emailModel( {
       
        emailto:req.body.emailto,
        messageBody:req.body.messageBody,
        messageid:shortId.generate(),
        subject:req.body.subject,
        sentTime:Date.now()
    })

    newMessage.save((err, result)=>{

        if(err)
        {
            logger.error(`error:${err}`, 'database', 10);
            let apiresponse = response.generate('true', 'some error occured', 500, null)
            res.send(apiresponse);

        }
        else{
            let apiresponse = response.generate('false', 'data saved succesfully', 200, result);
            console.log(apiresponse)
            res.send(apiresponse);
        }
    })

}

//end of function to sed mail


// function to send sms
let Sendsms =(req , res)=>{

    if(check.isEmpty(req.body.number)||check.isEmpty(req.body.msg))
    {
        let apiresponse = response.generate('true' , 'parameter missing', 403, null)
        res.send(apiresponse)
    }
    else{


        let authkey ='237449A6SiQWIVMnm35b9a9ccf';// authkey from msg-91 
         let Number =  req.body.number;
         let message = req.body.msg;

         let   senderid = shortId.generate();   
         let route='';
         let dialcode ='';
         
         msg91sms.sendOne(authkey, Number , message, senderid, route, dialcode , (response)=>{

            console.log(response);
         })

            
           let newsmsdata = new smsModel({
            number: req.body.number,
            messageid:shortId.generate(),
            sentTime:Date.now(),
            msg:req.body.msg

           })
            
           newsmsdata.save((err, result)=>{
               if(err)
               {
                   console.log(err)
                   let apiresponse = response.generate(true, 'internal server error', 500, null)
                   res.send(apiresponse);
                   console.log(apiresponse)
               }

               else {
                   let apiresponse = response.generate(false , 'data saved succsfully', 200, result)
                   res.send(apiresponse)
                   console.log(apiresponse)
               }
           })


        


    }

    
// function to end sms
   

}

let  deletesendmail =(req, res)=>{
    emailModel.deleteMany((err, result)=>{
        if(err)
        {
            let apiresponse = response.generate(true, 'internal server error', 500, null)
            res.send(apiresponse)
        }

        else {
            let apiresponse = response.generate(false , 'data deleted succesfully', 200 , result)
            res.send(apiresponse)
        }
    })
}


module.exports ={
    sendmail:sendmail,
    Sendsms:Sendsms,
    deletesendmail:deletesendmail
  
}