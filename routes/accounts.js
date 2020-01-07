const express = require('express');
const router = express.Router();


const superAdmin = require('../controllers/adminTask');
const User = require('../models/Users');

/* GET home page. */
router.get('/', superAdmin.isLoggedIn, async function(req, res, next) {
    let users = [];
    await User.find(function(err,docs) {
        if(err){
            console.log(err);
        }else{
            if(docs == null){
                users = [];
            }else{
                users = docs;
            }
            res.render('accounts',{title: 'Quản lý tài khoản', users});
        }
    })

    console.log(users);
    console.log("hihiaasdsad");
});

router.get('/lock-user/:id', superAdmin.isLoggedIn, function (req, res){
   
    User.findOneAndUpdate({_id: req.params.id},{status: "Khóa"}, function (err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/accounts');
        }
    })
});

router.get('/unlock-user/:id', superAdmin.isLoggedIn, function (req, res){
    User.findOneAndUpdate({_id: req.params.id},{status: "Hoạt động"}, function (err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/accounts');
        }
    })
});

let hbs = require('hbs');

hbs.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});
module.exports = router;