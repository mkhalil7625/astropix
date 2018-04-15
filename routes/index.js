var express = require('express');
var router = express.Router();
//require apod service to connect fetch JSON data that represents a picture
var apodService=require('../services/apod');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
    //redierct to fetchpicture
    res.redirect('fetchpicture')
});
//fetch a picture from NASA's picture of the day service
router.get('/fetchpicture', function (req, res, next) {
    apodService(function (err, apod_data) {
        //if random pic requested, fetch random picture. otherwise fetch todays pic
        if (err) {
            res.render('apod_error', {message: err.message, title: 'Error'});
        } else {
            res.render('index', {apod: apod_data, title: `APOD for ${apod_data.data}`});
        }
    },req.query.picturetype);

    // if(req.query.picturetype==='random'){//if picturetype is random
    //   res.send('todo:get random pic')
    // }else{//get todays picture
    //   res.send('todo:get today\'s picture');
    // }
})
module.exports = router;
