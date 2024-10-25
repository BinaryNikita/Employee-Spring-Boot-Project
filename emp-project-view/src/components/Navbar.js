import React from 'react'

const Navbar = () => {
  return (
<div className="App p-2 flex justify-between m-0 text-white">
    <h1 className="text-xl font-bold text-red-100 ml-4">
      <span role="img" aria-label="Service Incharge">
        👩🏼‍💼
      </span>{' '}
      EM Service
    </h1>
    <nav className="nav-bar flex space-x-4 pt-2 pr-2 mr-4">
      <a
        href="/"
        aria-label="Go to Home"
        className="hover:text-gray-600"
      >
        Home
      </a>
      <a
        href="/profile"
        aria-label="Go to Profile"
        className="hover:text-gray-600"
      >
        Profile
      </a>
      <a
        href="/logout"
        aria-label="Logout"
        className="hover:text-gray-600"
      >
        Logout
      </a>
    </nav>
  </div>  )
}

export default Navbar