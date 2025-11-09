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
                alt="Forensic Science"
                className="aspect-3/2 w-full object-cover"
                src="https://i.ibb.co/CsD1zc5f/Screenshot-2025-11-02-131303.png"
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
                  {locale === 'fr' ? `Le ${formatEventDate('2025-11-03', null, 'fr')}` : 'November 3rd, 2025'}
                </div>
                <div className="mt-2 text-lg/7 font-medium">
                  <a
                    href={getLocalizedUrl('/articles/investigating-cells-crime', locale)}
                    className="text-[#003e3e] transition-colors hover:text-[#003e3e]/80"
                  >
                    <span className="absolute inset-0"></span>
                    {locale === 'fr' ? 'Enquêteurs de cellules ou de crimes? Introduction au domaine de la science judiciaire (l\'analyse scientifique de cas)' : 'Investigating Cells or Investigating Crime? An Introduction to the field of Forensic Science'}
                  </a>
                </div>
                <div className="mt-2 flex-1 text-sm/6 text-gray-500">
                  {locale === 'fr'
                    ? 'Bon mois de novembre à tous! Halloween étant passé et un nouveau mois devant nous, uoLab2Life vous présente son dernier thème du mois: la science judiciaire (ou la science forensique ou légale)! Nous en avons tous déjà entendu parler...'
                    : 'Happy November, everyone! With Halloween done and the beginning of a new month ahead of us, uoLab2Life presents you with our latest theme of the month: Forensic science! We\'ve all heard before...'}
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
                alt="Crisis Intervention Workers"
                className="aspect-3/2 w-full object-cover"
                src="https://myaolcc.com/wp-content/uploads/2024/07/JUL-10-community-service-worker-training.jpg"
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
                  {locale === 'fr' ? `Le ${formatEventDate('2025-11-02', null, 'fr')}` : 'November 2nd, 2025'}
                </div>
                <div className="mt-2 text-lg/7 font-medium">
                  <a
                    href={getLocalizedUrl('/articles/crisis-intervention-workers', locale)}
                    className="text-[#003e3e] transition-colors hover:text-[#003e3e]/80"
                  >
                    <span className="absolute inset-0"></span>
                    {locale === 'fr' ? 'Quand chaque seconde compte - Comment les intervenants en situation de crise protègent la santé mentale' : 'When Seconds Matter - How Crisis Intervention Workers Protect Mental Health'}
                  </a>
                </div>
                <div className="mt-2 flex-1 text-sm/6 text-gray-500">
                  {locale === 'fr'
                    ? 'Pour beaucoup de gens, les crises de santé mentale sont super rares. Mais elles sont présentes dans tous les aspects de la civilisation moderne. Les intervenants en situation de crise sont les héros qui interviennent dans les moments les plus difficiles...'
                    : 'To many members of the public, mental health crises are substantially rare. However, they are present within all facets of modern civilization. Crisis intervention workers are the heroes who step in during the most vulnerable moments...'}
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
            
            <div className="relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-[#003e3e]/60 ring-1 ring-black/5">
              <img
                alt="Psychometrists and Mental Health"
                className="aspect-3/2 w-full object-cover"
                src="https://www.allpsychologyschools.com/wp-content/uploads/2024/03/psychometrist-ceu-750x350-1.jpg"
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
                  {locale === 'fr' ? `Le ${formatEventDate('2025-10-24', null, 'fr')}` : 'October 24th, 2025'}
                </div>
                <div className="mt-2 text-lg/7 font-medium">
                  <a
                    href={getLocalizedUrl('/articles/psychometrists-mental-health', locale)}
                    className="text-[#003e3e] transition-colors hover:text-[#003e3e]/80"
                  >
                    <span className="absolute inset-0"></span>
                    {locale === 'fr' ? 'Mesurer l\'esprit - Comment les psychométriciens soutiennent la santé mentale' : 'Measuring the Mind - How Psychometrists Support Mental Health'}
                  </a>
                </div>
                <div className="mt-2 flex-1 text-sm/6 text-gray-500">
                  {locale === 'fr'
                    ? 'La santé mentale englobe bien plus que les émotions. Il s\'agit de comprendre comment notre esprit pense, apprend et traite le monde qui nous entoure. Les psychométriciens travaillent en coulisses...'
                    : 'Mental health encompasses far more than just emotions. It\'s about understanding how our minds think, learn, and process the world around us. Psychometrists work behind the scenes...'}
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
