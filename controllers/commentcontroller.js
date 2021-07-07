const router = require('express').Router();
// const router = Express.Router();
const {Comment} = require('../models/comment');
// const {UniqueConstraintError} = require("sequelize/lib/errors");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const middleware = require('../middleware');

//create comment
router.post("/create", middleware.validateSession, async(req, res) => { const {
    comment
} = req.body.comment
const {id} = req.user;
const {post_id} = req.post;
try {
    const commentEntry = await Comment.create({
        comment, 
        user_id: id,
        post_id: post_id
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
router.put("/:id", middleware.validateSession, async(req, res) => {
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
router.delete("/:id", middleware.validateSession, async (req, res) => {
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
  router.get("/", middleware.validateSession, async(req, res) => {
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
router.delete("/admin/:id", middleware.validateAdmin, async (req, res) => {
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