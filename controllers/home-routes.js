const router = require("express").Router();
const { Post, User, Comment } = require("../models");

// get all posts to place at the homepage
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "post_url", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("homepage", {
        posts,
      });
      //   const posts = dbPostData.map((post) => post.get({ plain: true }));
      //   res.render("homepage", {
      //     posts,
      //     loggedIn: req.session.loggedIn,
      //   });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
