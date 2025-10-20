'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useEffect, useState } from 'react'
import * as React from 'react'
import { DocsLayout } from '@/components/articles/docs-layout'
import { parse, transform } from '@markdoc/markdoc'
import * as Markdoc from '@markdoc/markdoc'
import yaml from 'js-yaml'
import markdocNodes from '@/markdoc/nodes'

const englishContent = `---
title: "Inside the Role of Nuclear Medicine Technologists: Support That Saves Lives"
---
*Written by Lacey Mullin*  
*September 30th, 2025*

![Nuclear Medicine Technologist Image](https://www.gurnick.edu/wp-content/uploads/2021/09/A.S.-in-Nuclear-Medicine-Technology-Course-Descriptions.jpg)

---

Clinical support roles are the missing puzzle pieces that complete the picture. Without them, physicians would not be able to see the full image needed for diagnosis. Medical radiation technology is a field of medicine that focuses on diagnostic imaging and radiation therapy. Professions in this field include radiological technologists, radiation therapists, and magnetic resonance technologists. In this article, we will take a closer look at the profession of a nuclear medicine technologist (NMT). 

## Nuclear scientists or crucial healthcare workers — What are NMTs?

NMTs play a vital role as clinical support professionals who bridge advanced imaging technology with patient care. Their primary responsibilities include performing specialized imaging tests, such as positron emission tomography (PET) scans, and administering radioactive drugs (radiopharmaceuticals) to aid in the diagnosis and treatment of medical conditions. The use of radioactive drugs helps to highlight physiological processes that cannot be captured by standard imaging techniques, allowing physicians to interpret results and identify diseases and infections. 

What’s notable about NMTs is that their work is not limited to one specific specialty of medicine and healthcare. They collaborate with physicians and other professionals within a wide range of specialties; This includes but is not limited to cardiology, oncology, and psychiatry. In supporting these different fields, NMTs help to diagnose an extensive range of disorders and infections. Their work provides physicians with the critical information needed to confirm diagnoses, plan treatments, and monitor patient progress. 

The responsibilities of an NMT extend well beyond just imaging acquisition. In their training, they learn to:

- Perform basic verification and quality control checks on radiology equipment, ensuring that each scan is both safe and accurate  
- Apply intense protective measures to safeguard not only the patient, but also other staff and themselves during procedures  
- Take on training and supervision roles to help students navigate the field of nuclear medicine.  

Additionally, to carry out their work, NMTs operate a range of highly specialized equipment. This includes:

- Gamma cameras 
- Scintillation counters
- Tomodensitometers
- Scanners 
- Ionization chambers

Each of these pieces of equipment is designed to detect and measure radioactive signals within the body, such as those emitted by radiopharmaceuticals. 

## Workplace, Salary, and Education - An important trio!

Nuclear medicine technologists often work in hospitals, universities, medical clinics, imaging clinics, diagnostic labs, and research centres, and salaries in Ontario typically range from $70,000 - $100,000. To become a nuclear medicine technologist, the education requirements are as follows:

- The completion of a bachelor's degree in a related field. Typically, the completion of this degree is in a science-related field.
- The completion of a certificate or specialized nuclear medicine technology program

## The big takeaway for today..	

Nuclear medicine technologists are vital members of the healthcare team, working behind the scenes to provide physicians with the functional images and data needed for accurate diagnosis and effective treatment. By preparing radiopharmaceuticals, operating specialized imaging equipment, and ensuring patient safety, NMTs bring together science, technology, and compassionate care. Their role as clinical support professionals highlights the importance of collaborative medicine and how the expertises of those professionals make the insights from the physicians possible. 

---

## References

- [Government of Canada](https://www.jobbank.gc.ca/marketreport/occupation/18257/ca;jsessionid=700025E6BF725726683069D2CC03A472.jobsearch75) (2025, September 16). *Job description: Nuclear Medicine Technologist in Canada*.
- [Indeed Careers](https://ca.indeed.com/career/nuclear-medicine-technologist/salaries/Ontario) (2025, September 22). *Nuclear medicine technologist salary in Ontario*.
- [Mayo Clinic College of Medicine and Science](https://college.mayo.edu/academics/explore-health-care-careers/careers-a-z/nuclear-medicine-technologist/) (n.d.). *Nuclear Medicine Technologist - Explore Healthcare Careers*.
- [University of Toronto, Department of Radiation Oncology](https://radonc.utoronto.ca/nuclear-medicine-molecular-imaging-technology) (n.d.). *Nuclear Medicine & Molecular Imaging Technology*.`

