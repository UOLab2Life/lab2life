import { BentoCard } from '@/components/home/bento-card'
import { Bounce } from '@/components/home/bounce'
import { Button } from '@/components/home/button'
import { Container } from '@/components/home/container'
import { Countdown } from '@/components/home/countdown'
import { Footer } from '@/components/home/footer'
import { Gradient } from '@/components/home/gradient'
import { Instagram } from '@/components/home/instagram'
import { Keyboard } from '@/components/home/keyboard'
import { LatestArticles } from '@/components/home/latest-articles'
import { LinkedAvatars } from '@/components/home/linked-avatars'
import { LogoCluster } from '@/components/home/logo-cluster'
import { LogoTimeline } from '@/components/home/logo-timeline'
import { Map } from '@/components/home/map'
import { Navbar } from '@/components/home/navbar'
import { PodcastPreview } from '@/components/home/podcast-preview'
import { Screenshot } from '@/components/home/screenshot'
import { Heading, Subheading } from '@/components/home/text'

function Hero() {
  return (
    <div className="relative">
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
      <Container className="relative">
        <Navbar />
        <div className="pt-16 pb-24 text-center sm:pt-24 sm:pb-32 sm:text-left md:pt-32 md:pb-48">
          <Heading
            as="h1"
            className="text-6xl/[0.9] tracking-tight text-balance text-white sm:text-8xl/[0.8] md:text-9xl/[0.8]"
          >
            uOttawa Lab2Life
          </Heading>
          <p className="font-inter-semibold mx-auto mt-8 max-w-2xl text-xl/7 text-white/90 sm:mx-0 sm:text-2xl/8">
            Dedicated to promoting and helping students explore various careers in the field of
            healthcare and medicine.
          </p>
          <div className="mt-12 flex flex-row justify-center gap-3 sm:justify-start sm:gap-6">
            <Button
              href="/about-us"
              className="px-4 py-2 text-center text-sm sm:px-6 sm:py-3 sm:text-base"
            >
              About Us
            </Button>
            <Button
              variant="secondary"
              href="/general-member-sign-up"
              className="px-4 py-2 text-center text-sm sm:px-6 sm:py-3 sm:text-base"
            >
              General Member Sign-Up
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

function FeatureSection() {
  return (
    <div className="overflow-hidden">
      <Container className="pb-24">
        <Heading as="h2" className="max-w-3xl">
          Explore Healthcare Career Opportunities.
        </Heading>
        <Screenshot
          width={1216}
          height={768}
          src="/screenshots/app.png"
          className="mt-16 h-144 sm:h-auto sm:w-304"
        />
      </Container>
    </div>
  )
}

function BentoSection() {
  return (
    <Container>
      <Subheading>Opportunities</Subheading>
      <Heading as="h3" className="mt-2 max-w-3xl">
        Discover the diverse world of healthcare careers.
      </Heading>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        <BentoCard
          eyebrow="Medicine"
          title="Clinical Practice"
          description="Explore various medical specialties from family medicine to surgery. Learn about patient care, diagnosis, and treatment in diverse healthcare settings."
          graphic={
            <div className="h-80 bg-[url(/screenshots/profile.png)] bg-size-[1000px_560px] bg-position-[left_-109px_top_-112px] bg-no-repeat" />
          }
          fade={['bottom']}
          className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
        />
        <BentoCard
          eyebrow="Research"
          title="Healthcare Innovation"
          description="Discover opportunities in medical research, biotech, and pharmaceutical development. Join the effort to advance healthcare through scientific discovery."
          graphic={
            <div className="absolute inset-0 bg-[url(/screenshots/competitors.png)] bg-size-[1100px_650px] bg-position-[left_-38px_top_-73px] bg-no-repeat" />
          }
          fade={['bottom']}
          className="lg:col-span-3 lg:rounded-tr-4xl"
        />
        <BentoCard
          eyebrow="Technology"
          title="Health Informatics"
          description="Explore the intersection of healthcare and technology. Learn about electronic health records, data analysis, and digital health solutions."
          graphic={
            <div className="flex size-full pt-10 pl-10">
              <Keyboard highlighted={['LeftCommand', 'LeftShift', 'D']} />
            </div>
          }
          className="lg:col-span-2 lg:rounded-bl-4xl"
        />
        <BentoCard
          eyebrow="Administration"
          title="Healthcare Management"
          description="Discover leadership roles in healthcare organizations. Learn about hospital administration, policy development, and healthcare economics."
          graphic={<LogoCluster />}
          className="lg:col-span-2"
        />
        <BentoCard
          eyebrow="Global Health"
          title="International Impact"
          description="Explore global health initiatives and international medical missions. Make a difference in healthcare access worldwide."
          graphic={<Map />}
          className="max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl"
        />
      </div>
    </Container>
  )
}

function DarkBentoSection() {
  return (
    <div className="mx-2 mt-2 rounded-4xl bg-gray-900 py-32">
      <Container>
        <Subheading dark>Specializations</Subheading>
        <Heading as="h3" dark className="mt-2 max-w-3xl">
          Find your perfect healthcare specialty.
        </Heading>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <BentoCard
            dark
            eyebrow="Mental Health"
            title="Psychology & Counseling"
            description="Explore careers in mental health, from clinical psychology to social work. Help individuals and communities achieve better mental wellness."
            graphic={
              <div className="h-80 bg-[url(/screenshots/networking.png)] bg-size-[851px_344px] bg-no-repeat" />
            }
            fade={['top']}
            className="max-lg:rounded-t-4xl lg:col-span-4 lg:rounded-tl-4xl"
          />
          <BentoCard
            dark
            eyebrow="Therapy"
            title="Rehabilitation Services"
            description="Discover physical therapy, occupational therapy, and speech pathology careers. Help patients recover and regain independence."
            graphic={<LogoTimeline />}
            className="z-10 overflow-visible! lg:col-span-2 lg:rounded-tr-4xl"
          />
          <BentoCard
            dark
            eyebrow="Nursing"
            title="Patient Care Excellence"
            description="Explore diverse nursing specialties from critical care to community health. Provide compassionate, evidence-based patient care."
            graphic={<LinkedAvatars />}
            className="lg:col-span-2 lg:rounded-bl-4xl"
          />
          <BentoCard
            dark
            eyebrow="Public Health"
            title="Community Wellness"
            description="Learn about epidemiology, health promotion, and disease prevention. Work to improve population health and healthcare systems."
            graphic={
              <div className="h-80 bg-[url(/screenshots/engagement.png)] bg-size-[851px_344px] bg-no-repeat" />
            }
            fade={['top']}
            className="max-lg:rounded-b-4xl lg:col-span-4 lg:rounded-br-4xl"
          />
        </div>
      </Container>
    </div>
  )
}

export default function Homepage() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <main>
        <Countdown />
        <PodcastPreview />
        <LatestArticles />
        <Instagram />
        <Bounce />
        {/* <Container className="mt-10">
          <LogoCloud />
        </Container>
        <div className="bg-linear-to-b from-white from-50% to-gray-100 py-32">
          <FeatureSection />
          <BentoSection />
        </div>
        <DarkBentoSection /> */}
      </main>
      <Footer />
    </div>
  )
}
