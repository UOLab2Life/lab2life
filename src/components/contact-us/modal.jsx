'use client'

import { useEffect } from 'react'

export function SuccessModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 mx-4 max-w-md w-full">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg 
              className="h-8 w-8 text-green-600 animate-bounce" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              style={{
                animation: 'checkmark 0.6s ease-in-out'
              }}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M5 13l4 4L19 7" 
                style={{
                  strokeDasharray: '20',
                  strokeDashoffset: '20',
                  animation: 'drawCheckmark 0.6s ease-in-out forwards'
                }}
              />
            </svg>
          </div>
          
          <h3 className="text-2xl font-bold text-[#003e3e] mb-2">
            Success!
          </h3>
          <p className="text-[#003e3e] mb-6">
            Your message has been sent successfully. We'll get back to you soon!
          </p>
          
          <button
            onClick={onClose}
            className="w-32 bg-red-500 hover:bg-white hover:border hover:border-red-500 hover:text-red-500 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 shadow-md"
          >
            Close
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes checkmark {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes drawCheckmark {
          0% {
            stroke-dashoffset: 20;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  )
}