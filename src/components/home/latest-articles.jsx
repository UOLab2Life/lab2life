'use client'

import { Button } from '@/components/home/button'
import { Heading } from '@/components/home/text'
import { useTranslation } from '@/contexts/LanguageContext'
import { getLocalizedUrl } from '@/lib/url-localization'
import { formatEventDate } from '@/lib/date-formatting'

export function LatestArticles() {
  const { t, locale } = useTranslation()
  
  const descriptionRaw =
    t('home.latestArticles.description') ||
    'Check out our latest articles about healthcare and medicine'
  const description = descriptionRaw.endsWith('!') ? descriptionRaw : `${descriptionRaw}!`

  return (
    <div className="mt-8 bg-white pb-0">
      <div className="px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-7xl">
          <div className="text-center">
            <Heading as="h3" className="mt-2">
              {t('home.latestArticles.title') || 'Latest Articles'}
            </Heading>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600 py-4">
              {description}
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* 1. Field of Sports Medicine */}
            <div className="relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-[#003e3e]/60 ring-1 ring-black/5">
              <img
                alt={locale === 'fr' ? 'Médecine du sport' : 'Sports Medicine'}
                className="aspect-3/2 w-full object-cover"
                src="https://www.academyorthopedics.com/wp-content/uploads/2023/03/Sports-Medicine-1024x684.png"
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
                  {locale === 'fr' ? `Le ${formatEventDate('2026-02-01', null, 'fr')}` : 'February 1st, 2026'}
                </div>
                <div className="mt-2 text-lg/7 font-medium">
                  <a
                    href={getLocalizedUrl('/articles/field-sports-medicine', locale)}
                    className="text-[#003e3e] transition-colors hover:text-[#003e3e]/80"
                  >
                    <span className="absolute inset-0"></span>
                    {locale === 'fr'
                      ? 'Les médecins sur le terrain: le domaine de la médecine du sport'
                      : 'Doctors on the Pitch: The Field of Sports Medicine'}
                  </a>
                </div>
                <div className="mt-2 flex-1 text-sm/6 text-gray-500">
                  {locale === 'fr'
                    ? 'Nous vous souhaitons la bienvenue pour un nouveau mois avec Lab2Life! Ce mois-ci, nous revenons plus forts que jamais avec un nouvel événement incontournable le 6 février. Vous êtes plutôt du genre actif et curieux des carrières médicales liées au sport? Cet article explore les bases de la médecine du sport et les parcours possibles...'
                    : 'We welcome you back to another month with Lab2Life! This month, we are returning stronger than ever with a new event on the 6th that is a must-attend. If you are active and curious about healthcare careers tied to sports, this article explores the foundations of sports medicine and where this field can take you...'}
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

            {/* 2. Clinical Pharmacometricians in Modern Medicine */}
            <div className="relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-[#003e3e]/60 ring-1 ring-black/5">
              <img
                alt={locale === 'fr' ? 'Pharmacométrie clinique' : 'Clinical Pharmacometrics'}
                className="aspect-3/2 w-full object-cover"
                src="https://www.evotec.com/uploads/images/Stock_Photos/Shutterstock-Images/_stageImageSmallSize/Pharmacometrics_RSZ.jpg"
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
                  {locale === 'fr' ? `Le ${formatEventDate('2026-01-25', null, 'fr')}` : 'January 25th, 2026'}
                </div>
                <div className="mt-2 text-lg/7 font-medium">
                  <a
                    href={getLocalizedUrl('/articles/clinical-pharmacometricians-modern-medicine', locale)}
                    className="text-[#003e3e] transition-colors hover:text-[#003e3e]/80"
                  >
                    <span className="absolute inset-0"></span>
                    {locale === 'fr'
                      ? 'Trouver la bonne dose — Le rôle des pharmacométriciens cliniques dans la médecine moderne'
                      : 'Engineering the Right Dose — The Role of Clinical Pharmacometricians in Modern Medicine'}
                  </a>
                </div>
                <div className="mt-2 flex-1 text-sm/6 text-gray-500">
                  {locale === 'fr'
                    ? 'Le dosage est ce qui différencie les médicaments des poisons. On pense souvent que c\'est simple: il s\'agit généralement d\'un chiffre imprimé sur une étiquette. En réalité, déterminer la dose correcte est un processus scientifique complexe...'
                    : 'Dosage is what separates medicine from poison. It is often thought to be simple: typically a number printed on a label that applies broadly to patients with the same condition. In reality, determining the correct dose is a complex scientific process...'}
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

            {/* 3. Science of Safety: Toxicology */}
            <div className="relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-[#003e3e]/60 ring-1 ring-black/5">
              <img
                alt={locale === 'fr' ? 'Toxicologie' : 'Toxicology'}
                className="aspect-3/2 w-full object-cover"
                src="/images/articles/toxicologist-linear-color-illustration-vector.jpg"
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
                  {locale === 'fr' ? `Le ${formatEventDate('2026-01-21', null, 'fr')}` : 'January 21st, 2026'}
                </div>
                <div className="mt-2 text-lg/7 font-medium">
                  <a
                    href={getLocalizedUrl('/articles/science-safety-toxicology', locale)}
                    className="text-[#003e3e] transition-colors hover:text-[#003e3e]/80"
                  >
                    <span className="absolute inset-0"></span>
                    {locale === 'fr'
                      ? 'La science de la sécurité : Un regard approfondi sur une carrière en toxicologie'
                      : 'The Science of Safety: A Closer Look at a Career in Toxicology'}
                  </a>
                </div>
                <div className="mt-2 flex-1 text-sm/6 text-gray-500">
                  {locale === 'fr'
                    ? 'Des médicaments que nous prenons à l\'air que nous respirons, des produits chimiques invisibles façonnent notre quotidien. Lorsque ces substances deviennent nocives, nous nous tournons vers les toxicologues pour identifier le danger, évaluer le risque et protéger la santé humaine...'
                    : 'From the medicines we take to the air we breathe, unseen chemicals shape our daily lives. When those substances turn harmful, we look to toxicologists to uncover the danger, measure the risk, and protect not only human health...'}
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
