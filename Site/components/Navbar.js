import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";

const NavBar = () => {
    const router = useRouter()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        document.body.classList.toggle('mobile-menu-open');
    };

    useEffect(() => {
        setMobileMenuOpen(false);
        document.body.classList.remove('mobile-menu-open');
    }, [router.asPath]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const activeClass = "text-white font-medium text-base";
    const inactiveClass = "text-gray-300 hover:text-white transition-colors text-base";

    return (
        <nav className={`fixed w-full z-50 transition-all duration-200 ${
            scrolled 
                ? 'bg-black shadow-md py-2' 
                : 'bg-black/90 backdrop-blur-sm py-4'
        }`}>
            <div className="container-custom flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-3" viewBox="0 0 512 512">
                        <rect width="512" height="512" rx="128" fill="#000000" />
                        <path d="M144 144v160h80v64h144v-64h-80V144h-144z" fill="white" />
                        <circle cx="256" cy="256" r="16" fill="white" />
                        <circle cx="180" cy="180" r="12" fill="white" />
                        <circle cx="332" cy="332" r="12" fill="white" />
                    </svg>
                    <span className="font-heading text-2xl font-bold text-white">
                        LinkFolio
                    </span>
                </Link>
                
                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/" className={router.pathname === "/" ? activeClass : inactiveClass}>
                        Home
                    </Link>
                    <Link href="/apply" className={router.pathname === "/apply" ? activeClass : inactiveClass}>
                        Apply
                    </Link>
                    <Link href="/features" className={router.pathname === "/features" ? activeClass : inactiveClass}>
                        Features
                    </Link>
                    <Link href="/dashboard" className={router.pathname === "/dashboard" ? activeClass : inactiveClass}>
                        Dashboard
                    </Link>
                    
                    <Link href="/login" className="bg-white text-black hover:bg-gray-100 px-5 py-2 rounded-lg font-medium transition-colors text-base">
                        Login
                    </Link>
                </div>
                
                {/* Mobile menu button */}
                <button 
                    onClick={toggleMobileMenu} 
                    className="md:hidden p-2 rounded-lg text-white hover:bg-gray-800 focus:outline-none"
                    aria-label="Toggle mobile menu"
                >
                    {mobileMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>
            
            {/* Mobile Menu */}
            <div className={`md:hidden absolute top-full left-0 w-full bg-black shadow-lg transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="container-custom py-4 flex flex-col space-y-2">
                    <Link 
                        href="/"
                        className={`px-4 py-2 rounded-lg text-base ${router.pathname === "/" ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800/50"}`}
                    >
                        Home
                    </Link>
                    <Link 
                        href="/apply"
                        className={`px-4 py-2 rounded-lg text-base ${router.pathname === "/apply" ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800/50"}`}
                    >
                        Apply
                    </Link>
                    <Link 
                        href="/features"
                        className={`px-4 py-2 rounded-lg text-base ${router.pathname === "/features" ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800/50"}`}
                    >
                        Features
                    </Link>
                    <Link 
                        href="/dashboard"
                        className={`px-4 py-2 rounded-lg text-base ${router.pathname === "/dashboard" ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800/50"}`}
                    >
                        Dashboard
                    </Link>
                    <div className="pt-2">
                        <Link href="/login" className="block w-full bg-white text-black hover:bg-gray-100 py-2 px-4 rounded-lg font-medium transition-colors text-center text-base">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar