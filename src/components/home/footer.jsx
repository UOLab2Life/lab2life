import { PlusGrid, PlusGridItem, PlusGridRow } from '@/components/home/plus-grid'
import { Button } from './button'
import { Container } from './container'
import { Gradient } from './gradient'
import { Link } from './link'
import { Logo } from './logo'
import { Subheading } from './text'

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
  return <h3 className="text-sm/6 font-inter-semibold text-gray-950/50">{children}</h3>
}

function SitemapLinks({ children }) {
  return <ul className="mt-6 space-y-4 text-base/6">{children}</ul>
}

function SitemapLink(props) {
  return (
    <li>
      <a
        {...props}
        className="font-inter-semibold text-[#003e3e] hover:text-[#003e3e]/75 hover:scale-105 transition-transform duration-500 ease-out inline-block will-change-transform transform-gpu"
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

function SocialIconX(props) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M12.6 0h2.454l-5.36 6.778L16 16h-4.937l-3.867-5.594L2.771 16H.316l5.733-7.25L0 0h5.063l3.495 5.114L12.6 0zm-.86 14.376h1.36L4.323 1.539H2.865l8.875 12.837z" />
    </svg>
  )
}

function SocialIconFacebook(props) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 8.05C16 3.603 12.418 0 8 0S0 3.604 0 8.05c0 4.016 2.926 7.346 6.75 7.95v-5.624H4.718V8.05H6.75V6.276c0-2.017 1.194-3.131 3.022-3.131.875 0 1.79.157 1.79.157v1.98h-1.008c-.994 0-1.304.62-1.304 1.257v1.51h2.219l-.355 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.95z"
      />
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
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
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
        className="text-[#003e3e] data-hover:text-[#003e3e]/75 hover:scale-110 transition-transform duration-300 ease-out"
      >
        <SocialIconInstagram className="size-4.5" />
      </Link>
      <Link
        href="https://www.linkedin.com/company/uolab2life/"
        target="_blank"
        aria-label="Visit us on LinkedIn"
        className="text-[#003e3e] data-hover:text-[#003e3e]/75 hover:scale-110 transition-transform duration-300 ease-out"
      >
        <SocialIconLinkedIn className="size-4" />
      </Link>
      <Link
        href="https://x.com"
        target="_blank"
        aria-label="Visit us on X"
        className="text-[#003e3e] data-hover:text-[#003e3e]/75 hover:scale-110 transition-transform duration-300 ease-out"
      >
        <SocialIconX className="size-4" />
      </Link>
      <Link
        href="https://facebook.com"
        target="_blank"
        aria-label="Visit us on Facebook"
        className="text-[#003e3e] data-hover:text-[#003e3e]/75 hover:scale-110 transition-transform duration-300 ease-out"
      >
        <SocialIconFacebook className="size-4" />
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
                        <img src="/images/home/uolab2life_logo_no_bg.png" alt="Lab2Life" className="h-11 w-auto" />
                        <span className="font-inter-semibold text-[#003e3e] text-xl">uOttawa Lab2Life</span>
                      </div>
                      <p className="mt-4 text-base text-gray-600 max-w-xs">
                        Dedicated to promoting and helping students explore various careers in the field of healthcare and medicine.
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
