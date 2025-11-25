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
title: "Uncovering the Invisible - How Forensic Scientists Bring Science Into Justice"
---
*Written by Anoosha Rehman*  
*November 15th, 2025*

![Forensic Science Image](https://forensicstats.org/wp-content/uploads/2017/11/forenisc-scientist-in-lab.jpg)

---
## Introduction

Most criminal investigations rarely begin with clear answers. They begin with fragments like a fingerprint on glass, a trace of DNA, a chemical residue, or a footprint in dust. While detectives focus on interviews and leads, forensic scientists work behind the scenes, translating physical evidence into the objective truth behind the mystery using science. These professionals reconstruct cases, identify individuals, and verify facts after a crime scene. Their work bridges the gap between uncertainty and clarity, ensuring that decisions in the justice system are based not on assumptions but on evidence. Forensic science brings scientific integrity into a world of emotion, conflict, and consequences.

## Understanding Forensic Science

Forensic science is the application of scientific knowledge supporting both criminal and civil cases. Forensic scientists analyze the physical, biological, and digital material to uncover the details of the case, such as what happened, when it happened, and who was involved. The field specialties include, but are not limited to:

- DNA analysis 
- Toxicology 
- Fingerprinting 
- Trace evidence 
- Firearms examination 
- Bloodstain pattern interpretation

Their responsibilities may include:

-   Collecting and preserving crime-scene evidence
-   Analyzing and identifying DNA, bodily fluids, and trace materials
-   Examining weapons and ballistic patterns
-   Conducting toxicology screens for drugs or poisons
-   Reconstructing events through bloodstain or physical analysis
-   Preparing detailed laboratory reports
-   Testifying as expert witnesses in court

Although they may never interact with the victims or suspects, their findings often determine the direction of a case and/or the outcome of a trial.

## Skills Beyond the Laboratory

Success in the field also requires more than just technical expertise; it requires precision, ethics, and strong communication. Forensic scientists must ensure their work is accurate, unbiased, and legally defensible. Key soft skills include:

- Critical thinking and efficient problem-solving
- Strong attention to detail
- Clear written and verbal communication (specifically when it comes to court testimony) 
- Integrity and impartiality in handling evidence
- Collaboration with police, lawyers, coroners, and other scientists
- Ability to remain calm and objective during high-pressure cases
- Time management and organization

Beyond technical procedures, forensic scientists uphold fairness by ensuring that every piece of evidence is handled with care and transparency.

## Professional Path & Workplace Setting

In Canada, forensic scientists typically earn between $70,000-$90,000 CAD a year¹, depending on specialty, experience, and the laboratory in which they work. They may be working in federal laboratories, police services, medical examiner’s offices, research institutions, or private forensic companies. Most work standard full-time hours; however, some positions require on-call availability for urgent cases.

Common educational requirements include:

- A Bachelor’s degree in forensic science, biology, biochemistry, chemistry, or a related degree. 
- Laboratory or research experience in analytical science
- Specialized training in DNA analysis, toxicology, or crime-scene investigation
- Optional postgraduate education (Master’s) for advanced roles
- Participation in professional associations such as the Canadian Society of Forensic Science

Certification or expert-witness training may be required for roles involving regular courtroom testimony.

Forensic scientists ensure that the truth is determined by measurable and solid evidence. Their examinations and findings protect the innocent, support victims, and strengthen the integrity of the justice system. As technology advances, from enhanced DNA profiling to digital forensics, the value of scientific investigation continues to grow. These professionals work mostly behind the scenes, quietly yet powerfully, revealing evidence hidden at the microscopic level. Their work highlights a simple truth: in the search for justice, evidence speaks loudest when interpreted through science.

---
¹: [Canadian Society of Forensic Science](https://www.csfs.ca/wp-content/uploads/2017/08/Forensic-Science-Career-Booklet-GSA-2017-2nd-Edition-1-ilovepdf-compressed.pdf). Forensic Science Career Booklet, 2nd ed., 2017. Accessed 17 Nov. 2025.
---

## References

- [Canadian Society of Forensic Science](https://www.csfs.ca/wp-content/uploads/2017/08/Forensic-Science-Career-Booklet-GSA-2017-2nd-Edition-1-ilovepdf-compressed.pdf). Forensic Science Career Booklet, 2nd ed., 2017. Accessed 17 Nov. 2025.
- ["Biological Forensic Laboratory Technologist"](https://www.jobbank.gc.ca/marketreport/wages-occupation/3165/ca) Government of Canada, Job Bank. 2025. Accessed 17 Nov. 2025.
- [Indeed Canada](https://ca.indeed.com/career-advice/finding-a-job/how-to-become-a-forensic-scientist). "How To Become a Forensic Scientist." Indeed Career Guide, 2025. Accessed 17 Nov. 2025.
- [Forensic Statistics](https://forensicstats.org/blog/2017/07/15/get-know-different-types-forensic-scientists/). "Get to Know Different Types of Forensic Scientists." ForensicStats, 15 July 2017. Accessed 17 Nov. 2025.`

const frenchContent = `---
title: "Révéler l'invisible - Comment les scientifiques légistes mettent la science au service de la justice"
---
*Par Anoosha Rehman*  
*Le 15 novembre 2025*

![Image de la science judiciaire](https://forensicstats.org/wp-content/uploads/2017/11/forenisc-scientist-in-lab.jpg)

---
## Introduction

La plupart des enquêtes criminelles commencent rarement par des réponses claires. Elles commencent par des fragments tels qu'une empreinte digitale sur une vitre, une trace d'ADN, un résidu chimique ou une empreinte de pas dans la poussière. Alors que les détectives se concentrent sur les interrogatoires et les pistes, les scientifiques légistes travaillent en coulisses, utilisant la science pour traduire les preuves matérielles en vérité objective derrière le mystère. Ces professionnels reconstituent les affaires, identifient les individus et vérifient les faits après une scène de crime. Leur travail comble le fossé entre l'incertitude et la clarté, garantissant que les décisions du système judiciaire ne reposent pas sur des suppositions, mais sur des preuves. La science médico-légale apporte l'intégrité scientifique dans un monde d'émotions, de conflits et de conséquences.

## Comprendre la science médico-légale

La science médico-légale consiste à appliquer les connaissances scientifiques à des affaires pénales et civiles. Les scientifiques médico-légaux analysent les éléments physiques, biologiques et numériques afin de mettre au jour les détails d'une affaire, tels que ce qui s'est passé, quand cela s'est produit et qui était impliqué. Les spécialités dans ce domaine comprennent, sans s'y limiter:

- Analyse de l'ADN
- Toxicologie
- Empreintes digitales
- Preuves de traces
- Examen des armes à feu
- Interprétation des traces de sang.

Leurs responsabilités peuvent inclure:

- Collecte et conservation des preuves sur les lieux du crime
- Analyse et identification de l'ADN, des fluides corporels et des traces matérielles
- Examen des armes et des traces balistiques
- Réalisation d'analyses toxicologiques pour détecter la présence de drogues ou de poisons
- Reconstitution des événements à partir de l'analyse des taches de sang ou d'autres analyses physiques
- Préparation de rapports de laboratoire détaillés
- Témoignage en tant qu'expert devant les tribunaux.

Même s'ils n'interagissent jamais avec les victimes ou les suspects, leurs conclusions déterminent souvent l'orientation d'une affaire et/ou l'issue d'un procès.

## Compétences au-delà du laboratoire

Pour réussir dans ce domaine, il ne suffit pas d'avoir des compétences techniques, il faut également faire preuve de précision, d'éthique et de solides aptitudes en communication. Les scientifiques légistes doivent s'assurer que leur travail est précis, impartial et juridiquement défendable. Les compétences générales clés comprennent:

- Esprit critique et capacité à résoudre efficacement les problèmes
- Grand souci du détail
- Communication écrite et orale claire (en particulier lorsqu'il s'agit de témoignages devant les tribunaux)
- Intégrité et impartialité dans le traitement des preuves
- Collaboration avec la police, les avocats, les médecins légistes et d'autres scientifiques
- Capacité à rester calme et objectif dans les affaires très stressantes
- Gestion du temps et sens de l'organisation.

Au-delà des procédures techniques, les scientifiques légistes garantissent l'équité en veillant à ce que chaque élément de preuve soit traité avec soin et transparence.

## Parcours professionnel et environnement de travail

Au Canada, les scientifiques légistes gagnent généralement entre 70 000$ et 90 000$ CAD par an¹, selon leur spécialité, leur expérience et le laboratoire dans lequel ils travaillent. Ils peuvent travailler dans des laboratoires fédéraux, des services de police, des bureaux de médecins légistes, des instituts de recherche ou des sociétés privées spécialisées dans la médecine légale. La plupart travaillent à temps plein selon un horaire standard, mais certains postes exigent d'être disponible sur appel pour les cas urgents.

Les exigences courantes en matière de formation comprennent:

- Un baccalauréat en sciences judiciaires, biologie, biochimie, chimie ou dans un domaine connexe
- Expérience en laboratoire ou en recherche dans le domaine des sciences analytiques
- Formation spécialisée en analyse d'ADN, en toxicologie ou en enquête sur les scènes de crime
- Formation postuniversitaire facultative (maîtrise) pour les postes de niveau supérieur
- Participation à des associations professionnelles telles que la Société canadienne de sciences judiciaires

Une certification ou une formation d'expert-témoin peut être requise pour les postes impliquant des témoignages réguliers devant les tribunaux.

Les scientifiques légistes veillent à ce que la vérité soit établie à partir de preuves mesurables et solides. Leurs examens et leurs conclusions protègent les innocents, soutiennent les victimes et renforcent l'intégrité du système judiciaire. À mesure que la technologie progresse, du profilage ADN amélioré à la criminalistique numérique, la valeur de l'enquête scientifique ne cesse de croître. Ces professionnels travaillent principalement dans l'ombre, discrètement mais efficacement, révélant des preuves cachées à un niveau microscopique. Leur travail met en évidence une vérité simple : dans la recherche de la justice, les preuves sont plus éloquentes lorsqu'elles sont interprétées à l'aide de la science.

---
¹: [Canadian Society of Forensic Science](https://www.csfs.ca/wp-content/uploads/2017/08/Forensic-Science-Career-Booklet-GSA-2017-2nd-Edition-1-ilovepdf-compressed.pdf). Forensic Science Career Booklet, 2nd ed., 2017. Accédé le 17 nov. 2025.
---

## Références

- [Canadian Society of Forensic Science](https://www.csfs.ca/wp-content/uploads/2017/08/Forensic-Science-Career-Booklet-GSA-2017-2nd-Edition-1-ilovepdf-compressed.pdf). Forensic Science Career Booklet, 2nd ed., 2017. Accédé le 17 nov. 2025.
- ["Biological Forensic Laboratory Technologist"](https://www.jobbank.gc.ca/marketreport/wages-occupation/3165/ca) Government of Canada, Job Bank. 2025. Accédé le 17 nov. 2025.
- [Indeed Canada](https://ca.indeed.com/career-advice/finding-a-job/how-to-become-a-forensic-scientist). "How To Become a Forensic Scientist." Indeed Career Guide, 2025. Accédé le 17 nov. 2025.
- [Forensic Statistics](https://forensicstats.org/blog/2017/07/15/get-know-different-types-forensic-scientists/). "Get to Know Different Types of Forensic Scientists." ForensicStats, 15 July 2017. Accédé le 17 nov. 2025.`

export default function ForensicScientistsBringJusticePage() {
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

