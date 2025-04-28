const Song = require("../models/songModel");

const createSong = async (req, res) => {
    
    try {
        const { title, artist, description, videoUrl } = req.body;

        if ( !title || !artist || !description || !videoUrl) {
            res.status(400).json({ message: "All fields are required" });
        }

        const newSong = new Song({
            title,
            artist,
            description,
            videoUrl
        });
        await newSong.save();
        res.status(200).json({ message: "The new song just saved sucessfully" })
    } catch (error) {
        res.status(500).json({ 
            message: "Internal server error: ", 
            error: error.message
        });       
    }
}

const getAllSongs = async (req, res) => {
    try {
        const song = await Song.find();
        if (song.length === 0) {
            return res.status(404).json({
                message: "No song found"
            })
        }
        res.status(200).json(song)
    } catch (error) {
        res.status(500).json({ 
            message: "Internal server error: ", 
            error: error.message
        });
    }
};

const getSingleSong = async (req, res) => {
    try {
        const { id } = req.params
        const song = await Song.findById(id);
        if (!song) {
            res.status(404).json({
                message: "No song found"
            })
        }
        res.status(200).json(song)
    } catch (error) {
        res.status(500).json({ 
            message: "Internal server error: ", 
            error: error.message
        });
    }
};

const updateSong = async (req, res) => {
    try {
        const { id } = req.params

        const updatedData = req.body;  // Get the data to update from the request body

        const updated = await Song.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updated) {
            res.status(404).json({
                message: "No song found"
            })
        };
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ 
            message: "Internal server error: ", 
            error: error.message
        });
    }
};

const deleteSongs = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Song.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({
                message: "No song found"
            });
        }

        res.status(200).json({ message: "Song deleted successfully" });
    } catch (error) {
        res.status(500).json({ 
            message: "Internal server error: ", 
            error: error.message
        });
    }
};

const likeSong = async (req, res) => {
    try {
        const { id } = req.params;
        const song = await Song.findById(id);
        if (!song) {
            return res.status(404).json({ message: "Song not found" });
        }

        song.likes += 1;
        await song.save();

        res.status(200).json({ message: "Song liked successfully", likes: song.likes });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = {
    createSong,
    getAllSongs,
    likeSong,
    getSingleSong,
    updateSong,
    deleteSongs
};