import Link from 'next/link';
import React from 'react'

const SocialTree = ({Social}) => {
    const {
        facebook,
        twitter,
        instagram,
        youtube,
        linkedin,
        github
    } = social;
  return (
     <>
        <div className="social flex flex-row justify-center my-4">
        <Link className = "bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110  border-gray-700 mx-1 select-none" href={`https://facebook.com/${facebook}`} target="_blank" rel="noopener noreferrer">
            <img className = 'w-6' src="/svg/facebook.svg" alt="Facebook" />
        </Link>

        <Link className = "bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110  border-gray-700 mx-1 select-none" href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer">
            <img className = 'w-6' src="/svg/instagram.svg" alt="instagram" />
        </Link>

        <Link className = "bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110  border-gray-700 mx-1 select-none" href={`https://youtube.com/${youtube}`} target="_blank" rel="noopener noreferrer">
            <img className = 'w-6' src="/svg/youtueb.svg" alt="youtueb" />
        </Link>

        <Link className = "bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110  border-gray-700 mx-1 select-none" href={`https://github.com/${github}`} target="_blank" rel="noopener noreferrer">
            <img className = 'w-6' src="/svg/github.svg" alt="github" />
        </Link>

        <Link className = "bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110  border-gray-700 mx-1 select-none" href={`https://linkedin.com/${linkedin}`} target="_blank" rel="noopener noreferrer">
            <img className = 'w-6' src="/svg/ln.svg" alt="linkedin" />
        </Link>

        <Link className = "bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110  border-gray-700 mx-1 select-none" href={`https://twitter.com/${twitter}`} target="_blank" rel="noopener noreferrer">
            <img className = 'w-6' src="/svg/twitter.svg" alt="twitter" />
        </Link>

        </div>
     </>
  )
}

export default SocialTree