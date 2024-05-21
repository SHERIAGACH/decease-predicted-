var express = require('express');
var usersctrl = require('./Controllers/userCtrl');

// Routes
    exports.router=(function(){
    var apiRouter= express.Router();
    apiRouter.route('/register').post(usersctrl.register);
    apiRouter.route('/login').post(usersctrl.login);
    apiRouter.route('/me').get(usersctrl.getUser);
    apiRouter.route('/profile').post(usersctrl.profile);
    apiRouter.route('/newhosto').post(usersctrl.createhosto);
    apiRouter.route('/newspecialisation').post(usersctrl.createspec);
    apiRouter.route('/newrdv').post(usersctrl.createrdv);
    apiRouter.route('/assHospit').post(usersctrl.assHosto);
    return apiRouter;
    })();
