const router = require('express').Router();
const {Post} = require('../models');
const {Comment} = require('../models');
const middleware = require('../middleware');

//create a comment
router.post("/create", middleware.validateSession, async(req, res) => { const {
    title, body
} = req.body.post
const {id} = req.user;
try {
    const postEntry = await Post.create({
        title, 
        body, 
        userId: id
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
    const {id} = req.user.id;
    try{
        const postUpdate = await Post.update({title, body},
            {where: {id: req.params.id, userId: id}}
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
router.delete("/delete/:id", middleware.validateSession, async (req, res) => {
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
      const adminDelete = await Post.destroy({
        where: {id: req.params.id}
      })
        res.status(200).json({
          message: "Post successfully deleted by admin",
          deletePost: adminDelete
        })
    } catch(err){
      res.status(500).json({
        message: `Admin Failed to delete post: ${err}`
      })
    }
  })

module.exports = router;