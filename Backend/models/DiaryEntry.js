import mongoose from "mongoose";

const DiaryEntrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }], // Array of tags
    favorite: { type: Boolean, default: false }, // Favorite flag
  },
  { timestamps: true }
);

const DiaryEntry = mongoose.model("DiaryEntry", DiaryEntrySchema);
export default DiaryEntry;
