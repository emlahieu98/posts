const express = require("express");
const router = express.Router();
const { post } = require("./../models/function");
const mongoose = require("mongoose");
const postes = mongoose.model("Post")
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
  return res.render("admin/posts/index", {posts});
});
//add posts
router.get("/add",async(req, res) => {
   const posts = await post.set({}, "");
  return res.render("admin/posts/add", { posts });
});
//add 1 posts
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
      newPost.image.push(img.filename)
    })
    await post.create(newPost);
    return res.redirect("/admin/posts")
  } catch (error) {
    return res.render("admin/posts/index")
  }
});
//get id post
router.get("/edit/:id", async (req, res) => {
   const { id } = req.params;
  const posts = await post.get({ _id: id }, "");
 return res.render("admin/posts/edit", { posts });

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
    }
      files.map((img, index) => {
        updatePost.image.push(img.filename);
       });
    // }
     await post.set({ _id: id }, updatePost);
    return res.redirect("/admin/posts")
  } catch (error) {
    return res.render("admin/posts/index")
  }
});


//delete id post
router.post("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await post.del({ _id: id });
  return res.redirect("/admin/posts")
});

module.exports = router;
