var express = require('express');
var bodyParser = require('body-parser');
var authenticate = require('../authenticate');
var User = require('../models/users');
const router = require('.');

var taskRouter = express.Router();

taskRouter.use(bodyParser.json());
taskRouter.route('/')

.get(authenticate.verifyUser,(req,res,next)=>{

    User.findById(req.user._id,(err,result)=>{
        if(err){
            res.statusCode = 500;
            res.setHeader('Content-Type','application/json');
            res.json({success : false, message:"Error occured while finding user"});
        }

        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(result.tasks);
    });

})
.delete(authenticate.verifyUser,(req,res,next)=>{

    User.findById(req.user._id,(err,result)=>{
        if(err){
            res.statusCode = 500;
            res.setHeader('Content-Type','application/json');
            res.json({success : false, message:"Error occured while finding user"});
        }

        result.tasks = [];
        result.save();
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(result.tasks);
    });

})
.post(authenticate.verifyUser,(req,res)=>{

    User.findById(req.user._id,(err,result)=>{
        if(err){
            res.statusCode = 500;
            res.setHeader('Content-Type','application/json');
            res.json({success : false, message:"Error occured while finding user"});
        }

        result.tasks.push(req.body);
        result.save();
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(result.tasks);
    });

})
taskRouter.route('/:id')
.put(authenticate.verifyUser,(req,res)=>{

    
    User.findById(req.user._id,(err,response)=>{
        console.log(JSON.stringify(response));
        var idx = response.tasks.map(function(item) { return item._id; }).indexOf(req.params.id);
        console.log(JSON.stringify(response.tasks[idx]));
        for(let [key,value] in Object.entries(response.tasks[idx])){
            console.log(key + " : " + value);
        }
        response.save();
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(response.tasks);
    })

})
.delete(authenticate.verifyUser,(req,res)=>{

    User.findById(req.user._id,(err,response)=>{

        console.log(JSON.stringify(response));
        var removeIndex = response.tasks.map(function(item) { return item._id; }).indexOf(req.params.id);
        response.tasks.splice(removeIndex,1);
        response.save();
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(response.tasks);
        
    })

})

module.exports = taskRouter;