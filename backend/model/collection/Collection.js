const mongoose = require("mongoose")

const collectionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    imageLink: {
      type: String,
    },
    tags: {
      type: String,
    },
  },

  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
)

collectionSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "collectionId",
  localField: "_id",
})
collectionSchema.virtual("items", {
  ref: "Item",
  foreignField: "collectionId",
  localField: "_id",
})
collectionSchema.index({ name: "text", tags: "text" })
const Collection = mongoose.model("Collection", collectionSchema)

module.exports = Collection
