import React, { useState } from 'react';
import Input from "../Input/Input";
import axios from 'axios';
import { BASEURL, API_PATHS } from "../../utils/apiPaths"; // Assuming you have this defined

const AddMusicForm = ({ onAddMusic }) => {
  const [music, setMusic] = useState({
    title: "",
    artist: "",
    description: "",
    videoUrl: "",  // Add videoUrl here
  });
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => setMusic({ ...music, [key]: value });

  const handleVideoUpload = async () => {
    if (!videoFile) return ""; // If no video file, return empty

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('video', videoFile);
      
      const response = await axios.post(
        `${BASEURL}${API_PATHS.SONG_API.UPLOAD_VIDEO}`, 
        formData, 
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setLoading(false);
      
      return response.data.videoUrl; // Assuming the server responds with a video URL
    } catch (error) {
      console.error("Error uploading video:", error);
      setLoading(false);
      return "";
    }
  };

  const handleSubmit = async () => {
    if (!videoFile) {
      alert("Please upload a video file.");
      return;
    }

    // Upload the video and get its URL
    const videoUrl = await handleVideoUpload();

    if (!videoUrl) {
      alert("Video upload failed.");
      return;
    }

    // Pass all the data to the parent component, including the videoUrl
    onAddMusic({ ...music, videoUrl });
  };

  return (
    <div>
      <Input
        value={music.title}
        onChange={({ target }) => handleChange("title", target.value)}
        label="Title"
        placeholder="Song Title"
        type="text"
      />
      <Input
        value={music.artist}
        onChange={({ target }) => handleChange("artist", target.value)}
        label="Artist"
        placeholder="Artist Name"
        type="text"
      />
      <Input
        value={music.description}
        onChange={({ target }) => handleChange("description", target.value)}
        label="Description"
        placeholder="Description"
        type="text"
      />
      <div className="mt-4">
        <label className="block mb-1 text-sm font-medium">Upload Video</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
          className="text-white bg-amber-300"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Add Song"}
        </button>
      </div>
    </div>
  );
};

export default AddMusicForm;
