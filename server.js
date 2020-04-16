const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')

// Items severd by the api 
const items = require('./routes/api/items.js');



const app = express();

// Bodyparser Middlware parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// DB Config
const db = require('./config/keys').mongoURI;

const dbOptions = { useUnifiedTopology: true, useNewUrlParser: true}

// Connect to Mongo 

mongoose.connect(db,dbOptions)
.then(()=> console.log('MongoDB Connected...'))
.catch(err=> console.log(err));


// -----User Routes
//1.mapping url item with api folder
app.use('/api/items',items);


// Serve static assets (build folder ) if in production
if(process.env.NODE_ENV ==='production')
{
 // Set static folder
  app.use(express.static('client/build'));

  app.get('*',(req,res)=>{
     res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  })
}


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=> console.log(`Server started on port ${PORT}`));

