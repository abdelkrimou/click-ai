import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
// Import Post Model
import { Post } from "../mongodb/models/post.js";
dotenv.config();
const router = express.Router();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get Posts
router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ status: "success", data: posts });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err });
  }
});
// Create Posts
router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    if (!name || !prompt || !photo) {
      return res.status(400).json({
        status: "fail",
        message: "Name, prompt, and photo are required",
      });
    }
    const photoUrl = await cloudinary.uploader.upload(photo);
    // Create
    const newPost = await Post.create({ name, prompt, photo: photoUrl.url });
    res.status(201).json({
      status: "success",
      data: newPost,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: err });
  }
});
export default router;