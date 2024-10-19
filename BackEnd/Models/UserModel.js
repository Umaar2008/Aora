const mongoose = require("mongoose")

const Userschema = new mongoose.Schema({
    UserName : {
        type : String,
        required : true 
    } ,
    UserEmail : {
        type : String ,
        required : true
    } ,
    UserPassword : {
        type : String ,
        required : true 
    }
} 
)

module.exports = mongoose.model('User' , Userschema)