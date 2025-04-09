import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL, API_PATHS } from "../utils/apiPaths";
import Modal from "../components/Modal";
import AddMusicForm from "../components/song/AddMusicForm";
import { LuPlus } from "react-icons/lu";
import { AiOutlineLike, AiFillHeart, AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";

const Music = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAddMusicModal, setOpenAddMusicModal] = useState(false);
  const [likedSongs, setLikedSongs] = useState({});

  // Fetch all songs
  const fetchAllSongs = async () => {
    try {
      const response = await axios.get(
        `${BASEURL}${API_PATHS.SONG_API.GET_ALL_SONG}`
      );
      setSongs(response.data);
    } catch (error) {
      console.error("Error fetching songs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle the like functionality for songs
  const handleLike = async (songId) => {
    try {
      await axios.put(`${BASEURL}${API_PATHS.SONG_API.LIKE_SONG(songId)}`);
      setLikedSongs((prevLikes) => ({ ...prevLikes, [songId]: true }));
      fetchAllSongs();
    } catch (error) {
      console.error("Error liking the song:", error);
      toast.error("Failed to like the song.");
    }
  };

  // Handle the delete functionality for songs
  const handleDelete = async (songId) => {
    try {
      await axios.delete(`${BASEURL}${API_PATHS.SONG_API.DELETE_SONG(songId)}`);
      toast.success("Song deleted successfully.");
      fetchAllSongs();  // Refresh song list after deletion
    } catch (error) {
      console.error("Error deleting the song:", error);
      toast.error("Failed to delete song.");
    }
  };

  // Add a new song
  const handleAddMusic = async (music) => {
    const { title, artist, description, videoUrl } = music;

    // Validation to make sure all fields are filled
    if (!title || !artist || !description || !videoUrl) {
      toast.error("All fields are required.");
      return;
    }

    try {
      await axios.post(`${BASEURL}${API_PATHS.SONG_API.ADD_SONG}`, {
        title,
        artist,
        description,
        videoUrl, // Use videoUrl here
      });

      setOpenAddMusicModal(false);
      toast.success("Song added successfully.");
      fetchAllSongs();
    } catch (error) {
      console.error("Error adding Song:", error);
      toast.error("Failed to add song.");
    }
  };

  // Fetch songs on component mount
  useEffect(() => {
    fetchAllSongs();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading songs...</p>;
  }

  return (
    <div className="w-full min-h-screen mx-auto px-4 py-6 bg-black text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">All Songs</h2>

      {/* Modal for adding music */}
      <Modal
        isOpen={openAddMusicModal}
        onClose={() => setOpenAddMusicModal(false)}
        title="Add Music"
      >
        <AddMusicForm onAddMusic={handleAddMusic} />
      </Modal>

      {/* Button to open Add Music Modal */}
      <div className="flex justify-start mb-6">
        <button
          className="add-btn flex items-center gap-1 bg-purple-700 text-white px-4 py-2 rounded-md"
          onClick={() => setOpenAddMusicModal(true)}
        >
          <LuPlus className="text-lg" />
          Add Music
        </button>
      </div>

      {/* Container for songs with scrollable area */}
      <div className="overflow-y-auto max-h-[calc(100vh-180px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {songs.map((song) => (
            <div
              key={song._id}
              className="bg-gray-900 rounded-xl shadow-md p-4 flex flex-col justify-between"
            >
              <h3 className="text-xl font-semibold text-blue-500">{song.title}</h3>
              <p className="text-gray-400 font-medium">By {song.artist}</p>
              <p className="text-sm text-gray-500 mt-1">{song.description}</p>

              {/* Updated to use audio with height */}
              <video
                src={song.videoUrl}
                controls
                className="w-full h-64 mt-3 rounded-lg"
              ></video>

              <div className="mt-4 flex items-center justify-between">
                <button
                  className={`flex items-center gap-2 text-sm cursor-pointer transition ${
                    likedSongs[song._id] ? "text-pink-500" : "text-purple-400"
                  }`}
                  onClick={() => handleLike(song._id)}
                  disabled={likedSongs[song._id]}
                >
                  {likedSongs[song._id] ? (
                    <AiFillHeart className="text-lg" />
                  ) : (
                    <AiOutlineLike className="text-lg" />
                  )}
                  {likedSongs[song._id] ? "Liked" : "Like"}
                </button>
                <span className="text-xs text-gray-400">
                  {song.likes || 0} likes
                </span>
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(song._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <AiOutlineDelete className="text-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Music;
