'use client'

import { clsx } from 'clsx'
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import useMeasure from 'react-use-measure'
import { Container } from './container'
import { Heading } from './text'

const members = [
  {
    img: '/images/members-carousel/Sanjay Sathees Executive Photo.JPG',
    name: 'Sanjay Sathees',
    position: 'Co-President and Founder',
    education: '4th Year | B.Sc. Biomedical Science',
    email: 'uolab2life@gmail.com',
    linkedin: 'https://www.linkedin.com/in/sanjay-sathees/',
    zoom: 120,
  },
  {
    img: '/images/members-carousel/Bharat Yanala Executive Photo.JPG',
    name: 'Bharat Yanala',
    position: 'Co-President',
    education: '4th Year | B.HSc. Health Science',
    email: 'uolab2life@gmail.com',
    linkedin: 'https://www.linkedin.com/in/bharatyanala/',
  },
  {
    img: '/images/members-carousel/Parisha Baral Executive Photo.JPG',
    name: 'Parisha Baral',
    position: 'VP Internal Operations',
    education: '1st Year | B.Sc. Biomedical Science',
    email: 'internals.uol2l@gmail.com',
    linkedin: '',
    zoom: 110,
  },
  {
    img: '/images/members-carousel/Maya Labbe Executive Photos.JPG',
    name: 'Maya Labbé',
    position: 'VP Finance',
    education: '4th Year | B.HSc. Health Science',
    email: 'finance.uol2l@gmail.com',
    linkedin: 'https://www.linkedin.com/in/maya-labb%C3%A9-85987a298/',
    imagePosition: 'center',
  },
  {
    img: '/images/members-carousel/Eshal Uddin Executive Photo.JPG',
    name: 'Eshal Uddin',
    position: 'VP External Affairs',
    education: '4th Year | B.Sc. Biomedical Science',
    email: 'externals.uol2l@gmail.com',
    linkedin: 'https://www.linkedin.com/in/eshal-uddin-5019b9267/',
  },
  {
    img: '/images/members-carousel/Meera Harahsha Executive Photo.JPG',
    name: 'Meera Harahsha',
    position: 'VP External Affairs',
    education: '2nd Year | B.HSc Health Science',
    email: 'externals.uol2l@gmail.com',
    linkedin: '',
    zoom: 150,
  },
  {
    img: '/images/members-carousel/Maeve McAneney Executive Photo.JPG',
    name: 'Maeve McAneney',
    position: 'VP Events',
    education: '2nd Year | B.HSc Health Science',
    email: 'events.uol2l@gmail.com',
    linkedin: 'https://www.linkedin.com/in/maeve-mcaneney-88259121b/',
    zoom: 150,
  },
  {
    img: '/images/members-carousel/Ghazal Farahmand Executive Photo.JPG',
    name: 'Ghazal Farahmand',
    position: 'VP Marketing',
    education: '3rd Year | B.Sc. Biomedical Science',
    email: 'marketing.uol2l@gmail.com',
    linkedin: 'https://www.linkedin.com/in/ghazal-farahmand-226600310/',
  },
  {
    img: '/images/members-carousel/Jasmin Yermashova Executive Photo.jpg',
    name: 'Jasmin Yermashova',
    position: 'VP Graphic Design',
    education: '4th Year | B.Sc. Biology',
    email: 'design.uol2l@gmail.com',
    linkedin: 'https://www.linkedin.com/in/jasmin-yermashova/',
  },
  {
    img: '/images/members-carousel/Nahiyan Ishtiaque Executive Photo.JPG',
    name: 'Nahiyan Ishtiaque',
    position: 'Webmaster',
    education: '4th Year | B.Sc Computer Science',
    email: 'webmaster.uol2l@gmail.com',
    linkedin: 'https://www.linkedin.com/in/nahiyan-ishtiaque/',
    imagePosition: 'center',
    zoom: 130,
  },
  {
    img: '/images/members-carousel/Onur Onel Executive Photo.JPG',
    name: 'Onur Onel',
    position: 'Webmaster',
    education: '2nd Year | B.Sc. Computer Science',
    email: 'webmaster.uol2l@gmail.com',
    linkedin: 'https://www.linkedin.com/in/onuronel13/',
    imagePosition: 'center',
    zoom: 130,
  },
  {
    img: '/images/members-carousel/Maroun Tarabey Executive Photo.JPG',
    name: 'Maroun Tarabey',
    position: 'Editor-in-Chief',
    education: '2nd Year | B.Sc. Biochemistry',
    email: 'editor.uol2l@gmail.com',
    linkedin: 'https://www.linkedin.com/in/maroun-tarabey-55a88b2a7/',
    imagePosition: 'center',
    zoom: 130,
  },
  {
    img: '/images/members-carousel/Maya Alali Executive Photo.JPG',
    name: 'Maya Alali',
    position: 'Podcast Producer',
    education: '2nd Year | B.Sc. Biomedical Science',
    email: 'podcast.uol2l@gmail.com',
    linkedin: 'https://www.linkedin.com/in/maya-al-ali-676a31371/',
    zoom: 180,
  },
  {
    img: '/images/members-carousel/Lacey Mullin Executive Photo.JPG',
    name: 'Lacey Mullin',
    position: 'Upper Year Representative',
    education: '4th Year | B.Sc. Biopharm. Science',
    email: 'representatives.uol2l@gmail.com',
    linkedin: 'https://www.linkedin.com/in/lacey-mullin-209963327/',
  },
  {
    img: '/images/members-carousel/Anoosha Rehman Executive Photo.JPG',
    name: 'Anoosha Rehman',
    position: 'Lower Year Representative',
    education: '2nd Year | B.Sc. Biomedical Science',
    email: 'representatives.uol2l@gmail.com',
    linkedin: '',
  },
]

