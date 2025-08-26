'use client';

import { useEffect } from 'react';
//import Link from 'next/link';
import Header from '../general/Header';
import Footer from '../general/Footer'

export function Homepage() {
  useEffect(() => {
    // Import and execute the script
    import('./script.js');
  }, []);

  return (
    <div className="bg-white">
      
      <Header />

      <section id="home" className="bg-gradient-to-br from-[#003e3e] via-[#004d4d] to-[#005a5a] min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#99c96f] rounded-full opacity-10 animate-bounce"></div>
          <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-[#b184e9] rounded-full opacity-15 animate-bounce" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Welcome to 
                <span className="bg-gradient-to-r from-[#99c96f] to-[#b184e9] bg-clip-text text-transparent"> uO Lab2Life</span>
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
          <div className="text-center mb-16 opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_forwards]">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Bridging Innovation</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              At UO Lab2Life, we connect brilliant minds with real-world challenges, transforming laboratory discoveries into solutions that matter.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl">
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
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl">
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
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl">
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

      <Footer />

      <style jsx>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
