import blurCyanImage from '@/assets/articles/images/blur-cyan.png'
import blurIndigoImage from '@/assets/articles/images/blur-indigo.png'
import { HeroBackground } from '@/components/articles/hero-background'
import Image from 'next/image'

export function Hero() {
  return (
    <div className="dark:-mt-19 dark:pt-19 overflow-hidden bg-[#003e3e] dark:-mb-32 dark:pb-32">
      <div className="py-16 sm:px-2 lg:relative lg:px-0 lg:py-20">
        <div className="lg:max-w-8xl mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
          <div className="relative z-10 md:text-center lg:text-left">
            <Image
              className="absolute bottom-full right-full -mb-56 -mr-72 opacity-50"
              src={blurCyanImage}
              alt=""
              width={530}
              height={530}
              unoptimized
              priority
            />
            <div className="relative">
              <p className="bg-linear-to-r font-display inline from-indigo-200 via-violet-400 to-indigo-200 bg-clip-text text-5xl tracking-tight text-transparent">
                Explore Featured Articles
              </p>
              <p className="mt-3 text-2xl tracking-tight text-slate-400">
                Find our monthly articles passionately written by our representatives covering
                diverse medical themes.
              </p>
            </div>
          </div>
          <div className="relative lg:static xl:pl-10">
            <div className="mask-[linear-gradient(transparent,white,white)] lg:mask-none dark:mask-[linear-gradient(transparent,white,transparent)] lg:dark:mask-[linear-gradient(white,white,transparent)] absolute inset-x-[-50vw] -bottom-48 -top-32 lg:-bottom-32 lg:-top-32 lg:left-[calc(50%+14rem)] lg:right-0">
              <HeroBackground className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-0 lg:translate-x-0 lg:translate-y-[-60%]" />
            </div>
            <div className="relative">
              <Image
                className="absolute -right-64 -top-64"
                src={blurCyanImage}
                alt=""
                width={530}
                height={530}
                unoptimized
                priority
              />
              <Image
                className="absolute -bottom-40 -right-44"
                src={blurIndigoImage}
                alt=""
                width={567}
                height={567}
                unoptimized
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
