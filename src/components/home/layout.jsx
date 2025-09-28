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
            {t('home.about.paragraph1') || 'uOttawa Lab2Life is dedicated to promoting and helping students explore various careers in the field of healthcare and medicine. We wish to support students interested in the field by providing them with information, resources, and opportunities to apply their academics to different careers.'}
          </p>
          <p className="mt-8 text-sm/6 text-gray-600">
            {t('home.about.paragraph2') || 'Through innovative events, professional development initiatives, podcast episodes with experts in various professions, articles about different careers, workshops about job applications and networking opportunities, we aim to guide students through their journey from the classroom to the lab. We hope to introduce students to diverse careers in the field and support them with potential career pathways such as jobs, graduate education or medical school.'}
          </p>
          <p className="mt-8 text-sm/6 text-gray-600">
            {t('home.about.paragraph3') || 'We strive to create a community of aspiring professionals, equipped with the skills, knowledge and experiences to make a positive impact in their chosen pathways and professions. We wish to be inclusive of all degrees and will not be limited to just the sciences. Our goal is to support interested students navigate to their preferred profession in the ever-changing job market.'}
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

        <div className="max-lg:mt-16 lg:col-span-1">
          <Subheading className="text-[#003e3e]">{t('home.about.byTheNumbers') || 'UOLAB2LIFE BY THE NUMBERS'}</Subheading>
          <hr className="mt-6 border-t border-gray-200" />
          <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
              <dt className="text-sm/6 text-gray-600">{t('home.about.generalMembers') || 'General Members'}</dt>
              <dd className="order-first text-6xl font-medium tracking-tight text-[#003e3e]">
                <AnimatedNumber start={0} end={300} />+
              </dd>
            </div>
            <div className="flex flex-col gap-y-2">
              <dt className="text-sm/6 text-gray-600">{t('home.about.articlesPodcasts') || 'Articles + Podcasts Released'}</dt>
              <dd className="order-first text-6xl font-medium tracking-tight text-[#003e3e]">
                <AnimatedNumber start={0} end={19} />
              </dd>
            </div>
            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
              <dt className="text-sm/6 text-gray-600">{t('home.about.eventsHosted') || 'Events Hosted'}</dt>
              <dd className="order-first text-6xl font-medium tracking-tight text-[#003e3e]">
                <AnimatedNumber start={0} end={7} />
              </dd>
            </div>
            <div className="flex flex-col gap-y-2 max-sm:border-b max-sm:border-dotted max-sm:border-gray-200 max-sm:pb-4">
              <dt className="text-sm/6 text-gray-600">{t('home.about.socialMediaEngagement') || 'Social Media Engagement'}</dt>
              <dd className="order-first text-6xl font-medium tracking-tight text-[#003e3e]">
                <AnimatedNumber start={0} end={225} />
                K+
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </Container>
  )
}

// function Person({ name, description, img }) {
//   return (
//     <li className="flex items-center gap-4">
//       <img alt="" src={img} className="size-12 rounded-full" />
//       <div className="text-sm/6">
//         <h3 className="font-medium">{name}</h3>
//         <p className="text-gray-500">{description}</p>
//       </div>
//     </li>
//   )
// }

// function Team() {
//   return (
//     <Container className="mt-32">
//       <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-[#003e3e]">
//         Meet the team
//       </h2>
//       <Heading as="h3" className="mt-2">
//         Founded by an all-star team.
//       </Heading>
//       <Lead className="mt-6 max-w-3xl">
//         Radiant is founded by two of the best sellers in the business and backed by investors who
//         look the other way.
//       </Lead>
//       <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
//         <div className="max-w-lg">
//           <p className="text-sm/6 text-gray-600">
//             Years ago, while working as sales associates at rival companies, Thomas, Ben, and
//             Natalie were discussing a big client they had all been competing for. Joking about
//             seeing the terms of each other’s offers, they had an idea: what if they shared data to
//             win deals and split the commission behind their companies’ backs? It turned out to be an
//             incredible success, and that idea became the kernel for Radiant.
//           </p>
//           <p className="mt-8 text-sm/6 text-gray-600">
//             Today, Radiant transforms revenue organizations by harnessing illegally acquired
//             customer and competitor data, using it to provide extraordinary leverage. More than
//             30,000 companies rely on Radiant to undercut their competitors and extort their
//             customers, all through a single integrated platform.
//           </p>
//           <div className="mt-6">
//             <Button className="w-full sm:w-auto" href="#">
//               Join us
//             </Button>
//           </div>
//         </div>
//         <div className="max-lg:order-first max-lg:max-w-lg">
//           <div className="aspect-3/2 overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
//             <img alt="" src="/company/5.jpg" className="block size-full object-cover" />
//           </div>
//         </div>
//       </div>
//       <Subheading as="h3" className="mt-24 text-[#003e3e]">
//         The team
//       </Subheading>
//       <hr className="mt-6 border-t border-gray-200" />
//       <ul
//         role="list"
//         className="mx-auto mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
//       >
//         <Person
//           name="Michael Foster"
//           description="Co-Founder / CTO"
//           img="/team/michael-foster.jpg"
//         />
//         <Person
//           name="Dries Vincent"
//           description="Business Relations"
//           img="/team/dries-vincent.jpg"
//         />
//         <Person
//           name="Celeste Vandermark"
//           description="Front-end Developer"
//           img="/team/celeste-vandermark.jpg"
//         />
//         <Person name="Courtney Henry" description="Designer" img="/team/courtney-henry.jpg" />
//         <Person
//           name="Marcus Eldridge"
//           description="Director of Product"
//           img="/team/marcus-eldridge.jpg"
//         />
//         <Person name="Whitney Francis" description="Copywriter" img="/team/whitney-francis.jpg" />
//         <Person
//           name="Leonard Krasner"
//           description="Senior Designer"
//           img="/team/leonard-krasner.jpg"
//         />
//         <Person
//           name="Nolan Sheffield"
//           description="Principal Designer"
//           img="/team/nolan-sheffield.jpg"
//         />
//         <Person
//           name="Emily Selman"
//           description="VP, User Experience"
//           img="/team/emily-selman.jpg"
//         />
//       </ul>
//     </Container>
//   )
// }