function MemberCard({
  name,
  position,
  education,
  email,
  linkedin,
  img,
  zoom,
  imagePosition,
  bounds,
  scrollX,
  ...props
}) {
  let ref = useRef(null)

  let computeOpacity = useCallback(() => {
    let element = ref.current
    if (!element || bounds.width === 0) return 1

    let rect = element.getBoundingClientRect()

    if (rect.left < bounds.left) {
      let diff = bounds.left - rect.left
      let percent = diff / rect.width
      return Math.max(0.5, 1 - percent)
    } else if (rect.right > bounds.right) {
      let diff = rect.right - bounds.right
      let percent = diff / rect.width
      return Math.max(0.5, 1 - percent)
    } else {
      return 1
    }
  }, [ref, bounds.width, bounds.left, bounds.right])

  let opacity = useSpring(computeOpacity(), {
    stiffness: 154,
    damping: 23,
  })

  useLayoutEffect(() => {
    opacity.set(computeOpacity())
  }, [computeOpacity, opacity])

  useMotionValueEvent(scrollX, 'change', () => {
    opacity.set(computeOpacity())
  })

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      {...props}
      className="relative flex aspect-3/4 w-64 sm:w-80 md:w-96 shrink-0 snap-start scroll-ml-(--scroll-padding) flex-col justify-end overflow-hidden rounded-3xl mx-auto"
    >
      <img
        alt=""
        src={img}
        className={`absolute inset-x-0 top-0 aspect-square w-full ${
          imagePosition === 'top' ? 'object-top' : 
          imagePosition === 'bottom' ? 'object-bottom' : 
          'object-center'
        } object-cover`}
        style={zoom ? { transform: `scale(${zoom / 100})` } : undefined}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl bg-linear-to-t from-black from-[calc(3/16*100%)] ring-1 ring-gray-950/10 ring-inset sm:from-25%"
      />
      <figure className="relative p-6 sm:p-8 md:p-10">
        <figcaption className="mt-4 sm:mt-6">
          <div className="space-y-0.5 sm:space-y-1">
            <p className="font-inter font-medium text-xl sm:text-2xl md:text-3xl text-white">{name}</p>
            <p className="font-inter font-medium text-sm sm:text-base md:text-lg text-[#b184e9]">{position}</p>
            <p className="font-inter-semibold text-xs sm:text-sm leading-tight text-white">{education}</p>
          </div>

          <div className="mt-2 sm:mt-4 flex gap-3">
            <a
              href={`mailto:${email}`}
              className="rounded-full bg-white/10 p-1.5 sm:p-2 transition-colors hover:bg-[#003e3e]"
              aria-label={`Email ${name}`}
            >
              <svg className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </a>
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 p-1.5 sm:p-2 transition-colors hover:bg-[#003e3e]"
                aria-label={`${name}'s LinkedIn`}
              >
                <svg className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.328v15.344C1 18.4 1.595 19 2.328 19h15.34c.734 0 1.332-.598 1.332-1.328V2.328C19 1.581 18.402 1 17.668 1z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            )}
          </div>
        </figcaption>
      </figure>
    </motion.div>
  )
}

