const express = require("express");
const {
  createSong,
  getAllSongs,
  getSingleSong,
  updateSong,
  deleteSongs,
  likeSong
} = require("../controllers/songController");
const upload = require("../middleware/songUploadMiddleware");

const router = express.Router();

router.post("/add", createSong);
router.get("/", getAllSongs);
router.get("/:id", getSingleSong);
router.put("/:id", updateSong);
router.delete("/:id", deleteSongs);
router.put("/like/:id", likeSong);

router.post('/upload-video', upload.single("video"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ 
            success: false,
            message: "No file uploaded" 
        });
    }
    
    const videoUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
    }`;
    
    res.status(200).json({ 
        success: true,
        videoUrl 
    });
});

module.exports = router;