// function Investors() {
//   return (
//     <Container className="mt-32">
//       <Subheading className="text-[#003e3e]">Investors</Subheading>
//       <Heading as="h3" className="mt-2">
//         Funded by industry-leaders.
//       </Heading>
//       <Lead className="mt-6 max-w-3xl">
//         We are fortunate to be backed by the best investors in the industry — both literal and
//         metaphorical partners in crime.
//       </Lead>
//       <Subheading as="h3" className="mt-24 text-[#003e3e]">
//         Venture Capital
//       </Subheading>
//       <hr className="mt-6 border-t border-gray-200" />
//       <ul role="list" className="mx-auto mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
//         <li>
//           <img alt="Remington Schwartz" src="/investors/remington-schwartz.svg" className="h-14" />
//           <p className="mt-6 max-w-lg text-sm/6 text-gray-500">
//             Remington Schwartz has been a driving force in the tech industry, backing bold
//             entrepreneurs who explore grey areas in financial and privacy law. Their deep industry
//             expertise and extensive political lobbying provide their portfolio companies with
//             favorable regulation and direct access to lawmakers.
//           </p>
//         </li>
//         <li>
//           <img alt="Deccel" src="/investors/deccel.svg" className="h-14" />
//           <p className="mt-6 max-w-lg text-sm/6 text-gray-500">
//             Deccel has been at the forefront of innovation, investing in pioneering companies across
//             various sectors, including technology, consumer goods, and healthcare. Their philosophy
//             of ‘plausible deniability’ and dedication to looking the other way have helped produce
//             some of the world’s most controversial companies.
//           </p>
//         </li>
//       </ul>
//       <Subheading as="h3" className="mt-24 text-[#003e3e]">
//         Individual investors
//       </Subheading>
//       <hr className="mt-6 border-t border-gray-200" />
//       <ul
//         role="list"
//         className="mx-auto mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
//       >
//         <Person
//           name="Kristin Watson"
//           description="TechNexus Ventures"
//           img="/individual-investors/kristin-watson.jpg"
//         />
//         <Person
//           name="Emma Dorsey"
//           description="Innovate Capital Partners"
//           img="/individual-investors/emma-dorsey.jpg"
//         />
//         <Person
//           name="Alicia Bell"
//           description="FutureWave Investments"
//           img="/individual-investors/alicia-bell.jpg"
//         />
//         <Person
//           name="Jenny Wilson"
//           description="SynergyTech Equity"
//           img="/individual-investors/jenny-wilson.jpg"
//         />
//         <Person
//           name="Anna Roberts"
//           description="NextGen Horizons"
//           img="/individual-investors/anna-roberts.jpg"
//         />
//         <Person
//           name="Benjamin Russel"
//           description="Pioneer Digital Ventures"
//           img="/individual-investors/benjamin-russel.jpg"
//         />
//       </ul>
//     </Container>
//   )
// }

