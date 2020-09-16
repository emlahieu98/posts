const express = require("express");
const router = express.Router();
const { post } = require("../models/post/function");
const postModel = require("../models/post/postModel");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  })

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
     file.mimetype === "image/png" ||
     file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    return cb(new Error("Only image are allowed"));
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // limit file max 5MB
  },
  fileFilter: fileFilter,
});

//get all posts
router.get("/", async (req, res) => {
    const page = parseInt(req.query.page || 1)
    const limit = 2
    const skip = (page - 1) * limit;
    const totalDocuments = await postModel.find().countDocuments();
    const totalPages = Math.ceil(totalDocuments / limit);
    const range = []
    const rangerForDot = [];
    const detal = 1;
    const left = page - detal;
    const right = page + detal;
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= left && i <= right)) {
            range.push(i);
        }
    }
    let temp;
    range.map((i) => {
        if (temp) {
            if (i - temp === 2) {
                rangerForDot.push(i - 1);
            } else if (i - temp !== 1) {
                rangerForDot.push("...");
            }
        }
        temp = i;
        rangerForDot.push(i);
    });
    const posts = await postModel.find()
        .limit(limit)
        .skip(skip);
    return res.render("admin/posts/index", {
        posts,
        range: rangerForDot,
        page,
        totalPages
    })
})
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
