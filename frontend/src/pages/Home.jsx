import React from 'react';
import Melodie from "../assets/bruce.webp"

const Home = () => {
  return (
    <>
      <div className="w-full min-h-screen background text-white flex flex-col items-center justify-center space-y-6 px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-medium">
          Welcome Here. You want to <br className="hidden md:block" /> explore more? Click below
        </h2>
        <button className="px-6 py-3 bg-[#26afa8] hover:bg-[#1f8d88] transition-colors cursor-pointer` rounded text-lg">
          Explore More
        </button>
      </div>

      <div className="w-full px-4 py-12 bg-black">
        <div className="bg-gray-800 rounded-lg flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16 p-6 md:p-10 text-white max-w-6xl mx-auto">
          <div className="w-full md:w-1/2 flex justify-center">
            <img 
              src={Melodie} 
              alt="Bruce Melodie"
              className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
            <h1 className="font-bold text-2xl md:text-3xl">Bruce Melodie</h1>
            <p className="text-base md:text-lg font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Sapiente molestiae tempora praesentium quia hic dolorem 
              expedita nemo ad soluta officia magnam reiciendis 
              accusantium similique optio tenetur cum doloremque, 
              labore nisi.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
