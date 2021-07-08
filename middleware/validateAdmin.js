const jwt = require('jsonwebtoken');
const {User} = require('../models');
require('dotenv').config();

    const validateAdmin = async (req, res, next) => {
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
                let foundAdmin = await User.findOne({
                    where: {
                        id: payload.id,
                        role: 'admin'
                    }
                });
                console.log(foundAdmin);
                if(foundAdmin){
                    req.user = foundAdmin;
                    next();
                } else {
                    res.status(400).send({message: "Admin Not Authorized"});
                }
            } else {
                res.status(401).send({message: "Invalid admin token"});
            }
        } else{
            res.status(403).send({message: "Admin Forbidden"});
        }
    };

module.exports = validateAdmin;