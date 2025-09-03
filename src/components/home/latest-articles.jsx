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
            <div className="relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-md ring-1 shadow-black/5 ring-black/5">
              <img
                alt="A bunch of nurses"
                className="aspect-3/2 w-full object-cover"
                src="/images/home/lncac_cover.jpg"
              />
              <div className="flex flex-1 flex-col p-8">
                <div className="text-sm/5 text-gray-700">February 10th, 2025</div>
                <div className="mt-2 text-lg/7 font-medium">
                  <a href="/docs/newsletters/legal-nurse-consultant">
                    <span className="absolute inset-0 text-2xl"></span>
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
                  <div className="text-sm/5 text-gray-700">Author: Maroun Tarabey</div>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-md ring-1 shadow-black/5 ring-black/5">
              <img
                alt="Medical Law Introduction"
                className="aspect-3/2 w-full object-cover"
                src="/images/home/proxy-big.jpg"
              />
              <div className="flex flex-1 flex-col p-8">
                <div className="text-sm/5 text-gray-700">February 3rd, 2025</div>
                <div className="mt-2 text-lg/7 font-medium">
                  <a href="/docs/newsletters/medical-law-introduction">
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
                  <div className="text-sm/5 text-gray-700">Author: Maria Bilat</div>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-md ring-1 shadow-black/5 ring-black/5">
              <img
                alt="Occupational Therapists and Prosthetic Adaptation"
                className="aspect-3/2 w-full object-cover"
                src="/images/home/prosthetic.png"
              />
              <div className="flex flex-1 flex-col p-8">
                <div className="text-sm/5 text-gray-700">November 25th, 2024</div>
                <div className="mt-2 text-lg/7 font-medium">
                  <a href="/docs/newsletters/occupational-therapists">
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
                  <div className="text-sm/5 text-gray-700">Author: Maria Bilat</div>
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
