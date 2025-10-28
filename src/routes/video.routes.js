import { Router } from "express";
import { 
    getAllVideos, 
    getVideoById, 
    createSampleVideos 
} from "../controller/video.controller.js";

const router = Router();

// Get all videos
router.get("/", getAllVideos);

// Get video by ID
router.get("/:videoId", getVideoById);

// Create sample videos (for testing/demo purposes)
router.post("/sample", createSampleVideos);

export default router;
