const router = require('express').Router();
// const router = Express.Router();
const {User} = require('../models/user');
const {UniqueConstraintError} = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const middleware = require('../middleware');

//user register
router.post("/register", async (req, res) => {
    const {username, email, password, role} = req.body.user;
    try{
        const User = await User.create({
            username,
            email,
            password: bcrypt.hashSync(password, 15),
            role
        });

        const token = jwt.sign({id: User.id,}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 168}) //change 168 back to 24 
        

        res.status(201).json({
            message: "Successfully registered user",
            user: User,
            sessionToken: token
        });
    } catch (err){
        if(err instanceof UniqueConstraintError){
            res.status(409).json({
                message: "This email is already in use!"
            });
        } else{
            res.status(500).json({
                message: "Failed to register the user"
            
            });
        }
    }
});


//user login
router.post("/login", async (req, res) => {
    let {email, password} = req.body.user;
    let {role} = req.user.role;
    try{
        let loginUser = await User.findOne({
            where: {
                email: email,
            },
        })
        if(loginUser){
            let comparePasswords = await bcrypt.compare(password, loginUser.password);

            if(comparePasswords){

                let token = jwt.sign({id: loginUser.id, role: admin}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 168}); //change 168 back to 24

            res.status(200).json({
                user: loginUser,
                message: "Successfully logged in!",
                sessionToken: token
            })

        } else{
            res.status(401).json({
                message: "Incorrect email or password"
            })
        }} else{
            res.status(401).json({
                message: "Incorrect email or password"
            })
        }
    } catch(err){
        res.status(500).json({
            message: "Failed to log in"
        })
    }
});

//get user by id
router.get("/:id", middleware.validateSession, async (req, res) =>{
    try {
        const {id} = req.user;
        const getEmail = await User.findOne({
            where: {id: id}, include: ['user', 'admin']
        })
        res.status(200).json({
            message: 'Email Retrieved',
            email: getEmail
        })
    } catch(err) {
        res.status(500).json({
            message:`Failed to retrieve email: ${err}`
        })
    }
})


//update email
router.put('/update/:id', middleware.validateSession, async (req, res) => {
    const {email, password} = req.body.user
    try {
        const update = await User.update({email}, {where: {id: req.params.id}})
        res.status(200).json({
            message: 'Email updated',
            updateEmail: update
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error updating user!'
        })
    }
});


//delete user
router.delete('/delete/:id', middleware.validateSession, async (req, res) => {
    const {email, password} = req.body.user
    try {
        const deleteUser = await User.destroy({
            email}, {where: { id: req.params.id }
        })
        res.status(200).json({
            message: "User successfully deleted",
            deletedUser: deleteUser
        })
    } catch (err) {
        res.status(500).json({
            message: `Failed to delete user: ${err}`
        })
    }
})

//admin delete user
router.delete('/adminDelete/:id', middleware.validateAdmin, async (req, res) => {
    // const {email, password} = req.body.user
    try {
        const deleteUser = await User.destroy({
            where: { userId: req.params.id }
        })
        res.status(200).json({
            message: "User successfully deleted",
            deletedUser: deleteUser
        })
    } catch (err) {
        res.status(500).json({
            message: `Failed to delete user: ${err}`
        })
    }
})

//admin promote others to admin
router.put('/role/:id', middleware.validateAdmin, async (req, res) => {
    // const {email, password} = req.body.user
    try {
        const update = await User.update({role: 'admin'}, {where: {id: req.params.id}})
        res.status(200).json({
            message: 'Admin created',
            updateAdmin: update
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error updating admin!'
        })
    }
});

module.exports = router;