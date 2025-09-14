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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 animate-bounce text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{
                animation: 'checkmark 0.6s ease-in-out',
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
                  animation: 'drawCheckmark 0.6s ease-in-out forwards',
                }}
              />
            </svg>
          </div>

          <h3 className="mb-2 text-2xl font-bold text-[#003e3e]">Success!</h3>
          <p className="mb-6 text-[#003e3e]">
            Thank you for signing up as a uOttawa Lab2Life general member!
          </p>

          <button
            onClick={onClose}
            className="w-32 rounded-full bg-red-500 px-4 py-2 font-semibold text-white shadow-md transition-all duration-300 hover:border hover:border-red-500 hover:bg-white hover:text-red-500"
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
