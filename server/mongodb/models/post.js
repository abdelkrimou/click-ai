import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

export const Post = mongoose.model("Post", postSchema);
