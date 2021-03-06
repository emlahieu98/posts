const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost/post",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  function (err) {
    if (err) {
      console.log("Connect fail");
    } else {
      console.log("Connect success with db.post");
    }
  }
);
const Schema = mongoose.Schema;

const schemaPost = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { type: [], default:"default.jpg" },
    content: { type: String, default: "" },
    timestamp: { type: Number, default: Date.now() },
  },
  {
    versionKey: false,
  }
);
const Post = mongoose.model("Post", schemaPost, "posts");
module.exports = Post;
