import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer aria-label = "Site Footer" className="fixed bottom-5 left-1/2 -translate-x-1/2">
      <Link traget = "_blank" href = "/" className="flex flex-row items-center">
        <img className = "hover:rotate-6" src = "/images/favicon.ico"/>
        <h5 className = 'text-white pl-3 font-bold hover:text-blue transition-all duration-400'>Try Linkfolio</h5>
      </Link>
    </footer>
  )
}

export default Footer