export function MembersCarousel() {
  let scrollRef = useRef(null)
  let { scrollX } = useScroll({ container: scrollRef })
  let [setReferenceWindowRef, bounds] = useMeasure()
  let [activeIndex, setActiveIndex] = useState(0)
  let [isHovered, setIsHovered] = useState(false)
  let [isManuallyPaused, setIsManuallyPaused] = useState(false)
  let intervalRef = useRef(null)
  let pauseTimeoutRef = useRef(null)

  useMotionValueEvent(scrollX, 'change', (x) => {
    if (scrollRef.current?.children[0]?.clientWidth) {
      const gap = 32
      const itemWidth = scrollRef.current.children[0].clientWidth
      const itemWithGap = itemWidth + gap
      setActiveIndex(Math.round(x / itemWithGap))
    }
  })

  const scrollTo = useCallback(
    (index) => {
      let gap = 32
      let width = scrollRef.current?.children[0]?.offsetWidth
      if (width) {
        scrollRef.current.scrollTo({ left: (width + gap) * index })
        setActiveIndex(index)

        if (index >= members.length + members.length * 100) {
          setTimeout(() => {
            if (scrollRef.current) {
              scrollRef.current.scrollTo({ left: 0, behavior: 'auto' })
              setActiveIndex(0)
            }
          }, 100)
        }
      }
    },
    [members.length],
  )

  const handleMemberClick = useCallback(
    (index) => {
      scrollTo(index)

      setIsManuallyPaused(true)

      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current)
      }

      pauseTimeoutRef.current = setTimeout(() => {
        setIsManuallyPaused(false)
      }, 5000)
    },
    [scrollTo],
  )

  useEffect(() => {
    function startAutoScroll() {
      const timeoutId = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          if (!isHovered && !isManuallyPaused && scrollRef.current) {
            let nextIndex = activeIndex + 1

            if (nextIndex >= members.length) {
              scrollTo(nextIndex)
            } else {
              scrollTo(nextIndex)
            }
          }
        }, 3000)
      }, 1000)

      return timeoutId
    }

    function stopAutoScroll() {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    if (!isHovered && !isManuallyPaused) {
      const timeoutId = startAutoScroll()
      return () => {
        clearTimeout(timeoutId)
        stopAutoScroll()
      }
    } else {
      stopAutoScroll()
    }
  }, [activeIndex, isHovered, isManuallyPaused, scrollTo])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0 })
      setActiveIndex(0)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="overflow-hidden pt-8 pb-8 sm:pt-16 sm:pb-16">
      <Container>
        <div ref={setReferenceWindowRef} className="text-center">
          <Heading as="h3" className="mt-2 text-[#003e3e]">
            Meet the team!
          </Heading>
          <p className="font-inter-semibold mx-auto mt-4 max-w-2xl text-lg/7 text-gray-600">
            Meet the dedicated students behind uOttawa Lab2Life
          </p>
        </div>
      </Container>
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={clsx([
          'mt-16 flex gap-8 px-(--scroll-padding)',
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          'snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth',
          '[--scroll-padding:max(--spacing(6),calc((100vw-(var(--container-2xl)))/2))] lg:[--scroll-padding:max(--spacing(8),calc((100vw-(var(--container-7xl)))/2))]',
        ])}
      >
        {members.map(({ img, name, position, education, email, linkedin, zoom, imagePosition }, memberIndex) => (
          <MemberCard
            key={memberIndex}
            name={name}
            position={position}
            education={education}
            email={email}
            linkedin={linkedin}
            img={img}
            zoom={zoom}
            imagePosition={imagePosition}
            bounds={bounds}
            scrollX={scrollX}
            onClick={() => handleMemberClick(memberIndex)}
          />
        ))}

        {Array.from({ length: 50 }, (_, repeatIndex) =>
          members.map(({ img, name, position, education, email, linkedin, zoom, imagePosition }, cardIndex) => {
            const actualIndex = members.length + (repeatIndex * members.length) + cardIndex
            return (
              <MemberCard
                key={`repeat-${repeatIndex}-${cardIndex}`}
                name={name}
                position={position}
                education={education}
                email={email}
                linkedin={linkedin}
                img={img}
                zoom={zoom}
                imagePosition={imagePosition}
                bounds={bounds}
                scrollX={scrollX}
                onClick={() => handleMemberClick(actualIndex)}
              />
            )
          }),
        )}

        <div className="w-2xl shrink-0 sm:w-216" />

        <div className="w-2xl shrink-0 sm:w-216" />
      </div>
    </div>
  )
}
