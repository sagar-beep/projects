const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
//const path = require('path');
const morgan = require("morgan");
const api = require('./src/router/api');
const basicdetails = require('./src/router/Basicdetail');
const contactagent= require('./src/router/contactagent');
const mongoose = require('mongoose');
const db = "mongodb://localhost:27017/newdatabase";
const port = 3000;


mongoose.connect(db,{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true}, function(err){
    if(err){
        console.error('Error! ' + err)
    } else {
      console.log('Connected to mongodb')      
    }
});



const app = express();
app.use(cors({ origin: "*" }));
app.use('/uploads',express.static('uploads'));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', api);
app.use('/api', basicdetails);
app.use('/', contactagent);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});



app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});