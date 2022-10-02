const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express()
const port = 3001


mongoose.connect('mongodb://localhost/logindb',function(err,res){
 if(err){
     console.log('-=-=-=-=err===-==',err);
 }else{
     console.log('----- db connected sucessfully');
 }
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

require('./routes/')(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})