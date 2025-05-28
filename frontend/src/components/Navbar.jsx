import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex bg-red-300 p-2 justify-between text'>
        <div className="brand mx-8">
            &lt;/&gt; Debug.Rohit 
        </div>
        <ul className='flex gap-x-6 mx-8  flex-end'>
            <li className='cursor-pointer hover:font-bold transition-all '>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>About</li>
            <li className='cursor-pointer hover:font-bold transition-all'>ContactUs</li>
        </ul>
    </nav>
    )
}

export default Navbar
