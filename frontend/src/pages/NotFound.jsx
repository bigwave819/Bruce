import React from 'react'
import NotFoundImage from "../assets/404Notfound.png"
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-screen bg-black'>
      <img 
      src={NotFoundImage} 
      alt={NotFoundImage} 
      className='w-1/2 h-80'
      />
      <h2 className='text-3xl text text-[#26afa8] mb-5 font-medium'>
        OOPS! PAGE NOT FOUND
      </h2>

      <Link to="/" className='px-4 py-2 rounded bg-[#65758B] text-white'>Back Home</Link>
    </div>
  )
}

export default NotFound