const frenchContent = `---
title: "Dans le rôle d'une technologue en médecine nucléaire : du soutien qui sauve des vies"
---
*Écrit par Lacey Mullin*  
*Le 30 septembre 2025*

---

Les rôles de soutien clinique sont des éléments essentiels de l'ensemble unifié que nous appelons la médecine. Sans eux, les médecins ne seraient pas en mesure d'avoir une vision globale nécessaire au diagnostic. La technologie des rayonnements médicaux est un domaine de la médecine qui se concentre sur l'imagerie diagnostique et la radiothérapie. Les professions dans ce domaine comprennent les technologues en radiologie, les radiothérapeutes et les technologues en résonance magnétique. Dans cet article, nous allons examiner de plus près la profession de technologue en médecine nucléaire (TMN).  

## Scientifiques nucléaires ou professionnels de santé essentiels - Que sont les TMN ?

Les techniciens en médecine nucléaire jouent un rôle essentiel en tant que professionnels de soutien clinique qui font le lien entre les technologies d'imagerie avancées et les soins aux patients. Leurs responsabilités principales consistent à réaliser des examens d'imagerie spécialisés, tels que la tomographie par émission de positons (TEP), et à administrer des médicaments radioactifs (produits radiopharmaceutiques) afin de faciliter le diagnostic et le traitement de pathologies médicales. L'utilisation de médicaments radioactifs permet de mettre en évidence des processus physiologiques qui ne peuvent être capturés par les techniques d'imagerie standard, ce qui permet aux médecins d'interpréter les résultats et d'identifier les maladies et les infections. 

Ce qui est remarquable chez les TMN est que leur travail ne se limite pas à une spécialité spécifique de la médecine et des soins de santé. Ils collaborent avec des médecins et d'autres professionnels dans un large éventail de spécialités, notamment la cardiologie, l'oncologie et la psychiatrie. En soutenant ces différents domaines, les techniciens en médecine nucléaire contribuent au diagnostic d'un large éventail de troubles et d'infections. Leur travail fournit aux médecins les informations essentielles nécessaires pour confirmer les diagnostics, planifier les traitements et suivre les progrès des patients.  

Les responsabilités d'un technicien en médecine nucléaire vont bien au-delà de la simple acquisition d'images. Au cours de leur formation, ils apprennent à :

- Effectuer des vérifications de base et des contrôles de qualité sur les équipements de radiologie (afin de garantir la sécurité et la précision de chaque scan);
- Appliquer des mesures de protection strictes pour protéger non seulement le patient, mais aussi les autres membres du personnel et eux-mêmes pendant les procédures;
- Assumer des rôles de formation et de supervision pour aider les étudiants à s'orienter dans le domaine de la médecine nucléaire.  

Pour mener à bien leur travail, les NMT utilisent toute une gamme d'équipements hautement spécialisés. Il s'agit notamment de :

- Caméras gamma; 
- Compteurs à scintillation;
- Tomodensitomètres;
- Scanners;
- Chambres d'ionisation. 

Chacun de ces équipements est conçu pour détecter et mesurer les signaux radioactifs à l'intérieur du corps, tels que ceux émis par les produits radiopharmaceutiques.  

## Lieu de travail, salaire et formation : un trio important !

Les technologues en médecine nucléaire travaillent souvent dans des hôpitaux, des universités, des cliniques médicales, des cliniques d'imagerie, des laboratoires de diagnostic et des centres de recherche. En Ontario, leur salaire varie généralement entre 70 000 $ et 100 000 $. Pour devenir technologue en médecine nucléaire, les exigences en matière de formation sont les suivantes :

- Obtenir un baccalauréat dans un domaine connexe. En général, ce diplôme est obtenu dans un domaine lié aux sciences;
- Obtenir un certificat ou suivre un programme spécialisé en technologie de médecine nucléaire.

¹ Glassdoor. (2025). Indeed Careers. (22 septembre 2025). Nuclear medicine technologist salary in Ontario. Indeed. Récupéré de https://www.glassdoor.ca/Salaries/clinical-applications-specialist-salary-SRCH_KO0,32.html

## La grande leçon à retenir aujourd'hui...	
	
Les technologues en médecine nucléaire sont des membres essentiels de l'équipe de soins de santé. Ils travaillent en coulisses pour fournir aux médecins les images fonctionnelles et les données nécessaires à un diagnostic précis et à un traitement efficace. En préparant des produits radiopharmaceutiques, en utilisant des équipements d'imagerie spécialisés et en assurant la sécurité des patients, les technologues en médecine nucléaire allient science, technologie et soins compatissants. Leur rôle en tant que professionnels de soutien clinique souligne l'importance de la médecine collaborative et montre comment l'expertise de ces professionnels permet aux médecins d'approfondir leurs connaissances. 

---

## Références

- [Government of Canada](https://www.guichetemplois.gc.ca/rapportmarche/profession/18257/ca) (2025, 16 septembre). *Description de tâches: Technologue en médecine nucléaire au Canada*.
- [Indeed Careers](https://ca.indeed.com/career/nuclear-medicine-technologist/salaries/Ontario) (2025, 22 septembre). *Nuclear medicine technologist salary in Ontario (anglais)*.
- [Mayo Clinic College of Medicine and Science](https://college.mayo.edu/academics/explore-health-care-careers/careers-a-z/nuclear-medicine-technologist/) (n.d.). *Nuclear Medicine Technologist - Explore Healthcare Careers (anglais)*.
- [University of Toronto, Department of Radiation Oncology](https://radonc.utoronto.ca/nuclear-medicine-molecular-imaging-technology) (n.d.). *Nuclear Medicine & Molecular Imaging Technology (anglais)*.`

export default function NuclearMedicineTechnologistsPage() {
  const { locale } = useLanguage()
  const [frontmatter, setFrontmatter] = useState({})
  const [mdNodes, setMdNodes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const markdownContent = locale === 'fr' ? frenchContent : englishContent
      const ast = parse(markdownContent)
      const frontmatterData = yaml.load(ast.attributes?.frontmatter || '')
      setFrontmatter(frontmatterData)
      setMdNodes(ast.children || [])
      setLoading(false)
    } catch (error) {
      console.error('Error processing markdown:', error)
      setLoading(false)
    }
  }, [locale])

  if (loading) {
    return (
      <DocsLayout frontmatter={{ title: 'Loading...' }} nodes={[]}>
        <div>Loading...</div>
      </DocsLayout>
    )
  }

  const content = locale === 'fr' ? frenchContent : englishContent
  const ast = parse(content)
  const transformedAst = transform(ast, { nodes: markdocNodes })
  const reactContent = Markdoc.renderers.react(transformedAst.children, React)

  return (
    <DocsLayout frontmatter={frontmatter} nodes={mdNodes}>
      {reactContent}
    </DocsLayout>
  )
}


