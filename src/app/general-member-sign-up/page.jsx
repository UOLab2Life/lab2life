import { Footer } from '@/components/home/footer'
import { Navbar } from '@/components/home/navbar'
import { Container } from '@/components/home/container'
import { Gradient } from '@/components/home/gradient'
import { Link } from '@/components/home/link'
import { ChevronRightIcon } from '@heroicons/react/16/solid'

export default function GeneralMemberSignUp() {
    return (
        <main className="overflow-hidden">
            <div className="relative">
                <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
                <Container className="relative pb-12">
                    <Navbar
                        banner={
                            <Link
                                href="/blog/radiant-raises-100m-series-a-from-tailwind-ventures"
                                className="flex items-center gap-1 rounded-full bg-[#99c96f]/35 px-3 py-0.5 text-sm/6 font-inter-semibold text-white data-hover:bg-[#99c96f]/30"
                            >
                                uOttawa Lab2Life Club Fair - September 3rd, 2025
                                <ChevronRightIcon className="size-4" />
                            </Link>
                        }
                    />
                </Container>
            </div>
            
            <div className="py-16 sm:py-24">
                <Container>
                    <div className="mx-auto max-w-6xl text-center">
                        <h1 className="text-4xl font-bold text-[#003e3e] sm:text-6xl">
                            General Member Sign Up
                        </h1>
                        <p className="mt-6 text-lg text-gray-600">
                            Join uOttawa Lab2Life and explore healthcare career opportunities with other passionate students.
                        </p>
                        
                        <div className="mt-16">
                            <iframe
                                src="https://docs.google.com/forms/d/e/1FAIpQLSfdv9Ik4bUylJax_Cupn21rFw6P-tImmtBkk_2TuSUTJSSZAw/viewform?embedded=true"
                                width="100%"
                                height="800"
                                frameBorder="0"
                                marginHeight="0"
                                marginWidth="0"
                                title="uOttawa Lab2Life General Member Sign-Up 2025-2026"
                                className="rounded-lg shadow-3xl shadow-[#003e3e]/60 shadow-lg"
                            >
                                Loading…
                            </iframe>
                        </div>
                    </div>
                </Container>
            </div>
            
            <Footer />
        </main>
    )
}
