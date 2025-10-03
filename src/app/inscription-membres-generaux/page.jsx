'use client'

import { Container } from '@/components/home/container'
import { Heading, Subheading } from '@/components/home/text'
import { useState } from 'react'
import { SuccessModal } from '../general-member-sign-up/success-modal'
import { useTranslation } from '@/contexts/LanguageContext'

export default function InscriptionMembresGenerauxPage() {
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

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setIsModalOpen(true)
      
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
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors({ submit: t('memberSignUp.form.errors.submitFailed') || 'Failed to submit application. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="py-8 pb-16 sm:py-16 sm:pb-24">
        <Container>
          <div className="mx-auto max-w-6xl text-center">
            <Heading as="h2" className="mx-auto sm:whitespace-nowrap">
              {t('memberSignUp.title') || 'Inscription des membres généraux'}
            </Heading>

            <div className="mx-auto mt-12 max-w-6xl text-left space-y-12">
              <div>
                <Subheading as="h3" className="mb-6">{t('memberSignUp.whatIsLab2Life.title') || 'Qu\'est-ce que Lab2Life?'}</Subheading>
                <p className="text-lg/8 text-[#003e3e]">
                  {t('memberSignUp.whatIsLab2Life.description') || 'Nous sommes un club prometteur qui permet aux étudiants de se connecter et d\'explorer divers emplois dans le domaine de la santé et de la médecine.'}
                </p>
              </div>

              <div>
                <Subheading as="h3" className="mb-6">{t('memberSignUp.benefits.title') || 'Qu\'obtient-on en devenant membre général ?'}</Subheading>
                <ul className="text-lg/8 text-[#003e3e] space-y-2">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#003e3e] rounded-full mt-3 mr-4 flex-shrink-0"></span>
                    <span>{t('memberSignUp.benefits.professionalNetworks') || 'Accès aux réseaux professionnels: opportunités de se connecter avec des professionnels de l\'industrie, des anciens élèves et des conférenciers invités.'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#003e3e] rounded-full mt-3 mr-4 flex-shrink-0"></span>
                    <span>{t('memberSignUp.benefits.exclusiveDiscounts') || 'Remises et avantages exclusifs de nos sponsors: accès à des offres spéciales ou à des remises sur les produits proposés par nos sponsors.'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#003e3e] rounded-full mt-3 mr-4 flex-shrink-0"></span>
                    <span>{t('memberSignUp.benefits.firstDibsEvents') || 'Premiers pas sur les événements: inscription prioritaire aux événements populaires ou places limitées dans les ateliers.'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#003e3e] rounded-full mt-3 mr-4 flex-shrink-0"></span>
                    <span>{t('memberSignUp.benefits.generalMemberMeetings') || 'Réunions des membres généraux: Nous essayons d\'organiser au moins 1-2 réunions par semestre pour les membres généraux où vous pouvez fournir vos commentaires.'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#003e3e] rounded-full mt-3 mr-4 flex-shrink-0"></span>
                    <span>{t('memberSignUp.benefits.memberNewsletters') || 'Newsletters réservées aux membres: mises à jour régulières sur les actualités et le contenu du club, aperçus des événements à venir et des opportunités exclusives aux membres.'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#003e3e] rounded-full mt-3 mr-4 flex-shrink-0"></span>
                    <span>{t('memberSignUp.benefits.studyGroups') || 'Groupes d\'étude: séances d\'étude ou groupes organisés au sein du club pour aider aux cours et à la préparation aux examens.'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#003e3e] rounded-full mt-3 mr-4 flex-shrink-0"></span>
                    <span>{t('memberSignUp.benefits.volunteerOpportunities') || 'Opportunités de bénévolat: opportunités de redonner à la communauté grâce à des activités bénévoles organisées.'}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-16">
              <Heading as="h3" className="mx-auto max-w-6xl mb-8 pb-4">
                {t('memberSignUp.form.title') || 'Formulaire d\'inscription'}
              </Heading>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6 text-left">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-medium text-[#003e3e]"
                    >
                      {t('memberSignUp.form.fields.firstName') || 'Prénom'} <span className="text-red-500">*</span>
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
                      placeholder={t('memberSignUp.form.placeholders.firstName') || 'Votre prénom'}
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
                      {t('memberSignUp.form.fields.lastName') || 'Nom'} <span className="text-red-500">*</span>
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
                      placeholder={t('memberSignUp.form.placeholders.lastName') || 'Votre nom'}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-[#003e3e]"
                  >
                    {t('memberSignUp.form.fields.email') || 'Adresse courriel de l\'Université d\'Ottawa'} <span className="text-red-500">*</span>
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
                    placeholder={t('memberSignUp.form.placeholders.email') || 'votre.courriel@uottawa.ca'}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="studentNumber"
                    className="mb-2 block text-sm font-medium text-[#003e3e]"
                  >
                    {t('memberSignUp.form.fields.studentNumber') || 'Numéro d\'étudiant'} <span className="text-red-500">*</span>
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
                    placeholder={t('memberSignUp.form.placeholders.studentNumber') || 'Votre numéro d\'étudiant'}
                  />
                  {errors.studentNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.studentNumber}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="year"
                      className="mb-2 block text-sm font-medium text-[#003e3e]"
                    >
                      {t('memberSignUp.form.fields.year') || 'Annee'} <span className="text-red-500">*</span>
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
                      <option value="">{t('memberSignUp.form.placeholders.year') || 'Sélectionner l\'année'}</option>
                      <option value="1st">{t('memberSignUp.form.yearOptions.1st') || '1ère année'}</option>
                      <option value="2nd">{t('memberSignUp.form.yearOptions.2nd') || '2ème année'}</option>
                      <option value="3rd">{t('memberSignUp.form.yearOptions.3rd') || '3ème année'}</option>
                      <option value="4th">{t('memberSignUp.form.yearOptions.4th') || '4ème année'}</option>
                      <option value="5th">{t('memberSignUp.form.yearOptions.5th') || '5ème année'}</option>
                      <option value="other">{t('memberSignUp.form.yearOptions.other') || 'Autre'}</option>
                    </select>
                    {errors.year && (
                      <p className="mt-1 text-sm text-red-600">{errors.year}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="faculty"
                      className="mb-2 block text-sm font-medium text-[#003e3e]"
                    >
                      {t('memberSignUp.form.fields.faculty') || 'Faculté'} <span className="text-red-500">*</span>
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
                      <option value="">{t('memberSignUp.form.placeholders.faculty') || 'Sélectionner la Faculté'}</option>
                      <option value="arts">{t('memberSignUp.form.facultyOptions.arts') || 'Faculté des arts'}</option>
                      <option value="education">{t('memberSignUp.form.facultyOptions.education') || 'Faculté d\'éducation'}</option>
                      <option value="engineering">{t('memberSignUp.form.facultyOptions.engineering') || 'Faculté de génie'}</option>
                      <option value="healthSciences">{t('memberSignUp.form.facultyOptions.healthSciences') || 'Faculté des sciences de la santé'}</option>
                      <option value="law">{t('memberSignUp.form.facultyOptions.law') || 'Faculté de droit'}</option>
                      <option value="medicine">{t('memberSignUp.form.facultyOptions.medicine') || 'Faculté de médecine'}</option>
                      <option value="science">{t('memberSignUp.form.facultyOptions.science') || 'Faculté des sciences'}</option>
                      <option value="socialScience">{t('memberSignUp.form.facultyOptions.socialScience') || 'Faculté des sciences sociales'}</option>
                      <option value="telfer">{t('memberSignUp.form.facultyOptions.telfer') || 'École de Gestion Telfer'}</option>
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
                    {t('memberSignUp.form.fields.program') || 'Programme'} <span className="text-red-500">*</span>
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
                    placeholder={t('memberSignUp.form.placeholders.program') || 'Votre programme d\'études'}
                  />
                  {errors.program && (
                    <p className="mt-1 text-sm text-red-600">{errors.program}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="interest"
                    className="mb-2 block text-sm font-medium text-[#003e3e]"
                  >
                    {t('memberSignUp.form.fields.interest') || 'Pourquoi êtes-vous intéressés à joindre Lab2Life de l\'université d\'Ottawa?'}
                  </label>
                  <textarea
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[#003e3e] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#003e3e]"
                    style={{ backgroundColor: 'white' }}
                    placeholder={t('memberSignUp.form.placeholders.interest') || 'Dites-nous pourquoi vous voulez rejoindre Lab2Life...'}
                  />
                </div>

                <div>
                  <label
                    htmlFor="events"
                    className="mb-2 block text-sm font-medium text-[#003e3e]"
                  >
                    {t('memberSignUp.form.fields.events') || 'Quels événements ou initiatives aimerez-vous voir au cours de l\'année scolaire 2025-2026?'}
                  </label>
                  <textarea
                    id="events"
                    name="events"
                    value={formData.events}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[#003e3e] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#003e3e]"
                    style={{ backgroundColor: 'white' }}
                    placeholder={t('memberSignUp.form.placeholders.events') || 'Dites-nous quels événements vous aimeriez voir...'}
                  />
                </div>

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
                    {isSubmitting 
                      ? (t('memberSignUp.form.submitting') || 'Soumission en cours...') 
                      : (t('memberSignUp.form.submit') || 'Soumettre votre application')
                    }
                  </button>
                </div>

                {errors.submit && (
                  <div className="pt-2">
                    <p className="text-sm text-red-600">{errors.submit}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </Container>
      </div>

      <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}