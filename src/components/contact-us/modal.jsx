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
      <div className="absolute inset-0 bg-gray-400/50 backdrop-blur-[32px]" onClick={onClose} />

      <div className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
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
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h3 className="mb-2 text-2xl font-bold text-gray-900">Success!</h3>
          <p className="mb-6 text-gray-600">
            Your message has been sent successfully. We'll get back to you soon!
          </p>

          <button
            onClick={onClose}
            className="w-full rounded-full bg-green-500 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-green-600"
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
