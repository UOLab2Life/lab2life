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
            {/* 1. Pharmacology article */}
            <div className="relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-[#003e3e]/60 ring-1 ring-black/5">
              <img
                alt={locale === 'fr' ? 'Pharmacologie, Pharmacie et Affaires' : 'Pharmacology, Pharmacy, and Business'}
                className="aspect-3/2 w-full object-cover"
                src="https://t3.ftcdn.net/jpg/00/89/56/50/360_F_89565069_3DGtZfY1jzntFsfbffN7o5l1S5YfwYUp.jpg"
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
                  {locale === 'fr' ? `Le ${formatEventDate('2026-01-19', null, 'fr')}` : 'January 19th, 2026'}
                </div>
                <div className="mt-2 text-lg/7 font-medium">
                  <a
                    href={getLocalizedUrl('/articles/world-pharmacology-pharmacy-business', locale)}
                    className="text-[#003e3e] transition-colors hover:text-[#003e3e]/80"
                  >
                    <span className="absolute inset-0"></span>
                    {locale === 'fr'
                      ? 'Le monde de la pharmacologie, de la pharmacie et des affaires - Une introduction'
                      : 'The World of Pharmacology, Pharmacy, and Business - an in-depth introduction'}
                  </a>
                </div>
                <div className="mt-2 flex-1 text-sm/6 text-gray-500">
                  {locale === 'fr'
                    ? 'Bonjour à tous et bienvenue dans les articles de Lab2Life! Nous espérons que les vacances et le début du nouveau semestre se sont bien passés. En raison des examens, nous avons fait une petite pause en décembre, mais nous revenons plus forts que jamais...'
                    : 'Welcome back, everyone, to Lab2Life’s articles! We hope that the winter break—and start of the new semester—have both been excellent and smooth for all. Due to exams, we took a short break in December, but we plan to return stronger than ever...'}
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

            {/* 2. Forensic science article */}
            <div className="relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-[#003e3e]/60 ring-1 ring-black/5">
              <img
                alt="Forensic Science"
                className="aspect-3/2 w-full object-cover"
                src="https://forensicstats.org/wp-content/uploads/2017/11/forenisc-scientist-in-lab.jpg"
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
                  {locale === 'fr' ? `Le ${formatEventDate('2025-11-15', null, 'fr')}` : 'November 15th, 2025'}
                </div>
                <div className="mt-2 text-lg/7 font-medium">
                  <a
                    href={getLocalizedUrl('/articles/forensic-scientists-bring-justice', locale)}
                    className="text-[#003e3e] transition-colors hover:text-[#003e3e]/80"
                  >
                    <span className="absolute inset-0"></span>
                    {locale === 'fr' ? 'Révéler l\'invisible - Comment les scientifiques légistes mettent la science au service de la justice' : 'Uncovering the Invisible - How Forensic Scientists Bring Science Into Justice'}
                  </a>
                </div>
                <div className="mt-2 flex-1 text-sm/6 text-gray-500">
                  {locale === 'fr'
                    ? 'La plupart des enquêtes criminelles commencent rarement par des réponses claires. Elles commencent par des fragments tels qu\'une empreinte digitale sur une vitre, une trace d\'ADN, un résidu chimique ou une empreinte de pas dans la poussière. Alors que les détectives se concentrent sur les interrogatoires et les pistes, les scientifiques légistes travaillent en coulisses...'
                    : 'Most criminal investigations rarely begin with clear answers. They begin with fragments like a fingerprint on glass, a trace of DNA, a chemical residue, or a footprint in dust. While detectives focus on interviews and leads, forensic scientists work behind the scenes...'}
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

            {/* 3. Investigating cells article */}
            <div className="relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-[#003e3e]/60 ring-1 ring-black/5">
              <img
                alt="Forensic Science Intro"
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
                    ? 'Bon mois de novembre à tous! Halloween étant passé et un nouveau mois devant nous, uoLab2Life vous présente son dernier thème du mois: la science judiciaire...'
                    : 'Happy November, everyone! With Halloween done and the beginning of a new month ahead of us, uoLab2Life presents you with our latest theme of the month: Forensic science...'}
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
