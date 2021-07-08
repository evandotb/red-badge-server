const router = require('express').Router();
const {Comment} = require('../models');
const {Post} = require('../models')
const middleware = require('../middleware');

//create comment
router.post("/create", middleware.validateSession, async(req, res) => { const {
    comment, postId
} = req.body.comment
const {id} = req.user;
// const {postId} = postId;
try {
    const commentEntry = await Comment.create({
        comment, 
        userId: id,
        postId
    });
    
    res.status(201).json({
        message: 'Comment successfully created',
        commentEntry
    })
} catch(err) {
    res.status(500).json({
        message: `Failed to create comment: ${err}`
    })
}
});

//update comment
router.put("/edit/:id", middleware.validateSession, async(req, res) => {
    const {
        comment
    } = req.body
    
    try{
        const commentUpdate = await Comment.update({comment},
            {where: {id: req.params.id}}
            )
            res.status(200).json({
                message: "Comment successfully updated",
                commentUpdate
            })
    } catch(err) {
        res.status(500).json({
            message: `Failed to update comment: ${err}`
        }) 
    }
});

//delete comment
router.delete("/delete/:id", middleware.validateSession, async (req, res) => {
    try{
      const deleteCom = await Comment.destroy({
        where: {id: req.params.id}
      })
        res.status(200).json({
          message: "Comment successfully deleted",
          deleteCom: deleteCom
        })
    } catch(err){
      res.status(500).json({
        message: `Failed to delete comment: ${err}`
      })
    }
  });

  //get comment
  router.get("/:id", middleware.validateSession, async(req, res) => {
    const {id} = req.user;
    try {
        const findCom = await Comment.findOne({
            where: {
                owner_id: id
            }
        });

        res.status(200).json(findCom);
    } catch(err) {
        res.status(500).json()({
            error: err
        })
    }
});

//admin delete comment
router.delete("/adminDelete/:id", middleware.validateAdmin, async (req, res) => {
    try{
      const deleteCom = await Comment.destroy({
        where: {id: req.params.id}
      })
        res.status(200).json({
          message: "Comment successfully deleted",
          deleteCom: deleteCom
        })
    } catch(err){
      res.status(500).json({
        message: `Failed to delete comment: ${err}`
      })
    }
  });

module.exports = router;