'use client'

import { SuccessModal } from '@/components/contact-us/modal'
import { Container } from '@/components/home/container'
import { Footer } from '@/components/home/footer'
import { Gradient } from '@/components/home/gradient'
import { Navbar } from '@/components/home/navbar'
import { Heading } from '@/components/home/text'
import { supabase } from '@/lib/supabase/client'
import { useTranslation } from '@/contexts/LanguageContext'
import { useEffect, useState } from 'react'

export default function ContactezNous() {
  const { t } = useTranslation()
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
        email: 'Veuillez entrer une adresse e-mail valide',
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
      newErrors.name = t('contact.form.errors.nameRequired')
    }
    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.errors.emailRequired')
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('contact.form.errors.emailInvalid')
    }
    if (!formData.subject.trim()) {
      newErrors.subject = t('contact.form.errors.subjectRequired')
    }
    if (!formData.message.trim()) {
      newErrors.message = t('contact.form.errors.messageRequired')
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
        setErrors({ submit: t('contact.form.errors.submitFailed') })
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
      setErrors({ submit: t('contact.form.errors.submitFailed') })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="overflow-hidden">
      <div className="relative">
        <Gradient className="rounded-4xl absolute inset-2 bottom-0 ring-1 ring-inset ring-black/5" />
        <Container className="relative pb-12">
          <Navbar />
        </Container>
      </div>

      <div className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
              <Heading as="h2" className="mx-auto max-w-3xl">
                {t('contact.title')}
              </Heading>
              <p className="mt-6 text-2xl text-gray-600">{t('contact.subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} method="post" className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#003e3e]">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg border bg-white px-4 py-3 text-[#003e3e] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#003e3e] ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: 'white' }}
                  placeholder={t('contact.form.namePlaceholder')}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#003e3e]">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleEmailBlur}
                  onInvalid={handleEmailInvalid}
                  className={`w-full rounded-lg border bg-white px-4 py-3 text-[#003e3e] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#003e3e] ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: 'white' }}
                  placeholder={t('contact.form.emailPlaceholder')}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-[#003e3e]">
                  {t('contact.form.subject')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg border bg-white px-4 py-3 text-[#003e3e] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#003e3e] ${
                    errors.subject ? 'border-red-500' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: 'white' }}
                  placeholder={t('contact.form.subjectPlaceholder')}
                />
                {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-[#003e3e]">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className={`w-full resize-none overflow-hidden rounded-lg border bg-white px-4 py-3 text-[#003e3e] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#003e3e] ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={t('contact.form.messagePlaceholder')}
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
                      : 'bg-[#99c96f] text-[#003e3e] cursor-pointer'
                  }`}
                  style={{
                    border: '1px solid transparent',
                    transition: 'all 0.3s ease-in-out'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.target.style.backgroundColor = 'white'
                      e.target.style.borderColor = '#003e3e'
                      e.target.style.color = '#003e3e'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.target.style.backgroundColor = '#99c96f'
                      e.target.style.borderColor = 'transparent'
                      e.target.style.color = '#003e3e'
                    }
                  }}
                >
                  {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
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