import { PlusGrid, PlusGridItem, PlusGridRow } from '@/components/home/plus-grid'
import { Container } from './container'
import { Gradient } from './gradient'
import { Link } from './link'

// function CallToAction() {
//   return (
//     <div className="relative pt-20 pb-16 text-center sm:py-24">
//       <hgroup>
//         <Subheading>Get started</Subheading>
//       </hgroup>
//       <p className="mx-auto mt-6 max-w-xs text-sm/6 text-gray-500">
//         Get the cheat codes for selling and unlock your team&apos;s revenue
//         potential.
//       </p>
//       <div className="mt-6">
//         <Button className="w-full sm:w-auto" href="#">
//           Get started
//         </Button>
//       </div>
//     </div>
//   )
// }

function SitemapHeading({ children }) {
  return <h3 className="text-sm/6 font-semibold text-gray-950/50">{children}</h3>
}

function SitemapLinks({ children }) {
  return <ul className="mt-6 space-y-4 text-base/6">{children}</ul>
}

function SitemapLink(props) {
  return (
    <li>
      <a
        {...props}
        className="inline-block transform-gpu font-semibold text-[#003e3e] transition-transform duration-500 ease-out will-change-transform hover:scale-105 hover:text-[#003e3e]/75"
      />
    </li>
  )
}

function Sitemap() {
  return (
    <>
      <div>
        {/* <SitemapHeading>Product</SitemapHeading> */}
        <SitemapLinks>
          <SitemapLink href="/">Home</SitemapLink>
          <SitemapLink href="/about-us">About Us</SitemapLink>
        </SitemapLinks>
      </div>
      <div>
        {/* <SitemapHeading>Company</SitemapHeading> */}
        <SitemapLinks>
          <SitemapLink href="/general-member-sign-up">General Sign-Up</SitemapLink>
          <SitemapLink href="/docs">Articles</SitemapLink>
        </SitemapLinks>
      </div>
      <div>
        {/* <SitemapHeading>Support</SitemapHeading> */}
        <SitemapLinks>
          <SitemapLink href="/podcasts">Podcasts</SitemapLink>
          <SitemapLink href="/events">Events</SitemapLink>
        </SitemapLinks>
      </div>
      <div>
        {/* <SitemapHeading>Company</SitemapHeading> */}
        <SitemapLinks>
          <SitemapLink href="/contact-us">Contact Us</SitemapLink>
          <SitemapLink href="/">Privacy Policy</SitemapLink>
          <SitemapLink href="/">Terms of Service</SitemapLink>
        </SitemapLinks>
      </div>
    </>
  )
}

function SocialIconTikTok(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  )
}

function SocialIconYouTube(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

function SocialIconLinkedIn(props) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M14.82 0H1.18A1.169 1.169 0 000 1.154v13.694A1.168 1.168 0 001.18 16h13.64A1.17 1.17 0 0016 14.845V1.15A1.171 1.171 0 0014.82 0zM4.744 13.64H2.369V5.996h2.375v7.644zm-1.18-8.684a1.377 1.377 0 11.52-.106 1.377 1.377 0 01-.527.103l.007.003zm10.075 8.683h-2.375V9.921c0-.885-.015-2.025-1.234-2.025-1.218 0-1.425.966-1.425 1.968v3.775H6.233V5.997H8.51v1.05h.032c.317-.601 1.09-1.235 2.246-1.235 2.405-.005 2.851 1.578 2.851 3.63v4.197z" />
    </svg>
  )
}

function SocialIconInstagram(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function SocialLinks() {
  return (
    <>
      <Link
        href="https://instagram.com/uolab2life"
        target="_blank"
        aria-label="Visit us on Instagram"
        className="text-[#003e3e] transition-transform duration-300 ease-out hover:scale-110 data-hover:text-[#003e3e]/75"
      >
        <SocialIconInstagram className="size-4.5" />
      </Link>
      <Link
        href="https://www.tiktok.com/@uolab2life"
        target="_blank"
        aria-label="Visit us on TikTok"
        className="text-[#003e3e] data-hover:text-[#003e3e]/75 hover:scale-110 transition-transform duration-300 ease-out"
      >
        <SocialIconTikTok className="size-4" />
      </Link>
      <Link
        href="https://www.linkedin.com/company/uolab2life/"
        target="_blank"
        aria-label="Visit us on LinkedIn"
        className="text-[#003e3e] transition-transform duration-300 ease-out hover:scale-110 data-hover:text-[#003e3e]/75"
      >
        <SocialIconLinkedIn className="size-4" />
      </Link>
      <Link
        href="https://www.youtube.com/@uOttawa-Lab2Life"
        target="_blank"
        aria-label="Visit us on YouTube"
        className="text-[#003e3e] data-hover:text-[#003e3e]/75 hover:scale-110 transition-transform duration-300 ease-out"
      >
        <SocialIconYouTube className="size-4" />
      </Link>
    </>
  )
}

function Copyright() {
  return (
    <div className="text-base/6 text-[#003e3e]">
      &copy; {new Date().getFullYear()} uOttawa Lab2Life
    </div>
  )
}

export function Footer() {
  return (
    <footer>
      <Gradient className="relative">
        <div className="absolute inset-2 rounded-4xl bg-white/80" />
        <Container>
          {/* <CallToAction /> */}
          <PlusGrid className="pt-16 pb-16">
            <PlusGridRow>
              <div className="grid grid-cols-2 gap-y-10 pb-6 lg:grid-cols-6 lg:gap-8">
                <div className="col-span-2 flex">
                  <PlusGridItem className="pt-8 lg:pb-6">
                    <div className="flex items-center gap-3">
                      <img
                        src="/images/home/uolab2life_logo_no_bg.png"
                        alt="Lab2Life"
                        className="h-11 w-auto"
                      />
                      <span className="text-xl font-semibold text-[#003e3e]">uOttawa Lab2Life</span>
                    </div>
                    <p className="mt-4 max-w-xs text-base text-gray-600">
                      Dedicated to promoting and helping students explore various careers in the
                      field of healthcare and medicine.
                    </p>
                  </PlusGridItem>
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-x-8 gap-y-12 lg:col-span-4 lg:grid-cols-subgrid lg:pt-6">
                  <Sitemap />
                </div>
              </div>
            </PlusGridRow>
            <PlusGridRow className="flex justify-between">
              <div>
                <PlusGridItem className="py-3">
                  <Copyright />
                </PlusGridItem>
              </div>
              <div className="flex">
                <PlusGridItem className="flex items-center gap-8 py-3">
                  <SocialLinks />
                </PlusGridItem>
              </div>
            </PlusGridRow>
          </PlusGrid>
        </Container>
      </Gradient>
    </footer>
  )
}
