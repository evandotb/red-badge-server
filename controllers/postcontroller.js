const router = require('express').Router();
// const router = Express.Router();
const {Post} = require('../models/post');
// const {UniqueConstraintError} = require("sequelize/lib/errors");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const middleware = require('../middleware');

//create a post
router.post("/create", middleware.validateSession, async(req, res) => { const {
    title, body
} = req.body.post
const {userId} = req.user.id;
try {
    const postEntry = await Post.create({
        title, 
        body, 
        userId: userId
    });
    
    res.status(201).json({
        message: 'Post successfully created',
        postEntry
    })
} catch(err) {
    res.status(500).json({
        message: `Failed to create post: ${err}`
    })
}
});

//update post
router.put("/edit/:id", middleware.validateSession, async(req, res) => {
    const {
        title, body
    } = req.body
    
    try{
        const postUpdate = await Post.update({title, body},
            {where: {id: req.params.id}}
            )
            res.status(200).json({
                message: "Post successfully updated",
                postUpdate
            })
    } catch(err) {
        res.status(500).json({
            message: `Failed to update post: ${err}`
        }) 
    }
})


//get all posts
router.get("/", async (req,res) => {
    try {
        const allPosts = await Post.findAll();
        res.status(200).json(allPosts);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
})

//delete post
router.delete("/:id", middleware.validateSession, async (req, res) => {
    try{
      const lostPost = await Post.destroy({
        where: {id: req.params.id}
      })
        res.status(200).json({
          message: "Post successfully deleted",
          deletePost: lostPost
        })
    } catch(err){
      res.status(500).json({
        message: `Failed to delete post: ${err}`
      })
    }
  })


  //admin delete post
  router.delete("/adminDelete/:id", middleware.validateAdmin, async (req, res) => {
    try{
      const lostPost = await Post.destroy({
        where: {id: req.params.id}
      })
        res.status(200).json({
          message: "Post successfully deleted",
          deletePost: lostPost
        })
    } catch(err){
      res.status(500).json({
        message: `Failed to delete post: ${err}`
      })
    }
  })

module.exports = router;