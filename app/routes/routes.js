const  express = require('express');
const router =   express.Router();

const controllers =  require('../controller/appcontroller');
const config =   require('../../configuration/appconfig')



module.exports.setRouter = (app) => {

    let baseUrl =`${config.apiVersion}/send`;
   

    //   route  for sending otp
    // localhost:3000/api/v1/send/sendotp
    app.post(`${baseUrl}/sendotp`, controllers.otpsend);

    // route for verifying otp
    // localhost:3000/api/v1/send/verify
    app.post(`${baseUrl}/verify`, controllers.verifyotp);


     //route to resend otp
     //localhost:3000/api/v1/send/retry
    app.post(`${baseUrl}/retry`, controllers.retryotp);

   

   

}