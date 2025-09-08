'use client'

import { SuccessModal } from '@/components/contact-us/modal'
import { Container } from '@/components/home/container'
import { Footer } from '@/components/home/footer'
import { Gradient } from '@/components/home/gradient'
import { Navbar } from '@/components/home/navbar'
import { Heading } from '@/components/home/text'
import { supabase } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (formData.message === '') {
      const textarea = document.getElementById('message')
      if (textarea) {
        textarea.style.height = '120px'
      }
    }
  }, [formData.message])

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleEmailBlur = (e) => {
    const email = e.target.value.trim()
    if (email && !validateEmail(email)) {
      setErrors((prev) => ({
        ...prev,
        email: 'Please enter a valid email address',
      }))
    }
  }

  const handleEmailInvalid = (e) => {
    e.preventDefault()
    const email = e.target.value.trim()
    if (email) {
      setErrors((prev) => ({
        ...prev,
        email: e.target.validationMessage,
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const { data, error } = await supabase.from('Questions').insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
      ])

      if (error) {
        console.error('Error saving to Supabase:', error)
        setErrors({ submit: 'Failed to send message. Please try again.' })
        return
      }

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
      setErrors({})
      setIsModalOpen(true)
    } catch (error) {
      console.error('Error:', error)
      setErrors({ submit: 'Failed to send message. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="overflow-hidden">
      <div className="relative">
        <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
        <Container className="relative pb-12">
          <Navbar />
        </Container>
      </div>

      <div className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="mb-16 text-center">
              <Heading as="h2" className="mx-auto max-w-3xl">
                Contact Us
              </Heading>
              <p className="mt-6 text-2xl text-gray-600">
                Get in touch with our team below!
              </p>
            </div>

            <form onSubmit={handleSubmit} method="post" className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#003e3e]">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg border bg-white px-4 py-3 text-[#003e3e] placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-[#003e3e] focus:outline-none ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Your full name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#003e3e]">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleEmailBlur}
                  onInvalid={handleEmailInvalid}
                  className={`w-full rounded-lg border bg-white px-4 py-3 text-[#003e3e] placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-[#003e3e] focus:outline-none ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-[#003e3e]">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg border bg-white px-4 py-3 text-[#003e3e] placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-[#003e3e] focus:outline-none ${
                    errors.subject ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="What's this about?"
                />
                {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-[#003e3e]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className={`w-full resize-none overflow-hidden rounded-lg border bg-white px-4 py-3 text-[#003e3e] placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-[#003e3e] focus:outline-none ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tell us more about your inquiry..."
                  style={{ minHeight: '120px' }}
                  onInput={(e) => {
                    e.target.style.height = 'auto'
                    e.target.style.height = e.target.scrollHeight + 'px'
                  }}
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>

              {errors.submit && (
                <div className="pt-2">
                  <p className="text-sm text-red-600">{errors.submit}</p>
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full rounded-full px-8 py-4 font-semibold shadow-md transition-all duration-300 ${
                    isSubmitting
                      ? 'cursor-not-allowed bg-gray-400 text-gray-600'
                      : 'bg-[#99c96f] text-[#003e3e] hover:border hover:border-[#003e3e] hover:bg-white'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </Container>
      </div>

      <Footer />

      <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}
