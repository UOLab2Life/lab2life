'use client'

import { Heading } from '@/components/home/text'

export function Instagram() {
  return (
    <div className="relative mt-0">
      <div className="mx-auto max-w-[99.25%] bg-white px-8 py-16">
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-7xl">
            <div className="text-center">
              <Heading as="h3" className="mb-4 mt-2">
                Follow us on Instagram
              </Heading>
              <p className="font-inter-semibold mx-auto mt-4 max-w-2xl text-lg/7 text-gray-700">
                Stay updated with our latest posts and behind-the-scenes content!
              </p>
            </div>

            <div className="mt-8">
              <iframe
                src="https://www.instagram.com/uolab2life/embed"
                className="shadow-3xl h-[400px] w-full rounded-3xl border-0 shadow-lg shadow-[#003e3e]/60 sm:h-[500px] lg:h-[580px]"
                title="uOttawa Lab2Life Instagram Feed"
                allowtransparency="true"
                allowFullScreen={true}
                scrolling="no"
                frameBorder="0"
              />
            </div>

            <div className="mt-12 text-center">
              <a
                href="https://www.instagram.com/uolab2life/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter-semibold mx-auto inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:from-purple-600 hover:to-pink-600 hover:shadow-xl lg:w-1/3"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058 1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Follow @uolab2life
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
