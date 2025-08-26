import Link from 'next/link';
import Image from 'next/image';
import logoImage from '../../assets/homepage/images/uolab2life_logo_no_bg.png';

export default function Footer() {
    return (
        <div>
            <footer className="bg-[#003e3e] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <Link href="/" className="flex items-center">
                  <Image
                    src={logoImage}
                    alt="UO Lab2Life Logo"
                    width={48}
                    height={48}
                    className="rounded-lg shadow-md object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </Link>
                <div>
                  <h3 className="text-xl font-bold">uOttawa Lab2Life</h3>
                  <p className="text-sm text-white/60">University of Ottawa</p>
                </div>
              </div>
              <div className="flex space-x-4 mb-6">
              <a href="https://www.instagram.com/uolab2life/?hl=en" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="https://www.linkedin.com/company/uolab2life/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href="www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="x.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M4 4l16 16M20 4L4 20"/>
                  </svg>
                  <span className="sr-only">X (Twitter)</span>
                </a>
                
              </div>
              <p className="text-white/80 max-w-md leading-relaxed">
                Bridging the gap between groundbreaking research and real-world impact. Transforming discoveries into solutions that improve lives.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-white/60 hover:text-white transition-colors">About Us</a></li>
                <li><Link href="/docs" className="text-white/60 hover:text-white transition-colors">Docs</Link></li>
                <li><Link href="/podcasts" className="text-white/60 hover:text-white transition-colors">Podcasts</Link></li>
                <li><a href="#events" className="text-white/60 hover:text-white transition-colors">Events</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Get in Touch!</h4>
              <div className="space-y-2 text-white/60">
                <p>University of Ottawa</p>
                <p>Ottawa, ON, Canada</p>
                <p><a href="mailto:uolab2life@gmail.com" className="hover:text-white transition-colors">uolab2life@gmail.com</a></p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60">&copy; 2025 UO Lab2Life. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/60 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
        </div>
    );
}