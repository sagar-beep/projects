const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const path = require('path');
const mongoose = require('mongoose');


// mongoose.Promise = global.Promise;





router.post('/register',(req, res, next) => {
  User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail exists"
          });
        }
        else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                  return res.status(500).json({
                    error: err
                  });
                }
                else
                {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        username:req.body.username,
                        email: req.body.email,
                        phonenumber:req.body.phonenumber,
                        password: hash,
                        person:req.body.person,
                      });
                      user
                        .save()
                        .then(result => {
                          console.log(result);
                          let payload = {subject: result._id}
                          let token = jwt.sign(payload, 'secretKey')
                          return res.status(201).json({
                            message: "User created",
                            token:token

                          });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                              error: err
                            });
                          });
                }

            });
        }
    });
});
  

router.post('/login',(req, res, next) => {
User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "username failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if(result) {
            let payload = {subject:result._id}
            let token = jwt.sign(payload, 'secretKey')
            return res.status(201).json({
                message: "Auth successful",
                token: token,
              });
          
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});



router.delete('/:userId',(req, res, next) => {
    User.deleteOne({ _id: req.params.userId })
      .exec()
      .then(result => {
        console.log(result);
        res.status(200).json({
          message: "User deleted"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });











module.exports = router;


