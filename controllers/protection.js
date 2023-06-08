// auth controller
require('dotenv').config();
const User = require('../database/models/User');
const jwt = require('jsonwebtoken');


const protection = async (req, res, next)=>{
    const token = req.cookies.token;
    if(!token){
        res.redirect('/login');
    }
    else{
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({where: {id: decoded.id}});
        if(user){
            next();
        }
        else{
            res.clearCookie('token');
            res.redirect('/login');
        }
    }
}

module.exports = protection;