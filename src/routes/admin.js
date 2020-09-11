const express = require("express");
const router = express.Router();
const { post } = require("./../models/function");
const { post_alert } = require("../err/en");
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" +file.originalname);
    },
  }),
});
//get all posts
router.get("/",async(req, res) => {
  const posts = await post.set({}, "");
  return res.render("admin/index", {posts});
});
//get 1 posts
router.post("/add", upload.array("file-new"), async (req, res) => {
  try {
    const files = req.files;
    const newPost = {
      title: req.body.title,
      description: req.body.description,
      image: [],
      content: req.body.content,
    }
    files.map((img, index) => {
      posts.image.push(img.filename)
    })
    await post.create(newPost);
    return res.redirect("/admin/posts")
  } catch (error) {
    return res.render("/admin/posts")
  }
});

//get id post
router.get("/edit/:id", async (req, res) => {
   const { id } = req.params;
  const posts = await post.get({ _id: id }, "");
  return res.render("/admin/posts", {posts});
});
//update id post
router.post("/edit/:id", upload.array("file-new"), async (req, res) => {
  try {
    const { id } = req.params;
    const files = req.files;
    const updatePost = {
      title: req.body.title,
      description: req.body.description,
      image: [],
      content: req.body.content,
    };
    files.map((img, index) => {
      posts.image.push(img.filename);
    });
    await post.set({ _id: id }, updatePost);
    return res.redirect("/admin/posts");
  } catch (error) {
    return res.render("/admin/posts");
  }
});
// //delete id post
// router.delete("/:id", async (req, res) => {
//   res.json(await post.del({ _id: req.params.id }));
// });

module.exports = router;
//   res.json(await post.set({ _id: id }, req.body));
