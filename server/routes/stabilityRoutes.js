import express from "express";
import * as dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Hello from Stability");
});

router.route("/generate-image").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await axios({
      method: "POST",
      url: process.env.STABILITY_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
      },
      data: {
        text_prompts: [{ text: prompt }],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        samples: 1,
        steps: 30,
      },
    });

    res.json({ image: response.data.artifacts[0].base64 });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: "Failed to generate image" });
  }
});
export default router;
