var bcrypt = require('bcrypt');
var jwtutils = require('../utils/jwt.utils.js');
var models = require('../models');
const multer = require("multer");
const fs = require("fs");
const path = require('path');
const user = require('../models/user.js');
const db = require('../models');

// Routes
module.exports = {


    profile: function (req, res) {

        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var adresse = req.body.adresse;
        var telephone = req.body.telephone;
        var headerAuth = req.headers['authorization'];
        var userId = jwtutils.getUserId(headerAuth);
        if (userId < 0) {
            return res.status(400).json({
                'err': 'wrong token'
            });
        }

        models.Profile.findOne({
            where: { UserId: userId }
        })
            .then(function (FoundUser) {

                if (!FoundUser) {
                    var newUser = models.Profile.create({
                        firstName: firstName,
                        lastName: lastName,
                        UserId: userId,
                        adresse: adresse,
                        telephone: telephone

                    })
                        .then(function (newUser) {
                            return res.status(201).json({
                                'Profile': newUser
                            })
                        })
                        .catch(function (err) {
                            return res.status(201).json({
                                'Profile': newUser
                            })
                        })
                } else {
                    console.log("trouver")
                    models.Profile.update({
                        firstName: firstName ? firstName : FoundUser.firstName,
                        lastName: lastName ? firstName : FoundUser.firstName,
                        telephone: telephone ? telephone : FoundUser.telephone,
                        adresse: adresse ? adresse : FoundUser.adresse,

                    },

                        { where: { id: FoundUser.id } }
                    )
                        .then(function (newprofile) {
                            return res.status(201).json({
                                'Profile': newprofile
                            })
                        })
                        .catch(function (error) {
                            return res.status(500).json({
                                'error': error
                            })
                        })
                }
            })
            .catch(function (error) {
                return res.status(500).json({
                    'error': error
                })
            })
    },

    register: function (req, res) {


        var email = req.body.email;
        var username = req.body.name;
        var password = req.body.password;

        if (email == null || username == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameter' })
        }

        // TODO

        models.User.findOne({
            attributes: ['email'],
            where: { email: email }

        })
            .then(function (userFound) {
                if (!userFound) {
                    bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                        var newUser = models.User.create({
                            email: email,
                            username: username,
                            password: bcryptedPassword,
                            isAdmin: 0

                        })
                            .then(function (newUser) {
                                return res.status(201).json({
                                    'user': newUser
                                })

                            })
                            .catch(function (err) {
                                return res.status(500).json({
                                    'error': 'cannot add User'
                                });
                            });
                    });
                }
                else {
                    return res.status(409).json({ 'error': 'user is already exist' })
                }
            })
            .catch(function (err) {
                return res.status(500).jon({ 'error': 'unable to verify user' });
            })
    },

    login: function (req, res) {

        var email = req.body.email;
        var password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({ 'error': 'missing Paramter of login ' });
        }
        // TODO

        models.User.findOne({
            where: { email: email }
        })
            .then(function (userFound) {
                if (userFound) {
                    bcrypt.compare(password, userFound.password, function (errBycrypt, resBycrypt) {
                        if (resBycrypt) {
                            return res.status(200).json({
                                'user': userFound,
                                'token': jwtutils.generateTokenForUser(userFound)
                            })
                        }
                    })
                } else {
                    return res.status(200).json(
                        'error : user not found '
                    )

                }

            }).catch(function (error) {
                return res.status(200).json({
                    'error': error,
                })
            })
    },
    getUser: function (req, res) {

        var headerAuth = req.headers['authorization'];
        var userId = jwtutils.getUserId(headerAuth);
        if (userId < 0) {
            return res.status(400).json({
                'err': 'wrong token'
            });
        }

        models.User.findOne({
            attributes: ['id', 'email', 'username'],
            where: { id: userId }
        })
            .then(function (user) {
                if (user) {
                    res.status(201).json(user);
                } else {
                    res.status(404).json({ 'error': 'user not found' });
                }
            })
            .catch(function (err) {

                res.status(500).json({ 'error': 'cannot fetch user' })

            })
    },
    createhosto: function (req, res) {
        var name = req.body.name;
        var adresse = req.body.adresse;
        var numero = req.body.numero;
        var image = req.body.image;
        var headerAuth = req.headers['authorization'];
        var userId = jwtutils.getUserId(headerAuth);
        if (userId < 0) {
            return res.status(400).json({
                'err': 'wrong token'
            });
        }
        models.User.findOne({
            attributes: ['id', 'email', 'username'],
            where: { id: userId }
        })
            .then(function (user) {
                if (user) {
                    if (name == null || adresse == null || numero == null) {
                        return res.status(400).json({
                            'err': ' missing parameter'
                        });
                    } else {
                        models.hospital.create({
                            name: name,
                            adresse: adresse,
                            numero: numero,
                            image: numero ? image : ""
                        })
                            .then(function (hosto) {
                                res.status(200).json({
                                    "hosto": hosto
                                })
                            })
                            .catch(function (err) {
                                res.status(501).json({
                                    "error": err
                                })
                            })

                    }
                } else {
                    res.status(404).json({ 'error': 'user not found' });
                }
            })
            .catch(function (err) {

                res.status(500).json({ 'error': 'cannot fetch user' })

            })


    },
    createspec: function (req, res) {
        var name = req.body.name;
        var description = req.body.description;
        var maladie = req.body.maladie;
        var headerAuth = req.headers['authorization'];
        var userId = jwtutils.getUserId(headerAuth);
        if (userId < 0) {
            return res.status(400).json({
                'err': 'wrong token'
            });
        }
        models.User.findOne({
            attributes: ['id', 'email', 'username'],
            where: { id: userId }
        })
            .then(function (user) {

                if (user) {
                    if (name == null || description == null || maladie == null) {
                        return res.status(400).json({
                            'err': ' missing parameter'
                        });
                    } else {
                        models.specialisation.create({
                            name: name,
                            description: description,
                            maladie: maladie,

                        })
                            .then(function (spec) {
                                res.status(200).json({
                                    "specialisation": spec
                                })
                            })
                            .catch(function (err) {
                                res.status(501).json({
                                    "error": err
                                })
                            })

                    }

                } else {
                    res.status(404).json({ 'error': 'user not found' });
                }
            })
            .catch(function (err) {

                res.status(500).json({ 'error': 'cannot fetch user' })

            })


    },
    createrdv: function (req, res) {

        var title = req.body.title;
        var description = req.body.description;
        var id_hospital = req.body.id_hospital;
        var time = req.body.time;
        var headerAuth = req.headers['authorization'];
        var userId = jwtutils.getUserId(headerAuth);
        if (userId < 0) {
            return res.status(400).json({
                'err': 'wrong token'
            });
        }
        models.User.findOne({
            attributes: ['id', 'email', 'username'],
            where: { id: userId }
        })
            .then(function (user) {
                if (user) {
                    if (title == null || description == null || id_hospital == null) {
                        return res.status(400).json({
                            'err': ' missing parameter'
                        });
                    } else {
                        models.rendez - vous.create({
                            title: title,
                            description: description,
                            id_hospital: id_hospital,
                            id_user: userId,
                            time: time

                        })
                            .then(function (rdv) {
                                res.status(200).json({
                                    "rdv": rdv
                                })
                            })
                            .catch(function (err) {
                                res.status(501).json({
                                    "error": err
                                })
                            })

                    }
                } else {
                    res.status(404).json({ 'error': 'user not found' });
                }
            })
            .catch(function (err) {

                res.status(500).json({ 'error': 'cannot fetch user' })

            })


    },
    assHosto: async(req, res)=>{
        var hospitalID = req.body.hospital;
        var specialisationID = req.body.specialisation;
        console.log(hospitalID)
        console.log(specialisationID)
        const hospital = await db.hospital.findByPk(hospitalID);
        const specialisation = await db.specialisation.findByPk(specialisationID);
        console.log(hospital)
        console.log(specialisation)
        const ap=await hospital.addSpecialisation(specialisation);
        if(ap){
            return res.status(200).json({'message':'successful'})
        }else{
            return res.status(200).json({'message':'not successful'})

        }
    }

}


