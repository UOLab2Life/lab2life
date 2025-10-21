'use client'

import { Button } from '@/components/home/button'
import { Heading } from '@/components/home/text'
import { useTranslation } from '@/contexts/LanguageContext'
import { getLocalizedUrl } from '@/lib/url-localization'
import { formatEventDate } from '@/lib/date-formatting'

export function LatestArticles() {
  const { t, locale } = useTranslation()
  
  return (
    <div className="mt-8 bg-white pb-0">
      <div className="px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-7xl">
          <div className="text-center">
            <Heading as="h3" className="mt-2">
              {t('home.latestArticles.title') || 'Latest Articles'}
            </Heading>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
              {t('home.latestArticles.description') || 'Check out our latest articles about healthcare and medicine'}
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
            
          <div className="relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-[#003e3e]/60 ring-1 ring-black/5">
              <img
                alt="Mental Health and Psychology"
                className="aspect-3/2 w-full object-cover"
                src="https://lh3.googleusercontent.com/proxy/i_z1hvocOjBM18kTEa4m684BokwsyR51aBGp2TSc1BwfS1I06d1BSpVlKUZTn5IUg6hHnsoBSPNrQob7MhxzA8Sz8bhMeyIUELeh5WP_FMGM4HDcPC7lVsxYb3M"
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
                  {locale === 'fr' ? `Le ${formatEventDate('2025-10-13', null, 'fr')}` : 'October 13th, 2025'}
                </div>
                <div className="mt-2 text-lg/7 font-medium">
                  <a
                    href={getLocalizedUrl('/articles/body-mind-psyche', locale)}
                    className="text-[#003e3e] transition-colors hover:text-[#003e3e]/80"
                  >
                    <span className="absolute inset-0"></span>
                    {locale === 'fr' ? 'Le corps, l\'esprit et la psyché - La santé mentale avec uoLab2Life' : 'The Body, the Mind, and the Psyche - Mental Health with uoLab2Life'}
                  </a>
                </div>
                <div className="mt-2 flex-1 text-sm/6 text-gray-500">
                  {locale === 'fr'
                    ? 'La Journée de la santé mentale a eu lieu vendredi dernier, le 10 octobre. Son importance, sa richesse et sa valeur sont évidentes au vu des statistiques: 1 Canadien sur 5 souffre d\'une maladie mentale...'
                    : 'Mental Health Day was this past Friday, on October 10th. Its importance, its richness, and its value are evident within the statistics: 1 in 5 Canadians experience a mental health illness...'}
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    alt="Maroun Tarabey"
                    className="aspect-square size-6 rounded-full object-cover ring-1 ring-[#003e3e]/30"
                    src="/images/members-carousel/maroun-tarabey.jpg"
                  />
                  <div className="text-base/6 font-medium text-gray-700">Maroun Tarabey</div>
                </div>
              </div>
            </div>
            
            <div className="relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-[#003e3e]/60 ring-1 ring-black/5">
              <img
                alt="Nuclear Medicine Technologist"
                className="aspect-3/2 w-full object-cover"
                src="/images/home/nuclear-medicine-technologist.webp"
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
                  {locale === 'fr' ? `Le ${formatEventDate('2025-09-30', null, 'fr')}` : 'September 30th, 2025'}
                </div>
                <div className="mt-2 text-lg/7 font-medium">
                  <a
                    href={getLocalizedUrl('/articles/nuclear-medicine-technologists', locale)}
                    className="text-[#003e3e] transition-colors hover:text-[#003e3e]/80"
                  >
                    <span className="absolute inset-0"></span>
                    {locale === 'fr' ? 'À l\'intérieur du rôle des technologues en médecine nucléaire: du soutien qui sauve des vies' : 'Inside the Role of Nuclear Medicine Technologists: Support That Saves Lives'}
                  </a>
                </div>
                <div className="mt-2 flex-1 text-sm/6 text-gray-500">
                  {locale === 'fr'
                    ? 'Les technologues en médecine nucléaire (TMN) travaillent en coulisses pour fournir les images et les données dont les cliniciens ont besoin afin de diagnostiquer et de traiter...'
                    : 'Clinical support roles are the missing puzzle pieces that complete the picture. Without them, physicians would not be able to see the full image needed for diagnosis...'}
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    alt="Lacey Mullin"
                    className="aspect-square size-6 rounded-full object-cover ring-1 ring-[#003e3e]/30"
                    src="/images/members-carousel/lacey-mullin.jpg"
                  />
                  <div className="text-base/6 font-medium text-gray-700">Lacey Mullin</div>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-[#003e3e]/60 ring-1 ring-black/5">
              <img
                alt="Clinical Support"
                className="aspect-3/2 w-full object-cover"
                src="/images/home/clinicalsupport1.png"
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
                  {locale === 'fr' ? `Le ${formatEventDate('2025-09-16', null, 'fr')}` : 'September 16th, 2025'}
                </div>
                <div className="mt-2 text-lg/7 font-medium">
                  <a
                    href={getLocalizedUrl('/articles/power-clinical-support', locale)}
                    className="text-[#003e3e] transition-colors hover:text-[#003e3e]/80"
                  >
                    <span className="absolute inset-0"></span>
                    {locale === 'fr' ? 'Le pouvoir du soutien clinique' : 'The Power of Clinical Support'}
                  </a>
                </div>
                <div className="mt-2 flex-1 text-sm/6 text-gray-500">
                  {locale === 'fr'
                    ? 'Le soutien clinique est une partie essentielle des soins de santé modernes ; pensez au « support technique » mais pour des systèmes et des appareils qui sauvent des vies. Les laboratoires modernes s\'appuient sur des équipements de haute technologie pour...'
                    : 'Clinical support is an essential part of modern healthcare; think of it as "tech support" but for life-saving systems and machinery. Modern labs rely on high-tech equipment for...'}
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    alt="Anoosha Rehman"
                    className="aspect-square size-6 rounded-full object-cover ring-1 ring-[#003e3e]/30"
                    src="/images/members-carousel/anoosha-rehman.jpg"
                  />
                  <div className="text-base/6 font-medium text-gray-700">Anoosha Rehman</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Button
              href={getLocalizedUrl('/articles', locale)}
              variant="primary"
              className="!visible mx-auto w-[70%] max-w-sm text-center lg:w-1/3 sm:inline-flex"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {locale === 'fr' ? 'Explorer tous les articles' : 'Explore All Articles'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
