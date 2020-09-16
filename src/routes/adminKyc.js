const express = require("express");
const { user } = require("../models/user/function");
const userModel = require("../models/user/userModel");
const router = express.Router();
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const limit = 2;
  const skip = (page - 1) * limit;
  const totalDocuments = await userModel
    .find({ "identity.status": { $eq: "pending" } })
    .countDocuments();
  const totalPages = Math.ceil(totalDocuments / limit);
  const range = [];
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
  const users = await userModel
    .find({ "identity.status": { $eq: "pending" } })
    .limit(limit)
    .skip(skip);
  return res.render("admin/users/index", {
    users,
    range: rangerForDot,
    page,
    totalPages,
  });
})
router.post("/resolve/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await user.set(
      { userId: id },
      { $set: { "identity.status": "completed" } });
    return res.redirect("/admin/kyc");
  } catch (error) {
    return res.render("/admin/kyc");
  }
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
     return res.redirect("/admin/kyc");
  } catch (error) {
    return res.render("/admin/kyc");
  }
});
router.post("/handle-action", async (req, res) => {
  console.log(req.body);
  switch (req.body.action) {
    case "resolve":
      await user.set(
        { userId: { $in: req.body.userIds } },
      { $set: { "identity.status": "completed" } });
   // return res.redirect("/admin/kyc");
      break;
    case "refuse":
      break;
    default:
      res.redirect("/admin/kyc")
  }
})


module.exports = router;
