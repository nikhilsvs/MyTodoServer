var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var userSchema = new Schema({

    name:{
        type:String
    },
    tasks:[{
        taskname:{
            type:String
        },
        desc:{
            type:String
        },
        isCompleted:{
            type:Boolean,
            required:true
        }
    }]
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('users',userSchema);



module.exports = User;