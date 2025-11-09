'use client'

import { AnimatedNumber } from '@/components/home/animated-number'
import { Container } from '@/components/home/container'
import { MembersCarousel } from '@/components/home/members-carousel'
import { Heading, Lead, Subheading } from '@/components/home/text'
import { useTranslation } from '@/contexts/LanguageContext'
import Image from 'next/image'

export default function AboutUsSection() {
  return (
    <main className="overflow-hidden">
      <Header />
      <MembersCarousel />
    </main>
  )
}

function Header() {
  const { t } = useTranslation()
  
  return (
    <Container className="mt-16 pb-8">
      <Heading as="h1" className="text-[#003e3e]">
        {t('home.about.title') || 'Supporting students in their journey from classroom to career.'}
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        {t('home.about.mission') || 'We are on a mission to allow students to connect with and explore various jobs in the field of healthcare and medicine.'}
      </Lead>
      <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-medium tracking-tight">{t('home.about.ourMission') || 'Our mission'}</h2>
          <p className="mt-6 text-sm/6 text-gray-600">
            {t('home.about.paragraph1') || 'uOttawa Lab2Life is dedicated to promoting and helping students explore various careers in the field of healthcare and medicine beyond special education, highlighting the other sectors that contribute to the field. We aim to provide students with a broader perspective on healthcare careers, including administration, IT, finance, and more, which are integral to the healthcare sector. We wish to support students interested in the field by providing them with information, resources, and opportunities to apply their academics to different careers.'}
          </p>
          <p className="mt-8 text-sm/6 text-gray-600">
            {t('home.about.paragraph2') || 'Through innovative events, professional development initiatives, podcast episodes with people in various professions, articles about different careers, workshops about job applications, and networking opportunities, we aim to guide students through their journey from the classroom and lab to diverse careers in the field and support them with potential career pathways such as jobs, graduate education or medical school, but also providing them with guidance in exploring different career options, ensuring they have a proactive backup plan in case their first application attempt doesn\'t go as planned. This helps students stay on track and make themselves more competitive for future opportunities or allow them to fall back to a different career within their interests.'}
          </p>
          <p className="mt-8 text-sm/6 text-gray-600">
            {t('home.about.paragraph3') || 'We strive to create a community of aspiring professionals, equipped with the skills, knowledge, and experiences to make a positive impact in their chosen pathways and professions. We wish to be inclusive of all degrees and will not be limited to just the sciences. Our goal is to help students explore and navigate through a range of careers in healthcare, enabling them to build well-rounded, proactive career plans in the ever-changing job market and ensuring they are well-prepared and confident in their career pathways.'}
          </p>
        </div>

        <div className="pt-12 lg:row-span-2 lg:-mr-16 xl:mr-auto">
          <div className="-mx-2 grid grid-cols-2 gap-2 sm:-mx-4 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
            <div className="relative mx-auto aspect-square w-full max-w-[200px] overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 sm:max-w-none">
              <Image
                src="/images/about-us/about-us-1.jpg"
                alt="Lab2Life Event 1"
                width={600}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="relative mx-auto -mt-3 aspect-square w-full max-w-[200px] overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 sm:max-w-none lg:-mt-32">
              <Image
                src="/images/about-us/about-us-2.jpg"
                alt="Lab2Life Event 2"
                width={600}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-[200px] overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 sm:max-w-none">
              <Image
                src="/images/about-us/about-us-3.jpg"
                alt="Lab2Life Event 3"
                width={600}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="relative mx-auto -mt-3 aspect-square w-full max-w-[200px] overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 sm:max-w-none lg:-mt-32">
              <Image
                src="/images/about-us/IMG_7393.JPG"
                alt="Lab2Life Event 5"
                width={600}
                height={600}
                className="h-full w-full object-cover scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="w-full">
          <Subheading className="text-[#003e3e]">{t('home.about.byTheNumbers') || 'UOLAB2LIFE BY THE NUMBERS'}</Subheading>
          <hr className="mt-6 border-t border-gray-200" />
          <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 lg:grid-cols-4">
            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
              <dt className="text-sm/6 text-gray-600">{t('home.about.generalMembers') || 'General Members'}</dt>
              <dd className="order-first text-6xl font-medium tracking-tight text-[#003e3e]">
                <AnimatedNumber start={0} end={300} />+
              </dd>
            </div>
            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4 lg:border-b-0">
              <dt className="text-sm/6 text-gray-600">{t('home.about.articlesPodcasts') || 'Articles + Podcasts Released'}</dt>
              <dd className="order-first text-6xl font-medium tracking-tight text-[#003e3e]">
                <AnimatedNumber start={0} end={26} />
              </dd>
            </div>
            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
              <dt className="text-sm/6 text-gray-600">{t('home.about.eventsHosted') || 'Events Hosted'}</dt>
              <dd className="order-first text-6xl font-medium tracking-tight text-[#003e3e]">
                <AnimatedNumber start={0} end={8} />
              </dd>
            </div>
            <div className="flex flex-col gap-y-2">
              <dt className="text-sm/6 text-gray-600">{t('home.about.socialMediaEngagement') || 'Social Media Engagement'}</dt>
              <dd className="order-first text-6xl font-medium tracking-tight text-[#003e3e]">
                <AnimatedNumber start={0} end={250} />
                K+
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </Container>
  )
}