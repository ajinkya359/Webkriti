const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');

var db = knex({
    client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'ajinkya5555',
    database : 'webkriti'
  }
})

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.set("view-engine","ejs");
app.get('/',(req,res)=>{
    res.render('index.ejs');
})
app.get('/login',(req,res)=>{
    res.render('login.ejs');
})
app.post('/login',(req,res)=>{
    console.log(req.body);
    res.json("your are logged in");
})
app.get('/register',(req,res)=>{
    res.render('register.ejs')
})
app.post('/register',(req,res)=>{
    var n=req.body.name;
    var e=req.body.email; 
    var p=req.body.password;
    console.log(req.body);
    db('users')
    .returning('*')
    .insert({
        // id:2,
        name:n ,
        email:e,
        password:p,
    
    }).then(response=>res.render('login.ejs'))
    .catch(err=>res.status(404).json("oops cant register that user"))
    // .catch(err,()=>{res.status(404).json("cant register")})
    // console.log(db.users[0]);
    // console.log(name);
    // res.render('login.ejs');
})
app.listen(3000,()=>{
    console.log("app is running");
});