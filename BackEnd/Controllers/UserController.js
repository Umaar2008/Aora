const User = require('../Models/UserModel')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
var jwt = require('jsonwebtoken');




const CreateUser = asyncHandler(async(req ,res) => {
    
    const {UserName , UserEmail ,UserPassword} = req.body
    if (!UserName ||  !UserEmail || !UserPassword ) {
        res.status(400)
        throw new Error ('All Fields Are Mandatory to create a User')
    }
    else if (await User.findOne({ UserEmail })) {
        res.status(400).json({ error: 'User Already Exists' }); 
        return;
    }
    
    else {

        const hashedPassword = await bcrypt.hash(UserPassword , 10)
        const user = await User.create({
            UserName ,
            UserEmail,
            UserPassword : hashedPassword ,
            
        })
        const accessToken = jwt.sign({
            user: {
                UserName: user.UserName,
                UserEmail: user.UserEmail,
                id: user.id
            }
        }, "umar123", {expiresIn: '10d'})
        res.status(201).json({
      
            accessToken,
        });
    }
}); 

const LoginUser = asyncHandler(async(req, res) => {
    const {UserEmail , UserPassword} = req.body
    if (!UserEmail || !UserPassword ) {
        res.status(400).json({error :'All Fields Are Mandatory to Login'})
    }
    const user = await User.findOne({UserEmail})

    
    if (user && (await bcrypt.compare(UserPassword, user.UserPassword))) {
        const accessToken = jwt.sign({
            user: {
                UserName: user.UserName,
                UserEmail: user.UserEmail,
                id: user.id
            }
        }, "umar123", {expiresIn: '10d'})
        res.status(200).json({accessToken})
    } else if (!user){
        res.status(400).json({ error: 'User does not Exists' }); 

    }
    else if (!(await bcrypt.compare(UserPassword, user.UserPassword))){
        res.status(400).json({ error: 'Wrong Password' });
    }
});

const LogoutUser  = (req, res) => {
    res.status(200).json({message: 'Logout User'})
}

module.exports = {CreateUser , LoginUser , LogoutUser}