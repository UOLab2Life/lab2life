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
title: "The Body, the Mind, and the Psyche - Mental Health with uoLab2Life"
---
*Written by Maroun Tarabey*  
*October 13th, 2025*

![Mental Health Image](https://alldaymedicalcare.com/wp-content/uploads/2024/08/mental-health-2-1.jpg)

---
## Introduction

Hey everyone - Welcome back to another month with uoLab2Life! This month, we will be exploring the theme of mental health. We’ll also be having an event on October 30th, where we’ll be having a fun night of creativity for mental health and wellness, so stay tuned for that!

Mental Health Day was this past Friday, on October 10th. Its importance, its richness, and its value are evident within the statistics: 1 in 5 Canadians experience a mental health illness, and 39% of high schoolers experience moderate anxiety and depression, with 17% experiencing severe symptoms¹. Additionally, by age 40, half of the Canadian population will have or will experience a mental health disorder². Thus, the importance of mental health in our society is underscored by the results of it being underappreciated - We are our minds, and our minds we, so why not take care of them?

---

¹: Centre for Addiction and Mental Health (n.d.). Mental Illness and Addiction: Facts and Statistics. Retrieved October 13, 2025, from https://www.camh.ca/en/driving-change/the-crisis-is-real/mental-health-statistics

²: Canadian Mental Health Association (2021). Fast Facts about Mental Health and Mental Illness. Retrieved October 13, 2025, from https://cmha.ca/brochure/fast-facts-about-mental-illness/

---

In light of these statistics, this month, we will be particularly focused on highlighting several medical professions to which many people devote themselves to address the mental health issues that society faces. Some of these include:

- Various MD professions (Psychiatrists, family doctors, etc.) who can prescribe medications and formally diagnose individuals with mental health disorders.
- Clinical psychologists who are responsible for treatment plans, diagnosis, and testing for certain neuropsychiatric disorders (e.g, testing for neurodiversity).
- Social workers (with a Master's in Social Work) who typically work in extremely varied contexts to address mental health concerns.
- Registered psychotherapists who typically work in similar contexts to social workers, but hold a different standard of care and licensing than them.

As mental health can affect anyone (yes - even you reading this), we’ve also thought it wise to include some sources that you can either use yourself or recommend to someone else for mental health support:

**[ConnexOntario Helpline](https://connexontario.ca/)**  
1-866-531-2600  
For alcohol and drugs, mental illness, or gambling.

**[211 Ontario](https://211ontario.ca/)**  
Call 211  
For information about mental health services across Ontario.

**[BounceBack](https://bouncebackontario.ca/)**  
1-866-345-0224  
A free cognitive behavioural therapy for adults and youth older than 15.

If interested, here are [more mental health services in Canada](https://www.canada.ca/en/public-health/services/mental-health-services/mental-health-get-help.html) to explore.

It’s important to remember that no matter the hardship, you are not alone. There are people who are willing to help and who know how to help individuals going through mental health crises as well. Just remember that it’s okay not to be okay. 

---

## References

- [University of Waterloo](https://uwaterloo.ca/mechanical-mechatronics-engineering/mme-wellness-program/get-help-now/who-does-what-types-mental-health-practitioners) (n.d.). Who does what? Types of mental health practitioners. Retrieved October 13, 2025.
- [Centre for Addiction and Mental Health](https://www.camh.ca/en/driving-change/the-crisis-is-real/mental-health-statistics) (n.d.). Mental Illness and Addiction: Facts and Statistics. Retrieved October 13, 2025.
- [Canadian Mental Health Association](https://cmha.ca/brochure/fast-facts-about-mental-illness/) (2021). Fast Facts about Mental Health and Mental Illness. Retrieved October 13, 2025.`

const frenchContent = `---
title: "Le corps, l'esprit et la psyché \- La santé mentale avec uoLab2Life"
---
*Par Maroun Tarabey*  
*Le 13 octobre 2025*

![Mental Health Image](https://alldaymedicalcare.com/wp-content/uploads/2024/08/mental-health-2-1.jpg)

---
## Introduction

Bonjour à tous, bienvenue pour un nouveau mois avec uoLab2Life ! Ce mois-ci, nous explorerons le thème de la santé mentale. Nous organiserons également un événement le 30 octobre, une soirée créative et divertissante pour soutenir la santé mentale et le bien-être. Restez à l'écoute pour plus de détails !

La Journée de la santé mentale a eu lieu vendredi dernier, le 10 octobre. Son importance, sa richesse et sa valeur sont évidentes au vu des statistiques: 1 Canadien sur 5 souffre d'une maladie mentale, 39 % des élèves du secondaire souffrent d'anxiété et de dépression modérées, et 17 % présentent des symptômes graves¹. De plus, d'ici l'âge de 40 ans, la moitié de la population canadienne aura souffert ou souffrira d'un trouble de santé mentale². Ainsi, l'importance de la santé mentale dans notre société est soulignée par les conséquences de sa sous-estimation: nous sommes notre esprit, et notre esprit est nous, alors pourquoi ne pas en prendre soin?

---

¹: Centre for Addiction and Mental Health (n.d.). Mental Illness and Addiction: Facts and Statistics. Reçu le 13 octobre 2025 de https://www.camh.ca/en/driving-change/the-crisis-is-real/mental-health-statistics

²: Canadian Mental Health Association (2021). Fast Facts about Mental Health and Mental Illness. Reçu le 13 octobre 2025 de https://cmha.ca/brochure/fast-facts-about-mental-illness/

---

En conséquence, nous nous concentrerons particulièrement ce mois-ci sur plusieurs professions médicales auxquelles de nombreuses personnes se consacrent pour traiter les problèmes de santé mentale auxquels la société est confrontée. Quelques exemples comprennent:

- Diverses professions médicales (psychiatres, médecins de famille, etc.) qui peuvent prescrire des médicaments et diagnostiquer officiellement les personnes souffrant de troubles mentaux.
- Les psychologues cliniciens qui sont responsables des plans de traitement, du diagnostic et des tests pour certains troubles neuropsychiatriques (par exemple, les tests de neurodiversité).
- Les travailleurs sociaux (titulaires d'une maîtrise en travail social) qui travaillent généralement dans des contextes extrêmement variés pour traiter les problèmes de santé mentale.
- Les psychothérapeutes qui travaillent généralement dans des contextes similaires à ceux des travailleurs sociaux, mais qui ont des normes de soins et des licences différentes de celles-ci.

Comme la santé mentale peut toucher n'importe qui (oui, même vous qui lisez ceci), nous avons également jugé utile d'inclure quelques ressources que vous pouvez utiliser vous-même ou recommander à quelqu'un d'autre pour obtenir un soutien en matière de santé mentale :

**[Ligne d'assistance ConnexOntario](https://connexontario.ca/fr/)**  
1-866-531-2600  
Pour l'alcool et les drogues, la maladie mentale ou le jeu.

**[211 Ontario](https://211ontario.ca/recherche/)**  
Appelez 211  
Pour obtenir des informations sur les services de santé mentale en Ontario.

**[BounceBack](https://bouncebackontario.ca/fr/)**  
1-866-345-0224  
Une thérapie cognitivo-comportementale gratuite pour les adultes et les jeunes de plus de 15 ans.

Si vous êtes intéressés, voici plus de services de santé mentale au Canada](https://www.canada.ca/fr/sante-publique/services/services-sante-mentale/sante-mentale-obtenir-aide.html) à explorer.

Il est important de se rappeler que, quelle que soit la difficulté, vous n'êtes pas seul. Il y a des gens qui sont prêts à aider et qui savent comment aider les personnes en crise de santé mentale. Rappelez-vous simplement que c’est correct de ne pas se sentir correct.

---

## Références

- [University of Waterloo](https://uwaterloo.ca/mechanical-mechatronics-engineering/mme-wellness-program/get-help-now/who-does-what-types-mental-health-practitioners) (s.d.). Who does what? Types of mental health practitioners. Accédé le 13 octobre 2025.
- [Centre for Addiction and Mental Health](https://www.camh.ca/en/driving-change/the-crisis-is-real/mental-health-statistics) (s.d.). Mental Illness and Addiction: Facts and Statistics. Accédé le 13 octobre 2025.
- [Canadian Mental Health Association](https://cmha.ca/brochure/fast-facts-about-mental-illness/) (2021). Fast Facts about Mental Health and Mental Illness. Accédé le 13 octobre 2025.`

export default function BodyMindPsychePage() {
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


