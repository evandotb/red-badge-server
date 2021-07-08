require('dotenv').config();
const jwt = require("jsonwebtoken");
const {User} = require("../models");


const validateJWT = async (req, res, next) => {
    if (req.method == "OPTIONS") {
        next();
    } else if (
        req.headers.authorization
    ) {
        const {authorization} = req.headers;
        const payload = authorization
        ? jwt.verify(
            authorization, process.env.JWT_SECRET
        )
        : undefined;

        if(payload){
            let foundUser = await User.findOne({where: {id: payload.id}});
            console.log(foundUser);
            if(foundUser){
                req.user = foundUser;
                next();
            } else {
                res.status(400).send({message: "Not Authorized"});
            }
        } else {
            res.status(401).send({message: "Invalid token"});
        }
    } else{
        res.status(403).send({message: "Forbidden"});
    }
};

module.exports = validateJWT;