import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import React, { useContext, useState } from 'react'
// import { NavLink } from 'react-router-dom'
import { ThemeContext } from "../ContextAPI";
import Demo from "../Pages/Demo";
const Header = () => {
 // method 1==========
  // const [IsDark, setIsDark]= useState(JSON.parse(localStorage.getItem('isDarkMode')));
  // IsDark? document.body.classList.add('dark') : document.body.classList.remove('dark')

// method 2==========
  const [IsDark, setIsDark] = useContext(ThemeContext)

  return (
    <>
      <header className={`flex justify-end p-4 ${IsDark? 'dark': " "} `}>
        <button onClick={()=>{
          setIsDark(!IsDark)
          // document.body.classList.toggle('dark')
          localStorage.setItem('isDarkMode', !IsDark)
        }}
          className="flex items-center bg-pink-700 rounded-3xl text-white py-1 px-4"> 
          {IsDark? 'Light':'Dark'} 
          {IsDark? <FaSun className="ps-2" />: <FaMoon className="ps-2" />} 
        </button>
      </header> 

      {/* <ThemeProFun>
          <Demo/> 
      </ThemeProFun> */}
    </>
  )
}

export default Header