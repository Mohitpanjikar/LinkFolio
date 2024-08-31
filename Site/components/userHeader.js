import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const UserHeader = ({ data }) => {
    const { name, role, avatar, handle, links } = data;  // Changed `roll` to `role`
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('LinkTreeToken');
        router.push('/login');
    };

    return (
        <>
            <header className="flex flex-row justify-between items-center">
                <div className="flex flex-col md:flex-row p-5">
                    <button className="inline-flex w-full md:w-auto px-5 py-3 text-black font-bold hover:text-purple-700 hover:bg-purple-100 rounded-md mb-3 border-2 border-purple-500">
                        <img src="/svg/url.svg" className="w-6 mr-3" alt="Edit Links" />
                        Edit Links
                    </button>
                    <button className="inline-flex w-full md:w-auto px-5 py-3 text-black font-bold hover:text-purple-700 rounded-md mb-3 border-2 border-purple-500 md:ml-4">
                        <img src="/svg/user.svg" className="w-6 mr-3" alt="Edit Profile" />
                        Edit profile
                    </button>
                </div>
                <div className="flex flex-row">
                    <div className="inline-flex mr-5 text-right items-center bg-gray-200 px-5 py-2 rounded-lg">
                        <div className="text-xs md:text-md flex flex-col flex-wrap">
                            <span className="font-bold">{handle}</span>
                            <span>{role} Pack</span>  
                        </div>
                        <div className="user-img">
                            <img className="w-10 ml-5" src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png" alt="User Avatar" />
                        </div>
                    </div>
                    <img className="w-6 mr-5 cursor-pointer" src="/svg/notify.svg" alt="Notifications" />
                    <img className="w-6 mr-5 cursor-pointer" src="/svg/logout.svg" alt="Logout" onClick={handleLogout} />
                </div>
            </header>
        </>
    );
};

export default UserHeader;
