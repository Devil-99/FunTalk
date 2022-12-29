const User = require("../model/userModel");

module.exports.registerMiddleware = async (req,res,next)=>{
    try{
        const {username, email, password} = req.body;
        const usernameCheck = await User.findOne({username});
        if(usernameCheck)
            return res.json({msg:"Username is already used", status: false});
        const emailCheck = await User.findOne({email});
        if(emailCheck)
            return res.json({msg:"Email is already used", status: false});

        const user = await User.create({username,email,password});
        return res.json({status:true , user});
    }
    catch(exception){
        next(exception);
    }
};