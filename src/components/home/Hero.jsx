'use client';

export function Hero() {
  return (
    <div className="bg-white">
      <nav className="navbar navbar-transparent w-full z-50" id="navbar">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-6">
              <img
                src="../assets/homepage/images/uolab2life_logo_no_bg.png"
                alt="UO Lab2Life Logo"
                className="w-10 h-10 rounded-lg shadow-md object-cover"
              />
              <div className="hidden sm:block">
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-6">
              <a href="#home" className="text-white hover:text-[#99c96f] font-medium transition-colors duration-200 text-sm">Home</a>
              <a href="#about" className="text-white hover:text-[#99c96f] font-medium transition-colors duration-200 text-sm">About Us</a>
              <a href="#articles" className="text-white hover:text-[#99c96f] font-medium transition-colors duration-200 text-sm">Articles</a>
              <a href="#podcasts" className="text-white hover:text-[#99c96f] font-medium transition-colors duration-200 text-sm">Podcasts</a>
              <a href="#events" className="text-white hover:text-[#99c96f] font-medium transition-colors duration-200 text-sm">Events</a>
              <a href="#contact" className="bg-[#99c96f] text-[#003e3e] px-4 py-2 rounded-lg hover:bg-[#b184e9] hover:text-white transition-colors duration-200 text-sm font-medium">Contact Us</a>
            </div>
            
            <button className="lg:hidden p-2 text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <section id="home" className="hero-bg min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#99c96f] rounded-full opacity-10 animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-[#b184e9] rounded-full opacity-15 animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                From Lab to 
                <span className="gradient-text">Life</span>
              </h2>
              <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
                Transforming cutting-edge research at the University of Ottawa into real-world solutions that improve lives and drive innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#99c96f] hover:bg-[#b184e9] text-[#003e3e] px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105">
                  Explore Research
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-[#003e3e] px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200">
                  Watch Our Story
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-[#99c96f]/20 to-[#b184e9]/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold text-white mb-2">150+</div>
                    <div className="text-white/80">Research Projects</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold text-white mb-2">50+</div>
                    <div className="text-white/80">Industry Partners</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold text-white mb-2">25+</div>
                    <div className="text-white/80">Patents Filed</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold text-white mb-2">1000+</div>
                    <div className="text-white/80">Lives Impacted</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-[#003e3e]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 section-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Bridging Innovation</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              At UO Lab2Life, we connect brilliant minds with real-world challenges, transforming laboratory discoveries into solutions that matter.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="card-3d bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <div className="w-16 h-16 bg-[#99c96f]/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#99c96f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Accelerate Innovation</h3>
              <p className="text-white/80 leading-relaxed">
                Fast-track promising research from concept to commercialization with our comprehensive support ecosystem.
              </p>
            </div>
            
            <div className="card-3d bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <div className="w-16 h-16 bg-[#b184e9]/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#b184e9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Build Partnerships</h3>
              <p className="text-white/80 leading-relaxed">
                Connect researchers with industry leaders to create meaningful collaborations that drive real impact.
              </p>
            </div>
            
            <div className="card-3d bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <div className="w-16 h-16 bg-[#99c96f]/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#99c96f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Create Impact</h3>
              <p className="text-white/80 leading-relaxed">
                Measure success by the positive changes we create in communities, industries, and individual lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#003e3e] mb-6">Research Focus Areas</h2>
            <p className="text-xl text-[#003e3e]/80 max-w-3xl mx-auto">
              Explore the cutting-edge research domains where we're making breakthrough discoveries.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-[#99c96f]/10 to-[#99c96f]/20 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow border border-[#99c96f]/20">
              <h4 className="font-bold text-[#003e3e] mb-2">Biotechnology</h4>
              <p className="text-sm text-[#003e3e]/70">Gene therapy, drug discovery, medical devices</p>
            </div>
            <div className="bg-gradient-to-br from-[#b184e9]/10 to-[#b184e9]/20 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow border border-[#b184e9]/20">
              <h4 className="font-bold text-[#003e3e] mb-2">Clean Technology</h4>
              <p className="text-sm text-[#003e3e]/70">Renewable energy, environmental solutions</p>
            </div>
            <div className="bg-gradient-to-br from-[#99c96f]/10 to-[#99c96f]/20 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow border border-[#99c96f]/20">
              <h4 className="font-bold text-[#003e3e] mb-2">Digital Health</h4>
              <p className="text-sm text-[#003e3e]/70">AI diagnostics, telemedicine, health apps</p>
            </div>
            <div className="bg-gradient-to-br from-[#b184e9]/10 to-[#b184e9]/20 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow border border-[#b184e9]/20">
              <h4 className="font-bold text-[#003e3e] mb-2">Smart Materials</h4>
              <p className="text-sm text-[#003e3e]/70">Nanotechnology, advanced manufacturing</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-[#99c96f] to-[#b184e9]">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#003e3e] mb-6">Ready to Transform Your Research?</h2>
          <p className="text-xl text-[#003e3e]/90 mb-8 leading-relaxed">
            Join our ecosystem of innovators, researchers, and industry partners working together to bring breakthrough discoveries to market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#003e3e] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#003e3e] hover:text-white transition-colors">
              Start Your Journey
            </button>
            <button className="border-2 border-[#003e3e] text-[#003e3e] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#003e3e] hover:text-white transition-colors">
              Schedule a Meeting
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-[#003e3e] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
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
                <li><a href="#articles" className="text-white/60 hover:text-white transition-colors">Articles</a></li>
                <li><a href="#podcasts" className="text-white/60 hover:text-white transition-colors">Podcasts</a></li>
                <li><a href="#events" className="text-white/60 hover:text-white transition-colors">Events</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Get in Touch</h4>
              <div className="space-y-2 text-white/60">
                <p>University of Ottawa</p>
                <p>Ottawa, ON, Canada</p>
                <p><a href="mailto:info@lab2life.uottawa.ca" className="hover:text-white transition-colors">info@lab2life.uottawa.ca</a></p>
                <p><a href="tel:+16135625700" className="hover:text-white transition-colors">(613) 562-5700</a></p>
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

      <style jsx>{`
        .navbar {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .navbar-transparent {
          background: rgba(0, 62, 62, 0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(153, 201, 111, 0.2);
        }
        .navbar-solid {
          background: rgba(0, 62, 62, 0.98);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(153, 201, 111, 0.3);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        .hero-bg {
          background: linear-gradient(135deg, #003e3e 0%, #004d4d 25%, #005a5a 100%);
        }
        .gradient-text {
          background: linear-gradient(135deg, #99c96f, #b184e9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .section-fade-in {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .card-3d {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-3d:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>

      <script dangerouslySetInnerHTML={{
        __html: `
          // Navbar transparency effect
          const navbar = document.getElementById('navbar');
          
          navbar.addEventListener('mouseenter', function() {
            navbar.classList.remove('navbar-transparent');
            navbar.classList.add('navbar-solid');
          });
          
          navbar.addEventListener('mouseleave', function() {
            navbar.classList.remove('navbar-solid');
            navbar.classList.add('navbar-transparent');
          });

          // Smooth scrolling
          document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
              e.preventDefault();
              const targetId = this.getAttribute('href').substring(1);
              const targetElement = document.getElementById(targetId);
              if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                  top: offsetTop,
                  behavior: 'smooth'
                });
              }
            });
          });

          // Intersection Observer for animations
          const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
          };

          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0.2s';
                entry.target.classList.add('section-fade-in');
              }
            });
          }, observerOptions);

          document.querySelectorAll('.card-3d').forEach(card => {
            observer.observe(card);
          });
        `
      }} />
    </div>
  );
}