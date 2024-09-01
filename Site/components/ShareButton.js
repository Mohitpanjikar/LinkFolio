import { useRouter } from 'next/router'
import React from 'react'
import { toast } from 'react-toastify';

const ShareButton = () => {
    const router = useRouter();
    const copyLink = () => {
        navigator.clipboard.writeText(`https://localhost:3000/${router.query.handle}`);
        toast('Copied to Clipboard'); 
    }
  return (
    <>
    <div className = "absolute cursor-pointer top-28 left-10 bg-indigo-200 p-2 rounder-md z-10 shadow-md border-2 border-indigo-400">
        <img className = "w-4" src="/svg/share.svg" alt="share" />
    </div>
    </>
  )
}

export default ShareButton