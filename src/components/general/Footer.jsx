import Link from 'next/link';

export default function Footer() {
    return (
        <div>
            <footer className="bg-[#003e3e] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#99c96f] to-[#b184e9] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">L2L</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">UO Lab2Life</h3>
                  <p className="text-sm text-white/60">University of Ottawa</p>
                </div>
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