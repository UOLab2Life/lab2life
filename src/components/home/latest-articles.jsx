import { Button } from '@/components/home/button'
import { Heading } from '@/components/home/text'

export function LatestArticles() {
  return (
    <div className="mt-8 bg-white pb-14">
      <div className="px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-7xl">
          <div className="text-center">
            <Heading as="h3" className="mt-2">
              Latest Articles
            </Heading>
            <p className="mx-auto mt-4 max-w-2xl text-lg/7 font-semibold text-gray-600">
              Check out our latest articles about healthcare and medicine
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-[#003e3e]/60 ring-1 ring-black/5">
              <img
                alt="A bunch of nurses"
                className="aspect-3/2 w-full object-cover"
                src="/images/home/lncac_cover.jpg"
              />
              <div className="flex flex-1 flex-col p-8">
                <div className="flex items-center gap-2 text-sm/5 text-gray-700">
                  <svg className="h-4 w-4 text-[#003e3e]" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  February 10th, 2025
                </div>
                <div className="mt-2 text-lg/7 font-medium">
                  <a
                    href="/articles/newsletters/legal-nurse-consultant"
                    className="text-[#003e3e] transition-colors hover:text-[#003e3e]/80"
                  >
                    <span className="absolute inset-0"></span>
                    The Reality Behind Nurses in the Court
                  </a>
                </div>
                <div className="mt-2 flex-1 text-sm/6 text-gray-500">
                  The world of nurses is one of variety — from taking care of high-risk geriatric
                  patients, assisting in code blues, to even working in private clinics outside the
                  hospital...
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    alt="Maroun Tarabey"
                    className="aspect-square size-6 rounded-full object-cover ring-1 ring-[#003e3e]/30"
                    src="/images/home/maroun-tarabey.avif"
                  />
                  <div className="text-base/6 font-medium text-gray-700">Maroun Tarabey</div>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-[#003e3e]/60 ring-1 ring-black/5">
              <img
                alt="Medical Law Introduction"
                className="aspect-3/2 w-full object-cover"
                src="/images/home/proxy-big.jpg"
              />
              <div className="flex flex-1 flex-col p-8">
                <div className="flex items-center gap-2 text-sm/5 text-gray-700">
                  <svg className="h-4 w-4 text-[#003e3e]" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  February 3rd, 2025
                </div>
                <div className="mt-2 text-lg/7 font-medium">
                  <a
                    href="/articles/newsletters/medical-law-introduction"
                    className="text-[#003e3e] transition-colors hover:text-[#003e3e]/80"
                  >
                    <span className="absolute inset-0"></span>
                    From Courtrooms to Clinics Introduction to Medical Law
                  </a>
                </div>
                <div className="mt-2 flex-1 text-sm/6 text-gray-500">
                  Medical Law, often referred to as Health Law, is an interdisciplinary field of law
                  that focuses on the legislative, executive, and judicial rules and regulations
                  that govern the healthcare industry...{' '}
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    alt="Maria Bilat"
                    className="aspect-square size-6 rounded-full object-cover ring-1 ring-[#003e3e]/30"
                    src="/images/home/maria-bilat.avif"
                  />
                  <div className="text-base/6 font-medium text-gray-700">Maria Bilat</div>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-[#003e3e]/60 ring-1 ring-black/5">
              <img
                alt="Occupational Therapists and Prosthetic Adaptation"
                className="aspect-3/2 w-full object-cover"
                src="/images/home/prosthetic.png"
              />
              <div className="flex flex-1 flex-col p-8">
                <div className="flex items-center gap-2 text-sm/5 text-gray-700">
                  <svg className="h-4 w-4 text-[#003e3e]" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  November 25th, 2024
                </div>
                <div className="mt-2 text-lg/7 font-medium">
                  <a
                    href="/articles/newsletters/occupational-therapists"
                    className="text-[#003e3e] transition-colors hover:text-[#003e3e]/80"
                  >
                    <span className="absolute inset-0"></span>
                    Partners in Progress The Role of Occupational Therapists in Prosthetic
                    Adaptation
                  </a>
                </div>
                <div className="mt-2 flex-1 text-sm/6 text-gray-500">
                  Losing a limb is a life-altering experience that brings immense physical,
                  emotional, and psychological challenges. Many patients struggle with the...
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    alt="Maria Bilat"
                    className="aspect-square size-6 rounded-full object-cover ring-1 ring-[#003e3e]/30"
                    src="/images/home/maria-bilat.avif"
                  />
                  <div className="text-base/6 font-medium text-gray-700">Maria Bilat</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Button
              href="/articles"
              variant="primary"
              className="!visible mx-auto !block w-full max-w-sm text-center lg:w-1/3"
            >
              Explore All Articles
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
