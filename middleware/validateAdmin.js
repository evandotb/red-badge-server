const jwt = require('jsonwebtoken');
const {User} = require('../models/user');
const validateAdmin = (req,res,next) => {
    if (req.method === 'OPTIONS') {
        return next();
    } else if (req.headers.authorization) {
        const {authorization} = req.headers
        const payload = authorization ? jwt.verify(authorization,process.env.JWT_SECRET) : undefined;
        console.log("payload:",payload);
        if (payload.userType === "admin") {
            User.findOne({
                where: {id: payload.id}
            })
            .then(user => {
                req.user = user;
                console.log("REQUEST AFTER", req.user)
                next()
            })
        } else {
            res.status(401).json({
                message: "Not authorized."
            })
        }
    } else {
        res.status(401).json({
            message: "Not allowed"
        })
    }
    }
module.exports = validateAdmin;