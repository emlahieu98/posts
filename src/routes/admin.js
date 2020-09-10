const express = require("express");
const router = express.Router();
const { post } = require("./../models/function");
const { post_alert } = require("../err/en");
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "/tmp");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now());
    },
  }),
});

//get all posts
router.get("/",async(req, res) => {
  const posts = await post.set({}, "");
  return res.render("admin/index", {posts});
});
//get 1 posts
router.post("/add", async (req, res) => {
  try {
    return res.render("index", { data });
    const post = await post.create({
      title: req.body.title,
      image: req.file.filename,
      content: req.body.content,
      description: req.body.description,
      image: image.push(req.file.filename),
    })
    return res.status(200).json({
      status: "success",
      message: post_alert.post_create,
    });

  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: post_alert.err_server,
    });
  }
});
// //post 1 posts
// router.post("/add",  async (req, res) => {
//   try {
//   await upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       console.log("A Multer error occurred when uploading.");
//     } else if (err) {
//       console.log("An unknown error occurred when uploading." + err);
//     }else {
//         const data = post.create({
//           title: req.body.title,
//           image: req.file.filename,
//           content: req.body.content,
//           description: req.body.description,
//         }); 
//       return res.redirect("/posts");
//       }
//     });
//   } catch (error) {
//     res.json(error)
//   }
// })
// //get id post
// router.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   res.json(await post.get({ _id: id }, ""));
// });
// //update id post
// router.put("/:id", async (req, res) => {
//   res.json(await post.set({ _id: req.params.id }, req.body))
// });
// //delete id post
// router.delete("/:id", async (req, res) => {
//   res.json(await post.del({ _id: req.params.id }));
// });

module.exports = router;
