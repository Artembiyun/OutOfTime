const mongoose = require('mongoose');
const UserData = require('./models/userdata')
const express = require('express');
var bodyParser = require('body-parser')
const app = express();

//connect to mongoose db
mongoose.connect('mongodb://localhost:27017/OOTdb', {useNewUrlParser: true});

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
  next();
});

// express has built in middleware
app.use(express.static('public'));  
// we are passing a middleware function to app.use
app.use(express.urlencoded({ extended: false }));
// middleware functions end
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//add new user
app.post('/newuser/:name/:password', (req, res) => {
  //create new user object
  const userData = new UserData({
    username: req.params.name,
    password: req.params.password,
    daily: [
      {
        name: "Morning",
        habits: []
      }, {
        name: "Noon",
        habits: []
      }, {
        name: "Evening",
        habits: []
      }
    ]
  });
  //save newUserObject
  userData.save()
  .then(saveduser=>{
    res.status(200).json(saveduser)
  })
  .catch(err=>console.log(err))
  res.status(404)
});

//increment history array with current date
app.post('/userupdate/:name/:date', (req, res) => {
  //create newdate object
  newdate = {date: req.params.date, percent:0}
  //find and push history for given user
  UserData.findOneAndUpdate({username:req.params.name}, {$push: {history: newdate}})
  .then(
    res.status(200).json("sucess")
  )
  .catch(
    res.json("failure")
  );
})

//update the percentage of date given 
app.post('/userpercent/:name/:date/:percent', (req, res) => {
  //find the user entry by name
  UserData.findOne({username: req.params.name})
    .then(response => {
        //then find the history array
        let history = response.history;
        //match history array date to get index
        let output = history.findIndex((day) => req.params.date == day.date)
        .then(
          res.status(200).json("sucess, found history item")
        )
        .catch(
          res.json("error, failed to find history item")
        );
        //update the found index of history array with req.params
        response.history[output] = {date: req.params.date, percent: req.params.percent};
      });
 })

 //update habits
 app.post('/habits/:name/:habits', (req, res) => {
    //find user entry by name
    UserData.findOne({username: req.params.name})
      .then(response => {});
 })

//get user info
app.get('/userinfo/:name', (req, res) => {
  UserData.findOne({username: req.params.name})
  .then(response => res.json(response))
})

//check mongoose connection
const connection = mongoose.connection;
connection.on('open', ()=> {
    console.log('mongoose connected!')
})

//confirm server 8080 is listening 
app.listen(8080, () => {
  console.log('server listening on 8080');
});