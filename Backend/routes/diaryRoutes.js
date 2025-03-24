import express from "express";
import DiaryEntry from "../models/DiaryEntry.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a diary entry
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const newEntry = new DiaryEntry({
      user: req.user.id,
      title,
      content,
      tags: tags || [], // Store tags if provided
    });

    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all diary entries for a user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { tag, favorite } = req.query;
    let filter = { user: req.user.id };

    if (tag) filter.tags = tag; // Filter by tag
    if (favorite === "true") filter.favorite = true; // Filter by favorites

    const entries = await DiaryEntry.find(filter).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update a diary entry
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, content, tags, favorite } = req.body;
    const entry = await DiaryEntry.findById(req.params.id);

    if (!entry || entry.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    entry.title = title || entry.title;
    entry.content = content || entry.content;
    if (tags) entry.tags = tags; // Update tags
    if (favorite !== undefined) entry.favorite = favorite; // Toggle favorite

    await entry.save();
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete a diary entry
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user ID found" });
    }

    const entry = await DiaryEntry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: "Diary entry not found" });
    }

    if (entry.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await entry.deleteOne();
    res.json({ message: "Entry deleted" });
  } catch (err) {
    console.error("Error deleting diary entry:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
