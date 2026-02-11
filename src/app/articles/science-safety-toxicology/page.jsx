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
title: "The Science of Safety: A Closer Look at a Career in Toxicology"
---
*Written by Lacey Mullin*  
*January 21st, 2026*

![Toxicologist Image](/images/articles/toxicologist-linear-color-illustration-vector.jpg)

---
## Introduction

From the medicines we take to the air we breathe, unseen chemicals shape our daily lives. When those substances turn harmful, we look to toxicologists to uncover the danger, measure the risk, and protect not only human health, but also other organisms and the surrounding environment. To better understand what a toxicologist does, it is important to understand what toxicology is: Toxicology is a field of science that allows us as a society to better understand the harmful effects of chemicals on living organisms.

## Job Description, Tasks, and Skills

Toxicologists focus on determining the likelihood that these harmful effects could occur and diagnose, treat, and prevent such exposures. They study the underlying biochemical and molecular processes to determine the harmful effects of chemical and physical agents. In addition to studying these processes, toxicologists are working to develop new and improved techniques to do so. Upon determining what harmful effects are caused by exposures, toxicologists also work on how these chemicals can be used safely to minimize the toxic effects to humans, other organisms, and the environment. 

Toxicologists are often employed by academic institutions, governments, research institutes, and various places within the pharmaceutical, food, cosmetic, and agricultural industries. Many specialize in areas such as chemical carcinogenesis, reproductive and developmental toxicology, neurotoxicology, immunotoxicology, inhalation toxicology, and risk assessments. Their work supports public health, regulatory decision-making, and product safety, and often contributes to the enforcement of federal laws designed to prevent cancer, birth defects, reproductive harm, and neurological damage caused by toxic exposures. 

Within their day-to-day work, toxicologists can expect to perform the following tasks:

- Design, conduct, and interpret laboratory and field studies to evaluate the toxic effects of chemicals and physical agents
- Investigate cellular, biochemical, and molecular mechanisms underlying toxic responses
- Assess the safety of therapeutic drugs, food additives, cosmetics, agricultural chemicals, and other substances
- Perform risk assessments to determine safe exposure limits and potential health impacts
- Ensure tests are scientifically valid and meet regulatory standards
- Contribute to product safety evaluations and regulatory submissions 
- Teach and conduct research at post-secondary institutions 
- Communicate chemical risks to the public and increase awareness of environmental and occupational hazards

In addition, success in toxicology is strongly supported by the following soft skills:

- Analytical skills 
- Technical skills
- Communication skills
- Attention to detail 

## Education and Salary

In Ontario, the average salary of toxicologists is $100,000.  Education requirements to become a toxicologist in Canada are as follows:

- A Bachelor’s degree in a related field (i.e Biology or Chemistry)
- Master’s or doctoral degree in a related discipline
- Postdoctoral research (this is only required for employment in academic departments or research institutions)

Toxicologists play a critical role in safeguarding public health and the environment by identifying, understanding, and managing the risks posed by harmful chemicals. Through advanced scientific research, careful risk assessment, and clear communication, they help ensure that everyday products and environmental exposures remain within safe limits. As society continues to develop and use new chemicals and technologies, the expertise of toxicologists will remain essential in balancing innovation with safety. 

---

## References

