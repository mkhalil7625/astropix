var express = require('express');
var router=express.Router();
//get favorite page which will be the home page for this router
router.get('/',function (req, res, next) {
    res.render('favorites',{favorites:req.session.favorites});
});
//post to add new favorite to user's favorits
router.post('/add', function (req, res, next) {
    //if a favorites array doesnot exist create it
    if(!req.session.favorites){
        req.session.favorites=[];
        }
        //filter favorites array for image with that date
    var favorite_on_date=req.session.favorites.filter(function (fav) {
        return fav.date==req.body.date
    });
    //if no favorites with that date, then add to the array
    if (favorite_on_date.length==0){
        req.session.favorites.push(req.body);
    }
    //redierect to the favorites page
    res.redirect('/favorites')
});
//Post delete all images
router.post('/deleteAll',function (req, res, next) {

var favorites=req.session.favorites;
    favorites.deleteObjectStore()
        .then(() => {

            res.redirect('/favorites');
        }).catch((err) => {
        next(err);
    });

});

module.exports=router;