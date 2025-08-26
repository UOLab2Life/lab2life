'use client';

import Link from 'next/link';
import Image from 'next/image';
import logoImage from '../../assets/homepage/images/uolab2life_logo_no_bg.png';

export default function Header() {
    return (
        <div>
            <nav className="w-full z-50 transition-all duration-300 ease-out bg-[#003e3e]/95 backdrop-blur-md border-b border-[#99c96f]/20 hover:bg-white hover:border-gray-200 group" id="navbar">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-center h-24">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <Image
                                    src={logoImage}
                                    alt="UO Lab2Life Logo"
                                    width={75}
                                    height={75}
                                    className="rounded-lg shadow-md object-cover cursor-pointer hover:opacity-80 transition-opacity"
                                />
                            </Link>
                        </div>
                        
                        <div className="hidden lg:flex items-center space-x-8 ml-auto">
                            <a href="#about" className="text-white hover:text-[#99c96f] font-medium transition-colors duration-200 text-sm group-hover:text-[#b184e9]">About Us</a>
                            <Link href="/docs" className="text-white hover:text-[#99c96f] font-medium transition-colors duration-200 text-sm group-hover:text-[#b184e9]">Docs</Link>
                            <Link href="/podcasts" className="text-white hover:text-[#99c96f] font-medium transition-colors duration-200 text-sm group-hover:text-[#b184e9]">Podcasts</Link>
                            <a href="#events" className="text-white hover:text-[#99c96f] font-medium transition-colors duration-200 text-sm group-hover:text-[#b184e9]">Events</a>
                            <a href="#contact" className="bg-[#99c96f] text-[#003e3e] px-4 py-2 rounded-lg hover:bg-[#b184e9] hover:text-white transition-colors duration-200 text-sm font-medium group-hover:bg-[#b184e9] group-hover:text-white">Contact Us</a>
                        </div>
                        
                        <button className="lg:hidden p-2 text-white group-hover:text-[#b184e9]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
}

