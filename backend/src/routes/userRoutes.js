import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import { upload } from "../utils/storage.js";
import { uploadAvatar } from "../controllers/userController.js";

const router = Router();

router.post(
  "/upload-avatar",
  authMiddleware,
  upload.single("avatar"),
  uploadAvatar
);

router.get("/", (req, res) => {
  res.status(200).json({ msg: "okay" });
});
export default router;
