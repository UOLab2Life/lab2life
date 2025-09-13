import AboutLayout from '@/components/home/layout'
import { Bounce } from '@/components/home/bounce'
import { Countdown } from '@/components/home/countdown'
import { Footer } from '@/components/home/footer'
import { Hero } from '@/components/home/hero'
import { Instagram } from '@/components/home/instagram'
import { LatestArticles } from '@/components/home/latest-articles'
import { PodcastPreview } from '@/components/home/podcast-preview'

export const metadata = {
  title: 'uOttawa Lab2Life',
  description:
    'Dedicated to promoting and helping students explore various careers in the field of healthcare and medicine.',
}

export default function Homepage() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <main>
        <AboutLayout />
        <Countdown />
        <PodcastPreview />
        <LatestArticles />
        <Instagram />
        <Bounce />
        {/* <div className="bg-linear-to-b from-white from-50% to-gray-100 py-32">
          <FeatureSection />
          <BentoSection />
        </div>
        <DarkBentoSection />  */}
      </main>
      <Footer />
    </div>
  )
}

// function FeatureSection() {
//   return (
//     <div className="overflow-hidden">
//       <Container className="pb-24">
//         <Heading as="h2" className="max-w-3xl">
//           Explore Healthcare Career Opportunities.
//         </Heading>
//         <Screenshot
//           width={1216}
//           height={768}
//           src="/screenshots/app.png"
//           className="h-144 sm:w-304 mt-16 sm:h-auto"
//         />
//       </Container>
//     </div>
//   )
// }

// function BentoSection() {
//   return (
//     <Container>
//       <Subheading>Opportunities</Subheading>
//       <Heading as="h3" className="mt-2 max-w-3xl">
//         Discover the diverse world of healthcare careers.
//       </Heading>

//       <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
//         <BentoCard
//           eyebrow="Medicine"
//           title="Clinical Practice"
//           description="Explore various medical specialties from family medicine to surgery. Learn about patient care, diagnosis, and treatment in diverse healthcare settings."
//           graphic={
//             <div className="bg-size-[1000px_560px] bg-position-[left_-109px_top_-112px] h-80 bg-[url(/screenshots/profile.png)] bg-no-repeat" />
//           }
//           fade={['bottom']}
//           className="max-lg:rounded-t-4xl lg:rounded-tl-4xl lg:col-span-3"
//         />
//         <BentoCard
//           eyebrow="Research"
//           title="Healthcare Innovation"
//           description="Discover opportunities in medical research, biotech, and pharmaceutical development. Join the effort to advance healthcare through scientific discovery."
//           graphic={
//             <div className="bg-size-[1100px_650px] bg-position-[left_-38px_top_-73px] absolute inset-0 bg-[url(/screenshots/competitors.png)] bg-no-repeat" />
//           }
//           fade={['bottom']}
//           className="lg:rounded-tr-4xl lg:col-span-3"
//         />
//         <BentoCard
//           eyebrow="Technology"
//           title="Health Informatics"
//           description="Explore the intersection of healthcare and technology. Learn about electronic health records, data analysis, and digital health solutions."
//           graphic={
//             <div className="flex size-full pl-10 pt-10">
//               <Keyboard highlighted={['LeftCommand', 'LeftShift', 'D']} />
//             </div>
//           }
//           className="lg:rounded-bl-4xl lg:col-span-2"
//         />
//         <BentoCard
//           eyebrow="Administration"
//           title="Healthcare Management"
//           description="Discover leadership roles in healthcare organizations. Learn about hospital administration, policy development, and healthcare economics."
//           graphic={<LogoCluster />}
//           className="lg:col-span-2"
//         />
//         <BentoCard
//           eyebrow="Global Health"
//           title="International Impact"
//           description="Explore global health initiatives and international medical missions. Make a difference in healthcare access worldwide."
//           graphic={<Map />}
//           className="max-lg:rounded-b-4xl lg:rounded-br-4xl lg:col-span-2"
//         />
//       </div>
//     </Container>
//   )
// }

// function DarkBentoSection() {
//   return (
//     <div className="rounded-4xl mx-2 mt-2 bg-gray-900 py-32">
//       <Container>
//         <Subheading dark>Specializations</Subheading>
//         <Heading as="h3" dark className="mt-2 max-w-3xl">
//           Find your perfect healthcare specialty.
//         </Heading>

//         <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
//           <BentoCard
//             dark
//             eyebrow="Mental Health"
//             title="Psychology & Counseling"
//             description="Explore careers in mental health, from clinical psychology to social work. Help individuals and communities achieve better mental wellness."
//             graphic={
//               <div className="bg-size-[851px_344px] h-80 bg-[url(/screenshots/networking.png)] bg-no-repeat" />
//             }
//             fade={['top']}
//             className="max-lg:rounded-t-4xl lg:rounded-tl-4xl lg:col-span-4"
//           />
//           <BentoCard
//             dark
//             eyebrow="Therapy"
//             title="Rehabilitation Services"
//             description="Discover physical therapy, occupational therapy, and speech pathology careers. Help patients recover and regain independence."
//             graphic={<LogoTimeline />}
//             className="overflow-visible! lg:rounded-tr-4xl z-10 lg:col-span-2"
//           />
//           <BentoCard
//             dark
//             eyebrow="Nursing"
//             title="Patient Care Excellence"
//             description="Explore diverse nursing specialties from critical care to community health. Provide compassionate, evidence-based patient care."
//             graphic={<LinkedAvatars />}
//             className="lg:rounded-bl-4xl lg:col-span-2"
//           />
//           <BentoCard
//             dark
//             eyebrow="Public Health"
//             title="Community Wellness"
//             description="Learn about epidemiology, health promotion, and disease prevention. Work to improve population health and healthcare systems."
//             graphic={
//               <div className="bg-size-[851px_344px] h-80 bg-[url(/screenshots/engagement.png)] bg-no-repeat" />
//             }
//             fade={['top']}
//             className="max-lg:rounded-b-4xl lg:rounded-br-4xl lg:col-span-4"
//           />
//         </div>
//       </Container>
//     </div>
//   )
// }
