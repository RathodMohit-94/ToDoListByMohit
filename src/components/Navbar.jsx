import React from 'react'
import logo from '../assets/1.png'
import githublogo from '../assets/github.svg'


const Navbar = () => {
  return (
    <div className='flex justify-between border-solid border-white   bg-gradient-to-r to-blue-800 from-blue-400 '>
      {/* Logo */}
        <div className='w-12 bg-transparent  justify-center items-center m-2  '>
            <a href="/">
            <img className='rounded-lg' src={logo} alt="Logo" /></a>
        </div>
    {/* Side Bar */}
        <div className=' font-edu-nsw-act-hand flex gap-8 m-2 p-2 flex-row text-wrap text-center text-xl font-bold text-white '>
            <a className='hover:bg-slate-200 pt-1 h-8 duration-500 hover:shadow-lg transition-all hover:text-black hover:rounded-md w-8' href="https://github.com/RathodMohit-94" target='_blank'><img className='w-8 h-8  bg-white rounded-full' src={githublogo} alt="GitHubLink" /></a>
            {/* <a className='hover:bg-slate-200 pt-1 duration-500 hover:shadow-lg transition-all hover:text-black hover:rounded-md h-10 w-16' href="/">Login</a> */}
        </div>
    </div>
  )
}

export default Navbar