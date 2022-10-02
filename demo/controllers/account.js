const express = require('express');
const Router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const  RegisterModel = require('../register');
const saltRounds = 10;

Router.post('/register', (req, res) => {
    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;
    let re_password=req.body.re_password
    
    if (!name) {
     res.send({ status: 0, msg: 'Name is required' })
 } else {
     if (name.length < 3) {
         res.send({ status: 0, msg: 'name length atleast 3 characters' })
     }
 }   
 if (!email) {
     res.send({ status: 0, msg: 'Email is Required' })
 }  else{
     if(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)){
     }else{
         res.send({ status: 0, msg: 'Invaild Email' })
     }
 }
 if (!password) {
     res.send({ status: 0, msg: 'Password is Required' })
 }
  if (password != re_password) {
     res.send({ status: 0, msg: 'Password Does Not Match' })
 } 
    if(name) {
     const salt = bcrypt.genSaltSync(saltRounds);
     const hash = bcrypt.hashSync(req.body.password, salt);
     var newRegister = new RegisterModel(
         {
             name:name,
             email:email,
             password:hash,
            
         }
     );
     newRegister.save(function(err,data)
     {
         if(err){
             res.send(err);
         }else{
            jwt.sign({ email: email, type: 'user' }, 'guvi',{ expiresIn: '1h' } , (err, token) => {
                if (token) {
                  res.statusMessage = "Logged in successfully";
                  let formData = {token:token}
                  return res.status(200).json(formData);
                }
              });
         }
     });}
 })
 
 Router.post('/login', (req, res) => {
     let email = req.body.username;
     let userpwd = req.body.userpwd;
     RegisterModel.findOne({ email:email }, function (err, data) {
         if (err) {
             res.send(err);
         } else {
             if (data == null) {
                 res.send({ status: 0, msg: 'Email is required' })
             } else {
                 let hashedPwd = data.password;
                 let resultPwd = bcrypt.compareSync(userpwd, hashedPwd);
                 if (resultPwd) {
                    res.send({token:token})
                    jwt.sign({ email: email, type: 'user' }, 'guvi',{ expiresIn: '2h' } , (err, token) => {
                        if (token) {
                          res.statusMessage = "Logged in successfully";
                          let formData = {token:token}
                          return res.status(200).json(formData);
                        }
                      });
                 } else {
                     res.send({ status: 0, msg: 'invalid password' })
                 }
             }
         }
     });
 })

 Router.post('/getUserInfoByToken', (req, res) => {
    let token = req.body.token;
    console.log(token);
    console.log("===Token=====",token);
    var decoded = jwt.decode(token);
    console.log("===decoded==",decoded);
    var decoded_email=decoded.email
    console.log("===decoded=email===",decoded_email);
    RegisterModel.findOne({ email:decoded_email }, function (err, data) {
        if (err) {
            res.send(err);
            console.log("=======1=");
        } else {
            if (data) {
                console.log("=======2=");
                res.send(data)
                
            } 
        }
    });

})

 module.exports = Router;