// function Testimonial() {
//   return (
//     <div className="sm:aspect-5/4 lg:aspect-3/4 relative flex aspect-square flex-col justify-end overflow-hidden rounded-3xl">
//       <img
//         alt=""
//         src="/testimonials/veronica-winton.jpg"
//         className="absolute inset-0 object-cover"
//       />
//       <div
//         aria-hidden="true"
//         className="bg-linear-to-t absolute inset-0 rounded-3xl from-black from-10% to-75% ring-1 ring-inset ring-gray-950/10 lg:from-25%"
//       />
//       <figure className="relative p-10">
//         <blockquote>
//           <p className="relative text-xl/7 text-white before:absolute before:-translate-x-full before:content-['“'] after:absolute after:content-['”']">
//             We&apos;ve managed to put two of our main competitors out of business in 6 months.
//           </p>
//         </blockquote>
//         <figcaption className="mt-6 border-t border-white/20 pt-6">
//           <p className="text-sm/6 font-medium text-white">Veronica Winton</p>
//           <p className="text-sm/6 font-medium">
//             <span className="bg-linear-to-r from-28% from-[#fff1be] via-[#ee87cb] via-70% to-[#b060ff] bg-clip-text text-transparent">
//               CSO, Planeteria
//             </span>
//           </p>
//         </figcaption>
//       </figure>
//     </div>
//   )
// }

// function Careers() {
//   return (
//     <Container className="my-32">
//       <Subheading className="text-[#003e3e]">Careers</Subheading>
//       <Heading as="h3" className="mt-2">
//         Join our fully remote team.
//       </Heading>
//       <Lead className="mt-6 max-w-3xl">
//         We work together from all over the world, mainly from locations without extradition
//         agreements.
//       </Lead>
//       <div className="mt-24 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_24rem]">
//         <div className="lg:max-w-2xl">
//           <Subheading as="h3" className="text-[#003e3e]">
//             Open positions
//           </Subheading>
//           <div>
//             <table className="w-full text-left">
//               <colgroup>
//                 <col className="w-2/3" />
//                 <col className="w-1/3" />
//                 <col className="w-0" />
//               </colgroup>
//               <thead className="sr-only">
//                 <tr>
//                   <th scope="col">Title</th>
//                   <th scope="col">Location</th>
//                   <th scope="col">Read more</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <th scope="colgroup" colSpan={3} className="px-0 pb-0 pt-10">
//                     <div className="-mx-4 rounded-lg bg-gray-50 px-4 py-3 text-sm/6 font-semibold">
//                       Engineering
//                     </div>
//                   </th>
//                 </tr>
//                 <tr className="border-b border-dotted border-gray-200 text-sm/6 font-normal">
//                   <td className="px-0 py-4">iOS Developer</td>
//                   <td className="px-0 py-4 text-gray-600">Remote</td>
//                   <td className="px-0 py-4 text-right">
//                     <Button variant="outline" href="#">
//                       View listing
//                     </Button>
//                   </td>
//                 </tr>
//                 <tr className="border-b border-dotted border-gray-200 text-sm/6 font-normal">
//                   <td className="px-0 py-4">Backend Engineer</td>
//                   <td className="px-0 py-4 text-gray-600">Remote</td>
//                   <td className="px-0 py-4 text-right">
//                     <Button variant="outline" href="#">
//                       View listing
//                     </Button>
//                   </td>
//                 </tr>
//                 <tr className="text-sm/6 font-normal">
//                   <td className="px-0 py-4">Product Engineer</td>
//                   <td className="px-0 py-4 text-gray-600">Remote</td>
//                   <td className="px-0 py-4 text-right">
//                     <Button variant="outline" href="#">
//                       View listing
//                     </Button>
//                   </td>
//                 </tr>
//                 <tr>
//                   <th scope="colgroup" colSpan={3} className="px-0 pb-0 pt-5">
//                     <div className="-mx-4 rounded-lg bg-gray-50 px-4 py-3 text-sm/6 font-semibold">
//                       Design
//                     </div>
//                   </th>
//                 </tr>
//                 <tr className="border-b border-dotted border-gray-200 text-sm/6 font-normal">
//                   <td className="px-0 py-4">Principal Designer</td>
//                   <td className="px-0 py-4 text-gray-600">Remote</td>
//                   <td className="px-0 py-4 text-right">
//                     <Button variant="outline" href="#">
//                       View listing
//                     </Button>
//                   </td>
//                 </tr>
//                 <tr className="border-b border-dotted border-gray-200 text-sm/6 font-normal">
//                   <td className="px-0 py-4">Designer</td>
//                   <td className="px-0 py-4 text-gray-600">Remote</td>
//                   <td className="px-0 py-4 text-right">
//                     <Button variant="outline" href="#">
//                       View listing
//                     </Button>
//                   </td>
//                 </tr>
//                 <tr className="text-sm/6 font-normal">
//                   <td className="px-0 py-4">Senior Designer</td>
//                   <td className="px-0 py-4 text-gray-600">Remote</td>
//                   <td className="px-0 py-4 text-right">
//                     <Button variant="outline" href="#">
//                       View listing
//                     </Button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//         <Testimonial />
//       </div>
//     </Container>
//   )
// }
