import React from 'react'

const navbar = () => {
  return (
    <nav className='flex  justify-between text-white bg-blue-800 py-2' >
      <div className="logo">
        <span className="font-bold text-xl mx-5">Task</span>
      </div>
      <ul className="flex gap-8 mx-5  ">
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Tasks</li>
      </ul>
    </nav>
  )
}

export default navbar
