const express = require('express');

const shortId =  require('shortid')

const check = require('../libs/checklib');
const logger = require('../libs/loggerlib');
const response = require('../libs/responselib');
const nodeMailer = require('nodemailer');
const mongoose = require('mongoose')





const otpModel = mongoose.model('otp')

//const msg91sms = require('msg91-sms');

const SendOtp = require('sendotp');

const sendOtp = new SendOtp('237449A6SiQWIVMnm35b9a9ccf');


//function for sendin otp

let otpsend =(req , res)=>{
    if(check.isEmpty(req.body.number))
    {
        let apiresponse = response.generate(true, 'required parameter missing' , 403, null)
        res.send(apiresponse)
    }
    else{
        let number = req.body.number;
        let senderId = shortId.generate();
         sendOtp.send(number,senderId, (err, data)=>{
              if(err)
              {
                  console.log(err)
              }
              else {
                  console.log(data);
                  let apiresponse = response.generate(false , ' otp sent succesfully', 200 ,data)
                  res.send(apiresponse)
              }
          });

        
          sendOtp.setOtpExpiry('1'); 

          

    }
}

//end of function for sending otp

// functin  to verifyotp

let verifyotp =(req, res)=>{

    if(check.isEmpty(req.body.otp) || check.isEmpty(req.body.number))
    {
        let apiresponse = response.generate(true, 'required parameter missing', 403, null)
        res.send(apiresponse);

    }

    else{
        let number = req.body.number;
        let otptoverify = req.body.otp;
        sendOtp.verify(number, otptoverify, (err, data)=>{
            if(err)
            {
                console.log(err)
            }
            else{
                console.log(data);

                let verifieddata = new otpModel({
                    number:req.body.number,
                    sentTime:Date.now(),
                    otp:req.body.otp,
                    verified:true
                })

                verifieddata.save((err, result)=>{
                    if(err)
                    {
                        logger.error(`error${err}`, 'database', 10);
                        let apiresponse = response.generate(true, 'some error occured ', 500, null)
                        res.send(apiresponse);
                    }
                    else {
                        let apiresponse = response.generate(false, 'data saved succesfully', 200, result)
                        res.send(apiresponse)
                    }
                })
            }
        })
    }

    
}


//end of function to verifyotp

// function to resend otp
let retryotp =(req, res)=>{
    
     if(check.isEmpty(req.body.number))
     {
           let apiresponse = response.generate(true, 'required parameter missing', 403, null)
           res.send(apiresponse)
     }

     else {
         let number = req.body.number ;
         sendOtp.retry(number, false, (err, data)=>{
             if(err)
             {
                 console.log(err);
             }
             else 
             {
                 console.log(data)
                 let apiresponse = response.generate(false , ' otp resent succesfully', 200 ,data)
                  res.send(apiresponse)
                
             }
         })
     }
}

//end of function to resend otp

module.exports ={
    otpsend:otpsend,
    verifyotp:verifyotp,
    retryotp:retryotp
  
}