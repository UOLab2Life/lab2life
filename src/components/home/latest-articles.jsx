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
            <div className="relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-black/5" style={{boxShadow: '0 10px 25px -5px rgba(0, 62, 62, 0.1), 0 4px 6px -2px rgba(0, 62, 62, 0.05)'}}>
              <img
                alt="A bunch of nurses"
                className="aspect-3/2 w-full object-cover"
                src="/images/home/lncac_cover.jpg"
              />
              <div className="flex flex-1 flex-col p-8">
                <div className="flex items-center gap-2 text-sm/5 text-gray-700">
                  <svg className="w-4 h-4 text-[#003e3e]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  February 10th, 2025
                </div>
                <div className="mt-2 text-lg/7 font-medium">
                  <a href="/articles/newsletters/legal-nurse-consultant" className="text-[#003e3e] hover:text-[#003e3e]/80 transition-colors">
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
                  {/* <img 
                    alt="" 
                    className="aspect-square size-6 rounded-full object-cover" 
                    src="https://cdn.sanity.io/images/ssqh4ksj/production/cd1ee59e9e4c2ff30c303de6c7d1066c057419d5-7952x5304.jpg?rect=2370,0,5304,5304&w=64&h=64&auto=format"
                  /> */}
                  <div className="text-base/6 text-gray-700 font-medium">Author: Maroun Tarabey</div>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-black/5" style={{boxShadow: '0 10px 25px -5px rgba(0, 62, 62, 0.1), 0 4px 6px -2px rgba(0, 62, 62, 0.05)'}}>
              <img
                alt="Medical Law Introduction"
                className="aspect-3/2 w-full object-cover"
                src="/images/home/proxy-big.jpg"
              />
              <div className="flex flex-1 flex-col p-8">
                <div className="flex items-center gap-2 text-sm/5 text-gray-700">
                  <svg className="w-4 h-4 text-[#003e3e]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  February 3rd, 2025
                </div>
                <div className="mt-2 text-lg/7 font-medium">
                  <a href="/articles/newsletters/medical-law-introduction" className="text-[#003e3e] hover:text-[#003e3e]/80 transition-colors">
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
                  {/* <img 
                    alt="" 
                    className="aspect-square size-6 rounded-full object-cover" 
                    src="https://cdn.sanity.io/images/ssqh4ksj/production/2ec246be46d86c5d72e227e416b8de35f45fcd83-3569x5354.jpg?rect=0,417,3569,3569&w=64&h=64&auto=format"
                  /> */}
                  <div className="text-base/6 text-gray-700 font-medium">Author: Maria Bilat</div>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-black/5" style={{boxShadow: '0 10px 25px -5px rgba(0, 62, 62, 0.1), 0 4px 6px -2px rgba(0, 62, 62, 0.05)'}}>
              <img
                alt="Occupational Therapists and Prosthetic Adaptation"
                className="aspect-3/2 w-full object-cover"
                src="/images/home/prosthetic.png"
              />
              <div className="flex flex-1 flex-col p-8">
                <div className="flex items-center gap-2 text-sm/5 text-gray-700">
                  <svg className="w-4 h-4 text-[#003e3e]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  November 25th, 2024
                </div>
                <div className="mt-2 text-lg/7 font-medium">
                  <a href="/articles/newsletters/occupational-therapists" className="text-[#003e3e] hover:text-[#003e3e]/80 transition-colors">
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
                  {/* <img 
                    alt="" 
                    className="aspect-square size-6 rounded-full object-cover" 
                    src="https://cdn.sanity.io/images/ssqh4ksj/production/091dfa4bca0cf5699523de10d477ed260bf04eca-4928x3264.jpg?rect=832,0,3264,3264&w=64&h=64&auto=format"
                  /> */}
                  <div className="text-base/6 text-gray-700 font-medium">Author: Maria Bilat</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Button href="/docs" variant="primary" className="!visible !block w-1/2 text-center">
              Explore All Articles
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
