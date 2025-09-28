'use client'

import { Container } from '@/components/home/container'
import { Footer } from '@/components/home/footer'
import { Gradient } from '@/components/home/gradient'
import { Navbar } from '@/components/home/navbar'
import { Heading, Subheading } from '@/components/home/text'
import { useState } from 'react'
import { SuccessModal } from './success-modal'
import { useTranslation } from '@/contexts/LanguageContext'

export default function GeneralMemberSignUp() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studentNumber: '',
    year: '',
    faculty: '',
    program: '',
    interest: '',
    events: '',
  })
  const [errors, setErrors] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateUOttawaEmail = (email) => {
    const uottawaEmailRegex = /^[a-zA-Z0-9._%+-]+@uottawa\.ca$/
    return uottawaEmailRegex.test(email)
  }

  const validateStudentNumber = (studentNumber) => {
    const studentNumberRegex = /^\d{9}$/
    return studentNumberRegex.test(studentNumber)
  }

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s\-']+$/
    return nameRegex.test(name) && name.trim().length >= 2
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
    if (name === 'firstName' && value.trim()) {
      if (!validateName(value)) {
        setErrors((prev) => ({
          ...prev,
          firstName: t('memberSignUp.form.errors.firstNameInvalid') || 'First name should only contain letters, spaces, hyphens, and apostrophes (minimum 2 characters)',
        }))
      }
    }

    if (name === 'lastName' && value.trim()) {
      if (!validateName(value)) {
        setErrors((prev) => ({
          ...prev,
          lastName: t('memberSignUp.form.errors.lastNameInvalid') || 'Last name should only contain letters, spaces, hyphens, and apostrophes (minimum 2 characters)',
        }))
      }
    }

    if (name === 'studentNumber' && value.trim()) {
      if (!validateStudentNumber(value)) {
        setErrors((prev) => ({
          ...prev,
          studentNumber: t('memberSignUp.form.errors.studentNumberInvalid') || 'Student number must be exactly 9 digits',
        }))
      }
    }

    if (name === 'email' && value.trim()) {
      if (!validateUOttawaEmail(value)) {
        setErrors((prev) => ({
          ...prev,
          email: t('memberSignUp.form.errors.emailInvalid') || 'Please use your uOttawa email address (@uottawa.ca)',
        }))
      }
    }
  }

  const handleEmailBlur = (e) => {
    const email = e.target.value.trim()
    if (email && !validateUOttawaEmail(email)) {
      setErrors((prev) => ({
        ...prev,
        email: t('memberSignUp.form.errors.emailInvalid') || 'Please use your uOttawa email address (@uottawa.ca)',
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('memberSignUp.form.errors.firstNameRequired') || 'First name is required'
    } else if (!validateName(formData.firstName)) {
      newErrors.firstName = t('memberSignUp.form.errors.firstNameInvalid') || 'First name should only contain letters, spaces, hyphens, and apostrophes (minimum 2 characters)'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t('memberSignUp.form.errors.lastNameRequired') || 'Last name is required'
    } else if (!validateName(formData.lastName)) {
      newErrors.lastName = t('memberSignUp.form.errors.lastNameInvalid') || 'Last name should only contain letters, spaces, hyphens, and apostrophes (minimum 2 characters)'
    }

    if (!formData.email.trim()) {
      newErrors.email = t('memberSignUp.form.errors.emailRequired') || 'Email is required'
    } else if (!validateUOttawaEmail(formData.email)) {
      newErrors.email = t('memberSignUp.form.errors.emailInvalid') || 'Please use your uOttawa email address (@uottawa.ca)'
    }

    if (!formData.studentNumber.trim()) {
      newErrors.studentNumber = t('memberSignUp.form.errors.studentNumberRequired') || 'Student number is required'
    } else if (!validateStudentNumber(formData.studentNumber)) {
      newErrors.studentNumber = t('memberSignUp.form.errors.studentNumberInvalid') || 'Student number must be exactly 9 digits'
    }

    if (!formData.year) {
      newErrors.year = t('memberSignUp.form.errors.yearRequired') || 'Year is required'
    }

    if (!formData.faculty) {
      newErrors.faculty = t('memberSignUp.form.errors.facultyRequired') || 'Faculty is required'
    }

    if (!formData.program.trim()) {
      newErrors.program = t('memberSignUp.form.errors.programRequired') || 'Program is required'
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
      const GOOGLE_SCRIPT_URL =
        'https://script.google.com/macros/s/AKfycbzwopvd-GWCU2rGZckSvl8a3YyfKtJD1A-vbZRUCfrCpObBD9V713Q1OsvyiSiUZ40D/exec'

      console.log('Submitting form data to Google Sheets (with all fields including interest and events):', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        studentNumber: formData.studentNumber,
        year: formData.year,
        faculty: formData.faculty,
        program: formData.program,
        interest: formData.interest,
        events: formData.events,
      })

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 8000)

      const googleSheetsResponse = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          studentNumber: formData.studentNumber,
          year: formData.year,
          faculty: formData.faculty,
          program: formData.program,
          interest: formData.interest,
          events: formData.events,
        }),
        signal: controller.signal,
        keepalive: true,
      })

      clearTimeout(timeoutId)

      console.log('Google Sheets response:', googleSheetsResponse)
      console.log('Google Sheets submission successful')

      console.log('Form submitted successfully to Google Sheets')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        studentNumber: '',
        year: '',
        faculty: '',
        program: '',
        interest: '',
        events: '',
      })
      setErrors({})
      setIsModalOpen(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      if (error.name === 'AbortError') {
        setErrors({ submit: t('memberSignUp.form.errors.submitTimeout') || 'Submission is taking longer than expected. Please try again.' })
      } else {
        setErrors({ submit: t('memberSignUp.form.errors.submitFailed') || 'Failed to submit application. Please try again.' })
      }
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

      <div className="py-8 pb-16 sm:py-16 sm:pb-24">
        <Container>
          <div className="mx-auto max-w-6xl text-center">
            <Heading as="h2" className="mx-auto sm:whitespace-nowrap">
              {t('memberSignUp.title') || 'General Member Sign-Up'}
            </Heading>

            <div className="mx-auto mt-12 max-w-6xl text-left space-y-12">
              <div>
                <Subheading as="h3" className="mb-6">{t('memberSignUp.whatIsLab2Life.title') || 'What is Lab2Life?'}</Subheading>
                <p className="text-lg/8 text-[#003e3e]">
                  {t('memberSignUp.whatIsLab2Life.description') || 'We are an up and coming club which allows students to connect with and explore various jobs in the field of health and medicine.'}
                </p>
              </div>

              <div>
                <Subheading as="h3" className="mb-6">{t('memberSignUp.benefits.title') || 'What do you get by becoming a general member?'}</Subheading>
                <ul className="text-lg/8 text-[#003e3e] space-y-2">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#003e3e] rounded-full mt-3 mr-4 flex-shrink-0"></span>
                    <span>{t('memberSignUp.benefits.professionalNetworks') || 'Access to Professional Networks: Opportunities to connect with industry professionals, alumni, and guest speakers.'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#003e3e] rounded-full mt-3 mr-4 flex-shrink-0"></span>
                    <span>{t('memberSignUp.benefits.exclusiveDiscounts') || 'Exclusive Discounts and Perks from our Sponsors: Access to special deals or discounts for the products offered by our sponsors.'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#003e3e] rounded-full mt-3 mr-4 flex-shrink-0"></span>
                    <span>{t('memberSignUp.benefits.firstDibsEvents') || 'First Dibs on Events: Priority registration for popular events or limited spots in workshops.'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#003e3e] rounded-full mt-3 mr-4 flex-shrink-0"></span>
                    <span>{t('memberSignUp.benefits.generalMemberMeetings') || 'General Member Meetings: We try to hold at least 1-2 meetings per semester for general members where you guys can provide your inputs.'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#003e3e] rounded-full mt-3 mr-4 flex-shrink-0"></span>
                    <span>{t('memberSignUp.benefits.memberNewsletters') || 'Members-Only Newsletters: Regular updates on club news, content, sneak peaks into upcoming events and opportunities that are exclusive to members.'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#003e3e] rounded-full mt-3 mr-4 flex-shrink-0"></span>
                    <span>{t('memberSignUp.benefits.studyGroups') || 'Study Groups: Organized study sessions or groups within the club to help with coursework and exam preparation.'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#003e3e] rounded-full mt-3 mr-4 flex-shrink-0"></span>
                    <span>{t('memberSignUp.benefits.volunteerOpportunities') || 'Volunteer Opportunities: Opportunities to give back to the community through organized volunteer activities.'}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-16">
              <Heading as="h3" className="mx-auto max-w-6xl mb-8 pb-4">
                {t('memberSignUp.form.title') || 'Registration Form'}
              </Heading>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6 text-left">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-medium text-[#003e3e]"
                    >
                      {t('memberSignUp.form.fields.firstName') || 'First Name'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full rounded-lg border bg-white px-4 py-3 text-[#003e3e] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#003e3e] ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: 'white' }}
                      placeholder={t('memberSignUp.form.placeholders.firstName') || 'Your first name'}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-sm font-medium text-[#003e3e]"
                    >
                      {t('memberSignUp.form.fields.lastName') || 'Last Name'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full rounded-lg border bg-white px-4 py-3 text-[#003e3e] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#003e3e] ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: 'white' }}
                      placeholder={t('memberSignUp.form.placeholders.lastName') || 'Your last name'}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#003e3e]">
                    {t('memberSignUp.form.fields.email') || 'uOttawa Email Address'} <span className="text-red-500">*</span>
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
                    placeholder={t('memberSignUp.form.placeholders.email') || 'your.email@uottawa.ca'}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label
                    htmlFor="studentNumber"
                    className="mb-2 block text-sm font-medium text-[#003e3e]"
                  >
                    {t('memberSignUp.form.fields.studentNumber') || 'Student Number'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="studentNumber"
                    name="studentNumber"
                    value={formData.studentNumber}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border bg-white px-4 py-3 text-[#003e3e] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#003e3e] ${
                      errors.studentNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: 'white' }}
                    placeholder={t('memberSignUp.form.placeholders.studentNumber') || 'Your student number'}
                  />
                  {errors.studentNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.studentNumber}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="year" className="mb-2 block text-sm font-medium text-[#003e3e]">
                      {t('memberSignUp.form.fields.year') || 'Year'} <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      className={`w-full rounded-lg border bg-white px-4 py-3 text-[#003e3e] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#003e3e] ${
                        errors.year ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: 'white' }}
                    >
                      <option value="">{t('memberSignUp.form.placeholders.year') || 'Select Year'}</option>
                      <option value="1st Year">{t('memberSignUp.form.yearOptions.1st') || '1st Year'}</option>
                      <option value="2nd Year">{t('memberSignUp.form.yearOptions.2nd') || '2nd Year'}</option>
                      <option value="3rd Year">{t('memberSignUp.form.yearOptions.3rd') || '3rd Year'}</option>
                      <option value="4th Year">{t('memberSignUp.form.yearOptions.4th') || '4th Year'}</option>
                      <option value="5th Year">{t('memberSignUp.form.yearOptions.5th') || '5th Year'}</option>
                      <option value="Other">{t('memberSignUp.form.yearOptions.other') || 'Other'}</option>
                    </select>
                    {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
                  </div>
                  <div>
                    <label
                      htmlFor="faculty"
                      className="mb-2 block text-sm font-medium text-[#003e3e]"
                    >
                      {t('memberSignUp.form.fields.faculty') || 'Faculty'} <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="faculty"
                      name="faculty"
                      value={formData.faculty}
                      onChange={handleInputChange}
                      className={`w-full rounded-lg border bg-white px-4 py-3 text-[#003e3e] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#003e3e] ${
                        errors.faculty ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: 'white' }}
                    >
                      <option value="">{t('memberSignUp.form.placeholders.faculty') || 'Select Faculty'}</option>
                      <option value="Arts">{t('memberSignUp.form.facultyOptions.arts') || 'Faculty of Arts'}</option>
                      <option value="Education">{t('memberSignUp.form.facultyOptions.education') || 'Faculty of Education'}</option>
                      <option value="Engineering">{t('memberSignUp.form.facultyOptions.engineering') || 'Faculty of Engineering'}</option>
                      <option value="Health Sciences">{t('memberSignUp.form.facultyOptions.healthSciences') || 'Faculty of Health Sciences'}</option>
                      <option value="Law">{t('memberSignUp.form.facultyOptions.law') || 'Faculty of Law'}</option>
                      <option value="Medicine">{t('memberSignUp.form.facultyOptions.medicine') || 'Faculty of Medicine'}</option>
                      <option value="Science">{t('memberSignUp.form.facultyOptions.science') || 'Faculty of Science'}</option>
                      <option value="Social Science">{t('memberSignUp.form.facultyOptions.socialScience') || 'Faculty of Social Science'}</option>
                      <option value="Telfer">{t('memberSignUp.form.facultyOptions.telfer') || 'Telfer School of Management'}</option>
                    </select>
                    {errors.faculty && (
                      <p className="mt-1 text-sm text-red-600">{errors.faculty}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="program"
                    className="mb-2 block text-sm font-medium text-[#003e3e]"
                  >
                    {t('memberSignUp.form.fields.program') || 'Program'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="program"
                    name="program"
                    value={formData.program}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border bg-white px-4 py-3 text-[#003e3e] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#003e3e] ${
                      errors.program ? 'border-red-500' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: 'white' }}
                    placeholder={t('memberSignUp.form.placeholders.program') || 'Your program of study'}
                  />
                  {errors.program && <p className="mt-1 text-sm text-red-600">{errors.program}</p>}
                </div>

                <div>
                  <label
                    htmlFor="interest"
                    className="mb-2 block text-sm font-medium text-[#003e3e]"
                  >
                    {t('memberSignUp.form.fields.interest') || 'Why are you interested in joining uOttawa Lab2Life?'}
                  </label>
                  <textarea
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full resize-none overflow-hidden rounded-lg border bg-white px-4 py-3 text-[#003e3e] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#003e3e] ${
                      errors.interest ? 'border-red-500' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: 'white', minHeight: '120px' }}
                    placeholder={t('memberSignUp.form.placeholders.interest') || 'Tell us why you want to join Lab2Life...'}
                    onInput={(e) => {
                      e.target.style.height = 'auto'
                      e.target.style.height = e.target.scrollHeight + 'px'
                    }}
                  />
                  {errors.interest && (
                    <p className="mt-1 text-sm text-red-600">{errors.interest}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="events" className="mb-2 block text-sm font-medium text-[#003e3e]">
                    {t('memberSignUp.form.fields.events') || 'What events or initiatives do you want to see us do during the 2025-2026 academic year?'}
                  </label>
                  <textarea
                    id="events"
                    name="events"
                    value={formData.events}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full resize-none overflow-hidden rounded-lg border bg-white px-4 py-3 text-[#003e3e] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#003e3e] ${
                      errors.events ? 'border-red-500' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: 'white', minHeight: '120px' }}
                    placeholder={t('memberSignUp.form.placeholders.events') || 'Tell us what events you would like to see...'}
                    onInput={(e) => {
                      e.target.style.height = 'auto'
                      e.target.style.height = e.target.scrollHeight + 'px'
                    }}
                  />
                  {errors.events && <p className="mt-1 text-sm text-red-600">{errors.events}</p>}
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
                        : 'cursor-pointer bg-[#99c96f] text-[#003e3e]'
                    }`}
                    style={{
                      border: '1px solid transparent',
                      transition: 'all 0.3s ease-in-out',
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
                    {isSubmitting ? (t('memberSignUp.form.submitting') || 'Submitting...') : (t('memberSignUp.form.submit') || 'Submit Application')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </div>

      <Footer />

      <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}
