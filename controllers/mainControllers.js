const jwt = require("jsonwebtoken");
const User = require("../database/models/User");
require("dotenv").config();

const authController = async (req, res, next) => {
  const token = req.cookies.token;
    if (token) {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({where: {id: decoded.id}});
        if(user){
            res.redirect('/dashboard');
        }
        else{
            next();
        }
    }
    else{
        next();
    }
};



const adminController = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (token) {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findOne({where: {id: decoded.id}});
            if(user){
                if(user.role === 'superAdmin' || user.role === 'admin'){
                    next();
                }
                else{
                    res.redirect('/');
                }
            }
            else{
                res.redirect('/');
            }
        }
        else{
            res.redirect('/');
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
  authController,
  adminController
};
