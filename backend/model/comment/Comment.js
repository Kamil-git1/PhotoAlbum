const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema(
  {
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: [true, "Collection is required"],
    },
    user: {
      type: String,
      required: [true, "User is required"],
    },
    description: {
      type: String,
      required: [true, "Comment is required"],
    },
  },
  {
    timestamps: true,
  }
)

const Comment = mongoose.model("Comment", commentSchema)
module.exports = Comment
