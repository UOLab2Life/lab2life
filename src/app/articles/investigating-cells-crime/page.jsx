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
title: "Investigating Cells or Investigating Crime? An Introduction to the field of Forensic Science"
---
*Written by Maroun Tarabey*  
*November 3rd, 2025*

![Forensic Science Image](https://i.ibb.co/CsD1zc5f/Screenshot-2025-11-02-131303.png)

---
## Introduction

Happy November, everyone! With Halloween done and the beginning of a new month ahead of us, uoLab2Life presents you with our latest theme of the month: Forensic science!

We’ve all heard of them before, whether on television, simply seeing a scientist work on a case in a TV show, or by seeing them actually work in action; we’ve all heard of the field of forensics and what it could offer. But are all jobs within the field of forensics the same? If so, what do those jobs do? How do they differ from each other? Why is forensics so important? Why am I asking so many questions? All of these will be answered in the next few paragraphs, so make sure you keep reading!

In 2023, approximately 6,302 crimes (selected crimes, i.e., the more common ones) were committed and reported in Canada¹. With numerous crimes being difficult to solve based on standard eyewitness testimony, alibis, and statements, as well as the need for more objective truths to be established to solve the crime and deliver justice, more detailed analyses are required that incorporate biology, chemistry, and physics. This is where forensic science comes in. 

---
¹: [Statistics Canada](https://www150.statcan.gc.ca/n1/daily-quotidien/240725/t005b-eng.htm) (2024, August 21). Police-reported crime for selected offences. Accessed November 1, 2025.
---

## Separating facts from fiction - What even is forensic science?

The field of forensic science is the application of the scientific method to the judicial system. Thus, while forensic scientists typically work in labs or other contexts to provide data for a court case, they are also subject to testifying in court. Several different skills and subjects are mastered by forensic scientists and other professionals within this field, including but not limited to:

- DNA analysis
- Fingerprinting
- Autopsy techniques
- Toxicology
- Serology (blood analysis)
- Odontology (analysis of bite marks and bone structure)
- Pathology
- Fibre and hair analysis

among other subjects! (I highly recommend you visit [this article by the Canadian Society of Forensic Science](https://www.csfs.ca/student-zone/student-zone/) for more specific things they can do.)

## Potential careers that can be explored within this field

Many careers involve forensics, which include:

- Forensic psychologists
- Forensic toxicologists
- Forensic pathologists
- Forensic engineers
- Crime Scene Investigators (CSI)
- Odontologists

and many more!

We hope that you’ll enjoy the upcoming articles detailing these professions and what they entail. Have a wonderful and cool November!

---

## References

- [Statistics Canada](https://www150.statcan.gc.ca/n1/daily-quotidien/240725/t005b-eng.htm) (2024, August 21). Police-reported crime for selected offences, Canada, 2022 and 2023 [Table 5]. Accessed November 1, 2025.
- [American Academy of Forensic Sciences](https://www.aafs.org/careers-forensic-science) (n.d.). Careers in forensic science. Accessed November 1, 2025.
- [Canadian Society of Forensic Science](https://www.csfs.ca/student-zone/student-zone/) (n.d.). What is forensic science. Accessed November 1, 2025.`

const frenchContent = `---
title: "Enquêteurs de cellules ou de crimes? Introduction au domaine de la science judiciaire (l’analyse scientifique de cas)"
---
*Par Maroun Tarabey*  
*Le 3 novembre 2025*

![Image du science judiciaire](https://i.ibb.co/CsD1zc5f/Screenshot-2025-11-02-131303.png)

---
## Introduction

Bon mois de novembre à tous! Halloween étant passé et un nouveau mois devant nous, uoLab2Life vous présente son dernier thème du mois: la science judiciaire (ou la science forensique ou légale)!

Nous en avons tous déjà entendu parler de la science judiciaire, que ce soit à la télévision, en voyant simplement un scientifique travailler sur une affaire dans une série télévisée, ou en le voyant réellement à l'œuvre. Mais tous les emplois dans le domaine de la criminalistique sont-ils identiques? Si oui, en quoi consistent ces emplois? En quoi diffèrent-ils les uns des autres? Pourquoi la criminalistique est-elle si importante? Pourquoi est-ce que je pose autant de questions? Vous trouverez les réponses à toutes ces questions dans les paragraphes suivants, alors continuez à lire!

En 2023, environ 6 302 crimes (crimes sélectionnés, c'est-à-dire les plus courants) ont été commis et signalés au Canada¹. De nombreux crimes étant difficiles à résoudre sur la base des témoignages et des alibis et compte tenu de la nécessité d'établir des vérités plus objectives pour résoudre les crimes et rendre justice, des analyses plus détaillées intégrant la biologie, la chimie et la physique sont nécessaires. C'est là qu'intervient la science judiciaire. 

---
¹: [Statistique Canada](https://www150.statcan.gc.ca/n1/daily-quotidien/240725/t005b-eng.htm) (2024, August 21). Police-reported crime for selected offences. Accessed November 1, 2025.
---

## Séparer les faits de la fiction - C’est quoi la science judiciaire?

Le domaine de la science judiciaire consiste à appliquer la méthode scientifique au système judiciaire. Ainsi, si les scientifiques judiciaires travaillent généralement dans des laboratoires ou d'autres contextes afin de fournir des données pour une affaire judiciaire, ils peuvent également être amenés à témoigner devant un tribunal. Les scientifiques judiciaires et autres professionnels de ce domaine maîtrisent plusieurs compétences et matières différentes, notamment, mais sans s'y limiter :
- Analyse ADN
- Empreintes digitales
- Techniques d'autopsie
- Toxicologie
- Sérologie (analyse sanguine)
- Odontologie (analyse des marques de morsures et de la structure osseuse)
- Pathologie
- Analyse des fibres et des cheveux

Parmi [d'autres sujets](https://www.csfs.ca/fr/coin_des_etudiants/que-sont-les-sciences-judiciaires/)!

## Les carrières potentielles

De nombreuses carrières font appel à la science judiciaire, dont :

- Psychologues légistes
- Toxicologues légistes
- Médecins légistes
- Ingénieurs légistes
- Enquêteurs sur les scènes de crime
- Odontologues

et plusieurs autres!

Nous espérons que vous apprécierez les prochains articles détaillant ces professions et ce qu'elles impliquent. Passez un merveilleux mois de novembre au frais!

---

## Références

- [Statistique Canada](https://www150.statcan.gc.ca/n1/daily-quotidien/240725/t005b-eng.htm) (21 août 2024). Police-reported crime for selected offences, Canada, 2022 and 2023 [Table 5]. Accédé le 1 novembre 2025.
- [American Academy of Forensic Sciences](https://www.aafs.org/careers-forensic-science) (s.d.). Careers in forensic science. Accédé le 1 novembre 2025.
- [La Société canadienne des sciences judiciaires](https://www.csfs.ca/student-zone/student-zone/) (s.d.). What is forensic science. Accédé le 1 novembre 2025.`

export default function InvestigatingCellsCrimePage() {
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

