const express = require("express");
const { user } = require("../models/user/function");
const userModel = require("../models/user/userModel");
const router = express.Router();
router.get('/', async (req, res) => {
  const users = await userModel.find({ "identity.status": { $eq: "pending"}} );
 return res.render("admin/users/index", { users });
})
router.post("/resolve/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await user.set(
      { userId: id },
      { $set: { "identity.status": "completed" } });
    return res.render("admin/users/index", { users });
  } catch (error) {
    console.log(error.message);
  }
  
//  return res.render("admin/users/index", { users });
});
router.post("/refuse/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await user.set(
      { userId: id },
      {
        "identity.status": "not",
        "identity.image": [],
      }
    );
    res.json("oks");
  } catch (error) {
    console.log(error.message);
  }

  //  return res.render("admin/users/index", { users });
});



module.exports = router;