- [Government of Canada.](https://www.jobbank.gc.ca/marketreport/requirements/2688/ca) (2025, December 1). Job requirements: Toxicologist in Canada. Job Bank.
- [Indeed Careers.](https://ca.indeed.com/career-advice/finding-a-job/what-does-toxicologist-do) (2025, November 20). What Does a Toxicologist Do? And How to Become One. Indeed.
- [Indeed.](https://ca.indeed.com/career/toxicologist/salaries/Ontario) (2026). Toxicologist salary in Ontario. Indeed.
- [Society of Toxicology.](https://www.toxicology.org/careers/toxicologist/becomeTox.asp) (n.d.). Becoming a toxicologist. Society of Toxicology.`

const frenchContent = `---
title: "La science de la sécurité: un regard approfondi sur une carrière en toxicologie"

---

*Écrit par Lacey Mullin*  
*Le 21 janvier 2026*

![Toxicologist Image](/images/articles/toxicologist-linear-color-illustration-vector.jpg)

---
## Introduction

Des médicaments que nous prenons, de l'air que nous respirons, des substances chimiques invisibles façonnent notre quotidien. Lorsque ces substances deviennent nocives, nous faisons appel à des toxicologues pour mettre en évidence le danger, mesurer le risque et protéger non seulement la santé humaine, mais aussi les autres organismes et l'environnement. Pour mieux comprendre le rôle d'un toxicologue, il est important de comprendre ce qu'est la toxicologie: la toxicologie est un domaine scientifique qui permet à la société de mieux comprendre les effets nocifs des substances chimiques sur les organismes vivants.

## Description d’emplois, responsabilités et compétences

Les toxicologues s'attachent à déterminer la probabilité que ces effets nocifs se produisent et à diagnostiquer, traiter et prévenir de telles expositions. Ils étudient les processus biochimiques et moléculaires sous-jacents afin de déterminer les effets nocifs des agents chimiques et physiques. Outre l'étude de ces processus, les toxicologues s'efforcent de mettre au point des techniques nouvelles et améliorées à cette fin. Après avoir déterminé les effets nocifs causés par les expositions, les toxicologues travaillent également sur la manière dont ces produits chimiques peuvent être utilisés en toute sécurité afin de minimiser les effets toxiques sur les êtres humains, les autres organismes et l'environnement. 

Les toxicologues sont souvent employés par des établissements universitaires, des gouvernements, des instituts de recherche et divers organismes dans les secteurs pharmaceutique, alimentaire, cosmétique et agricole. Beaucoup se spécialisent dans des domaines tels que la carcinogenèse chimique, la toxicologie reproductive et développementale, la neurotoxicologie, l'immunotoxicologie, la toxicologie par inhalation et l'évaluation des risques. Leur travail soutient la santé publique, la prise de décision réglementaire et la sécurité des produits, et contribue souvent à l'application des lois fédérales visant à prévenir le cancer, les malformations congénitales, les troubles de la reproduction et les dommages neurologiques causés par l'exposition à des substances toxiques. 

Dans le cadre de leur travail quotidien, les toxicologues peuvent être amenés à effectuer les tâches suivantes:

- Concevoir, mener et interpréter des études en laboratoire et sur le terrain afin d'évaluer les effets toxiques des produits chimiques et des agents physiques.
- Étudier les mécanismes cellulaires, biochimiques et moléculaires à l'origine des réactions toxiques.
- Évaluer la sécurité des médicaments thérapeutiques, des additifs alimentaires, des cosmétiques, des produits chimiques agricoles et d'autres substances.
- Réaliser des évaluations des risques afin de déterminer les limites d'exposition sans danger et les impacts potentiels sur la santé.
- S'assurer que les tests sont scientifiquement valides et conformes aux normes réglementaires.
- Contribuer aux évaluations de la sécurité des produits et aux soumissions réglementaires. 
- Enseigner et mener des recherches dans des établissements d'enseignement supérieur. 
- Communiquer les risques chimiques au public et sensibiliser au danger environnemental et professionnel.

Les toxicologues incorporent également ces compétences sociales dans leurs travaux quotidiens:

- Capacités d'analyse 
- Compétences techniques
- Compétences en communication
- Souci du détail 

## Éducation et salaire

En Ontario, le salaire annuel moyen est d’environ 100 000$ par année.  Les exigences en éducation pour devenir toxicologue au Canada sont les suivantes:

- Licence dans un domaine connexe (par exemple, biologie ou chimie)
- Maîtrise ou doctorat dans une discipline connexe
- Recherche postdoctorale (uniquement requise pour un emploi dans des départements universitaires ou des instituts de recherche)

Les toxicologues jouent un rôle essentiel dans la protection de la santé publique et de l'environnement en identifiant, comprenant et gérant les risques posés par les produits chimiques nocifs. Grâce à des recherches scientifiques avancées, à une évaluation minutieuse des risques et à une communication claire, ils contribuent à garantir que les produits d'usage quotidien et les expositions environnementales restent dans des limites sûres. À mesure que la société continue à développer et à utiliser de nouveaux produits chimiques et technologies, l'expertise des toxicologues restera essentielle pour trouver un équilibre entre innovation et sécurité. 

---

## Références

- [Government of Canada.](https://www.jobbank.gc.ca/marketreport/requirements/2688/ca) (1er décembre 2025). Job requirements: Toxicologist in Canada. Job Bank.
- [Indeed Careers.](https://ca.indeed.com/career-advice/finding-a-job/what-does-toxicologist-do) (20 novembre 2025). What Does a Toxicologist Do? And How to Become One. Indeed.
- [Indeed.](https://ca.indeed.com/career/toxicologist/salaries/Ontario) (2026). Toxicologist salary in Ontario. Indeed.
- [Society of Toxicology.](https://www.toxicology.org/careers/toxicologist/becomeTox.asp) (s.d.). Becoming a toxicologist. Society of Toxicology.`

export default function ScienceSafetyToxicologyPage() {
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
