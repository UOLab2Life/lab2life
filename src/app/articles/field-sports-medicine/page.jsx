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
title: "Doctors on the Pitch: The Field of Sports Medicine"
---
*Written by Maroun Tarabey*  
*February 1st, 2026*

![Doctor adjusting child's knee image](https://www.academyorthopedics.com/wp-content/uploads/2023/03/Sports-Medicine-1024x684.png)

---
## Introduction

We welcome you back to another month with Lab2Life! This month, we're returning stronger than ever with a new event on the 6th that is a must-attend (FOR DETAILS, SEE OUR [INSTAGRAM @uoLab2Life](https://www.instagram.com/uolab2life/?hl=en), VISIT [OUR WEBSITE](/), OR VISIT [OUR LINKTREE](https://linktr.ee/uolab2life)), as well as a new theme: Sports Medicine!

Are you the active type? Do you play sports? Are you a gunning pre-med or pre-healthcare undergrad student or high schooler who's just itching to enter any medical field but isn't sure where to start? If you said yes to the above, then you're in luck! In this article, we'll explore the basics of the field of sports medicine, what it entails, and what jobs it includes, with more specific articles coming out later during the month.

## So, what is and isn't sports medicine?

Excellent question, my proactive reader! Sports Medicine is a multidisciplinary field in healthcare that very broadly includes any profession that tries to prevent, diagnose, and treat any sports-related injuries or diseases. The very nature of the field makes it extremely diverse, with professionals typically applying skills that come from a multitude of sources. Some examples of what people in sports medicine may learn throughout their various careers include physical therapy, orthopedics, and biomechanics, but also sports psychology and nutrition. As a result, those within the profession typically only have the fact that they work in healthcare alongside athletes in common; there's a job for everybody in this field, which is what makes it highly unique!

Here are some examples of certain professions within the field:

- Athletic trainers
- Exercise physiologists
- Kinesiologists
- Nutritionists
- Physiotherapists
- Primary care sports physicians
- Occupational therapists
- Massage therapists
- Chiropractors
- As well as the many MD professions that involve sports medicine, such as orthopedic surgery, general family doctor positions, and many more!

Sports medicine is a highly variable yet extremely interesting field that is only growing with time, so if you think you're the right fit, tune in to our next few articles that'll explore in greater depth some of these professions to help you choose your career!

---

## References

- [Academy Orthopedics L.L.C.](https://www.academyorthopedics.com/blog/what-is-included-in-sports-medicine/) (2023). What is included in sports medicine? Academy Orthopedics.
- [Pepperdine University Seaver College.](https://seaver.pepperdine.edu/blog/posts/understanding-sports-medicine-a-comprehensive-guide.htm) (2023). Understanding sports medicine: A comprehensive guide.
- [Indeed Editorial Team.](https://ca.indeed.com/career-advice/finding-a-job/sports-medicine-jobs) (2025). 10 lucrative sports medicine jobs in the health sector. Indeed Canada.`

const frenchContent = `---
title: "Les m\u00e9decins sur le terrain: le domaine de la m\u00e9decine du sport"
---
*Écrit par Maroun Tarabey*  
*Le 1er f\u00e9vrier 2026*

![Doctor adjusting child's knee image](https://www.academyorthopedics.com/wp-content/uploads/2023/03/Sports-Medicine-1024x684.png)

---
## Introduction

Nous vous souhaitons la bienvenue pour un nouveau mois avec Lab2Life! Ce mois-ci, nous revenons plus forts que jamais avec un nouvel \u00e9v\u00e9nement incontournable le 6 f\u00e9vrier (POUR DES D\u00c9TAILS, ALLEZ VOIR NOTRE [INSTAGRAM @uoLab2Life](https://www.instagram.com/uolab2life/?hl=en), VISITEZ [NOTRE SITE-WEB](/), OU VISITEZ [NOTRE LINKTREE](https://linktr.ee/uolab2life)), en plus d'un nouvel th\u00e8me: la m\u00e9decine du sport!

Vous êtes plutôt du genre actif? Vous pratiquez un sport? Vous êtes étudiant en médecine ou en sciences de la santé, ou lycéen, et vous avez hâte de vous lancer dans le domaine médical, mais vous ne savez pas par où commencer? Si vous avez répondu oui à ces questions, vous êtes chanceux! Dans cet article, nous allons explorer les bases du domaine de la médecine du sport, ce qu'il implique et les emplois qu'il comprend, avec des articles plus spécifiques qui seront publiés plus tard dans le mois.

## Donc, que peut-on dire de la médecine du sport?

Excellente question, cher lecteur proactif! La médecine du sport est un domaine multidisciplinaire des soins de santé qui englobe très largement toutes les professions qui s'efforcent de prévenir, diagnostiquer et traiter les blessures ou maladies liées au sport. La nature même de ce domaine le rend extrêmement diversifié, les professionnels y appliquant généralement des compétences issues d'une multitude de sources. Parmi les domaines que les professionnels de la médecine du sport peuvent étudier au cours de leur carrière, on peut citer la kinésithérapie, l'orthopédie et la biomécanique, mais aussi la psychologie du sport et la nutrition. Par conséquent, les professionnels de ce domaine n'ont généralement en commun que le fait de travailler dans le secteur de la santé aux côtés d'athlètes. Il y a un emploi pour tout le monde dans ce domaine, ce qui le rend tout à fait unique!

Voici quelques exemples de professions dans ce domaine :

- Entraîneurs sportifs
- Physiologistes de l'exercice
- Kinésiologues
- Nutritionnistes
- Physiothérapeutes
- Médecins du sport en soins primaires
- Ergothérapeutes
- Massothérapeutes
- Chiropraticiens
- Ainsi que les nombreuses professions médicales liées à la médecine du sport, telles que la chirurgie orthopédique, la médecine générale familiale et bien d'autres encore!

La médecine du sport est un domaine très varié mais extrêmement intéressant qui ne cesse de se développer avec le temps. Si vous pensez que ce domaine vous correspond, ne manquez pas nos prochains articles qui exploreront plus en détail certaines de ces professions afin de vous aider à choisir votre carrière!

---

## R\u00e9f\u00e9rences

- [Academy Orthopedics L.L.C.](https://www.academyorthopedics.com/blog/what-is-included-in-sports-medicine/) (2023). What is included in sports medicine? Academy Orthopedics.
- [Pepperdine University Seaver College.](https://seaver.pepperdine.edu/blog/posts/understanding-sports-medicine-a-comprehensive-guide.htm) (2023). Understanding sports medicine: A comprehensive guide.
- [Indeed Editorial Team.](https://ca.indeed.com/career-advice/finding-a-job/sports-medicine-jobs) (2025). 10 lucrative sports medicine jobs in the health sector. Indeed Canada.`

export default function FieldSportsMedicinePage() {
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
