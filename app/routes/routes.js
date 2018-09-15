const  express = require('express');
const router =   express.Router();

const controllers =  require('../controller/appcontroller');
const config =   require('../../configuration/appconfig')



module.exports.setRouter = (app) => {

    let baseUrl =`${config.apiVersion}/sendmail`;
    let baseUrl1 = `${config.apiVersion}/sendsms`;

    //   route  for sending mail
    // localhost:3000/api/v1/sendmail 
    app.post(`${baseUrl}`, controllers.sendmail);

    // route for sending sms
    // localhost:3000/api/v1/sendsms
    app.post(`${baseUrl1}`, controllers.Sendsms);
    app.post(`${baseUrl}/delete`, controllers.deletesendmail);

   

}