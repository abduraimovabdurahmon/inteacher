const User = require("../database/models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();




module.exports = async (token)=>{
    try {

        if(!token){
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.id, {attributes:['id', 'name', 'email', 'role', "image", "username", "about", "phone", "location"]});

        return user.dataValues;

    } catch (error) {
        console.log(error);
    }
}