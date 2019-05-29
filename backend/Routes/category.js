const express = require('express');
const router = express.Router();
const category = require('../Models/category');
//user = require('../Models/user');

process.env.SECRET_KEY = 'secret';

router.get('/category', (request, response) => {
    category.find(function(err, category){
        //console.log(category);
        if(err) console.log(err);
        else{
            response.status(200).json(category);
        }    
    });
})

module.exports = router;