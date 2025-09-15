'use client'

import { SuccessModal } from './success-modal'
import { BounceGeneralMember } from './bounce-general-member'
import { Container } from '@/components/home/container'
import { Footer } from '@/components/home/footer'
import { Gradient } from '@/components/home/gradient'
import { Navbar } from '@/components/home/navbar'
import { Heading, Subheading } from '@/components/home/text'
import { supabase } from '@/lib/supabase/client'
import { useState } from 'react'

export default function GeneralMemberSignUp() {
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
          firstName: 'First name should only contain letters, spaces, hyphens, and apostrophes (minimum 2 characters)',
        }))
      }
    }

    if (name === 'lastName' && value.trim()) {
      if (!validateName(value)) {
        setErrors((prev) => ({
          ...prev,
          lastName: 'Last name should only contain letters, spaces, hyphens, and apostrophes (minimum 2 characters)',
        }))
      }
    }

    if (name === 'studentNumber' && value.trim()) {
      if (!validateStudentNumber(value)) {
        setErrors((prev) => ({
          ...prev,
          studentNumber: 'Student number must be exactly 9 digits',
        }))
      }
    }

    if (name === 'email' && value.trim()) {
      if (!validateUOttawaEmail(value)) {
        setErrors((prev) => ({
          ...prev,
          email: 'Please use your uOttawa email address (@uottawa.ca)',
        }))
      }
    }
  }

  const handleEmailBlur = (e) => {
    const email = e.target.value.trim()
    if (email && !validateUOttawaEmail(email)) {
      setErrors((prev) => ({
        ...prev,
        email: 'Please use your uOttawa email address (@uottawa.ca)',
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
      newErrors.firstName = 'First name is required'
    } else if (!validateName(formData.firstName)) {
      newErrors.firstName = 'First name should only contain letters, spaces, hyphens, and apostrophes (minimum 2 characters)'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    } else if (!validateName(formData.lastName)) {
      newErrors.lastName = 'Last name should only contain letters, spaces, hyphens, and apostrophes (minimum 2 characters)'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateUOttawaEmail(formData.email)) {
      newErrors.email = 'Please use your uOttawa email address (@uottawa.ca)'
    }

    if (!formData.studentNumber.trim()) {
      newErrors.studentNumber = 'Student number is required'
    } else if (!validateStudentNumber(formData.studentNumber)) {
      newErrors.studentNumber = 'Student number must be exactly 9 digits'
    }

    if (!formData.year) {
      newErrors.year = 'Year is required'
    }

    if (!formData.faculty) {
      newErrors.faculty = 'Faculty is required'
    }

    if (!formData.program.trim()) {
      newErrors.program = 'Program is required'
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
      const { data, error } = await supabase.from('Members').insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          uottawa_email: formData.email,
          student_number: parseInt(formData.studentNumber),
          year: formData.year,
          faculty: formData.faculty,
          program: formData.program,
          why_join: formData.interest,
          initiatives: formData.events,
        },
      ])

      if (error) {
        setErrors({ submit: 'Failed to submit application. Please try again.' })
        return
      }

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
      setErrors({ submit: 'Failed to submit application. Please try again.' })
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

      <div className="py-8 sm:py-16 pb-16 sm:pb-24">
        <Container>
          <div className="mx-auto max-w-6xl text-center">
            <Heading as="h2" className="mx-auto max-w-3xl">
              General Member Sign-Up
            </Heading>

            <div className="mt-8 text-left">
              <Subheading className="text-lg">What is Lab2Life?</Subheading>
              <p className="mt-4 text-[#003e3e]">
                We are an up and coming club which allows students to connect with and explore various jobs in the field of health and medicine.
              </p>
            </div>

            <div className="mt-8 text-left">
              <Subheading className="text-lg">Our Mission</Subheading>
              <p className="mt-4 text-[#003e3e]">
                uOttawa Lab2Life is dedicated to promoting and helping students explore various careers in the field of healthcare and medicine. We wish to support students interested in the field by providing them with information, resources, and opportunities to apply their academics to different careers. Through innovative events, professional development initiatives, podcast episodes with people in various professions, articles about different careers, workshops about job applications, and networking opportunities, we aim to guide students through their journey from the classroom and lab to diverse careers in the field and support them with potential career pathways such as jobs, graduate education or medical school.
              </p>
            </div>

            <div className="mt-8 text-left">
              <Subheading className="text-lg">What do you get by becoming a general member?</Subheading>
              <ul className="mt-4 space-y-2 text-[#003e3e]">
                <li className="flex items-start">
                  <span className="mr-2 text-[#003e3e]">•</span>
                  <span><strong>Access to Professional Networks:</strong> Opportunities to connect with industry professionals, alumni, and guest speakers.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#003e3e]">•</span>
                  <span><strong>Exclusive Discounts and Perks from our Sponsors:</strong> Access to special deals or discounts for the products offered by our sponsors.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#003e3e]">•</span>
                  <span><strong>First Dibs on Events:</strong> Priority registration for popular events or limited spots in workshops.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#003e3e]">•</span>
                  <span><strong>General Member Meetings:</strong> We try to hold at least 1-2 meetings per semester for general members where you guys can provide your inputs.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#003e3e]">•</span>
                  <span><strong>Members-Only Newsletters:</strong> Regular updates on club news, content, sneak peaks into upcoming events and opportunities that are exclusive to members.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#003e3e]">•</span>
                  <span><strong>Study Groups:</strong> Organized study sessions or groups within the club to help with coursework and exam preparation.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#003e3e]">•</span>
                  <span><strong>Volunteer Opportunities:</strong> Opportunities to give back to the community through organized volunteer activities.</span>
                </li>
              </ul>
            </div>

            <div className="mt-16">
              <Heading as="h2" className="mx-auto max-w-3xl">Registration Form</Heading>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6 text-left">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-[#003e3e]">
                      First Name <span className="text-red-500">*</span>
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
                      placeholder="Your first name"
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-[#003e3e]">
                      Last Name <span className="text-red-500">*</span>
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
                      placeholder="Your last name"
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#003e3e]">
                    uOttawa Email Address <span className="text-red-500">*</span>
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
                    placeholder="your.email@uottawa.ca"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="studentNumber" className="mb-2 block text-sm font-medium text-[#003e3e]">
                    Student Number <span className="text-red-500">*</span>
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
                    placeholder="Your student number"
                  />
                  {errors.studentNumber && <p className="mt-1 text-sm text-red-600">{errors.studentNumber}</p>}
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="year" className="mb-2 block text-sm font-medium text-[#003e3e]">
                      Year <span className="text-red-500">*</span>
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
                      <option value="">Select Year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="5th Year">5th Year</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
                  </div>
                  <div>
                    <label htmlFor="faculty" className="mb-2 block text-sm font-medium text-[#003e3e]">
                      Faculty <span className="text-red-500">*</span>
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
                      <option value="">Select Faculty</option>
                      <option value="Faculty of Arts">Faculty of Arts</option>
                      <option value="Faculty of Education">Faculty of Education</option>
                      <option value="Faculty of Engineering">Faculty of Engineering</option>
                      <option value="Faculty of Health Sciences">Faculty of Health Sciences</option>
                      <option value="Faculty of Law">Faculty of Law</option>
                      <option value="Faculty of Medicine">Faculty of Medicine</option>
                      <option value="Faculty of Science">Faculty of Science</option>
                      <option value="Faculty of Social Science">Faculty of Social Science</option>
                      <option value="Telfer School of Management">Telfer School of Management</option>
                    </select>
                    {errors.faculty && <p className="mt-1 text-sm text-red-600">{errors.faculty}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="program" className="mb-2 block text-sm font-medium text-[#003e3e]">
                    Program <span className="text-red-500">*</span>
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
                    placeholder="Your program of study"
                  />
                  {errors.program && <p className="mt-1 text-sm text-red-600">{errors.program}</p>}
                </div>

                <div>
                  <label htmlFor="interest" className="mb-2 block text-sm font-medium text-[#003e3e]">
                    Why are you interested in joining uOttawa Lab2Life?
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
                    placeholder="Tell us why you want to join Lab2Life..."
                    onInput={(e) => {
                      e.target.style.height = 'auto'
                      e.target.style.height = e.target.scrollHeight + 'px'
                    }}
                  />
                  {errors.interest && <p className="mt-1 text-sm text-red-600">{errors.interest}</p>}
                </div>

                <div>
                  <label htmlFor="events" className="mb-2 block text-sm font-medium text-[#003e3e]">
                    What events or initiatives do you want to see us do during the 2024-2025 academic year?
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
                    placeholder="Tell us what events you would like to see..."
                    onInput={(e) => {
                      e.target.style.height = 'auto'
                      e.target.style.height = e.target.scrollHeight + 'px'
                    }}
                  />
                  {errors.events && <p className="mt-1 text-sm text-red-600">{errors.events}</p>}
                </div>

                <div className="mt-8">
                  <BounceGeneralMember />
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
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
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
