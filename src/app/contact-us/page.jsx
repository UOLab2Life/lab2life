'use client'

import { useState, useEffect } from 'react'
import { Container } from '@/components/home/container'
import { Footer } from '@/components/home/footer'
import { Gradient } from '@/components/home/gradient'
import { Navbar } from '@/components/home/navbar'
import { Heading } from '@/components/home/text'
import { SuccessModal } from './modal'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)

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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleEmailBlur = (e) => {
    const email = e.target.value.trim()
    if (email && !validateEmail(email)) {
      setErrors(prev => ({
        ...prev,
        email: 'Please enter a valid email address'
      }))
    }
  }

  const handleEmailInvalid = (e) => {
    e.preventDefault()
    const email = e.target.value.trim()
    if (email) {
      setErrors(prev => ({
        ...prev,
        email: e.target.validationMessage
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

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
    setErrors({})
    setIsModalOpen(true)
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
            <div className="text-center mb-16">
              <Heading as="h2" className="mx-auto max-w-3xl">
                Contact Us
              </Heading>
              <p className="mt-6 text-lg text-gray-600">
                Have any questions about our club? Get in touch with our team below!
              </p>
            </div>

            <form onSubmit={handleSubmit} method="post" className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#003e3e] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white border rounded-lg text-[#003e3e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003e3e] focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Your full name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#003e3e] mb-2">
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
                  className={`w-full px-4 py-3 bg-white border rounded-lg text-[#003e3e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003e3e] focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[#003e3e] mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white border rounded-lg text-[#003e3e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003e3e] focus:border-transparent ${
                    errors.subject ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="What's this about?"
                />
                {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#003e3e] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className={`w-full px-4 py-3 bg-white border rounded-lg text-[#003e3e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003e3e] focus:border-transparent resize-none overflow-hidden ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tell us more about your inquiry..."
                  style={{ minHeight: '120px' }}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#99c96f] hover:bg-white hover:border hover:border-[#003e3e] text-[#003e3e] font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-md"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </Container>
      </div>

      <Footer />
      
      <SuccessModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </main>
  )
}
