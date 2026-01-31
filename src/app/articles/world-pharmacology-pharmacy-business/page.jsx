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
title: "The World of Pharmacology, Pharmacy, and Business - an in-depth introduction"
---
*Written by Maroun Tarabey*  
*January 19th, 2026*

![Pharmacist Image](https://t3.ftcdn.net/jpg/00/89/56/50/360_F_89565069_3DGtZfY1jzntFsfbffN7o5l1S5YfwYUp.jpg)

---
## Introduction

Welcome back, everyone, to Lab2Life’s articles! We hope that the winter break - and start of the new semester - have both been excellent and smooth for all. Due to exams, we took a short break from writing in December, but we plan to return stronger than ever with our biweekly articles, new and improved events, and monthly podcasts!

Interested in chemistry? Interested in business? Interested in both? Interested in potentially pursuing a degree that will enable you to work in either research or clinical practice, with a focus on environments that are either entrepreneurial or have entrepreneurial elements? Interested in.. Well, I think you get the point; in any case, if you said yes to any of these, then you will absolutely love this month’s theme!

We start this month strong with the world of pharmacology. Pharmacology is generally defined as the study and application of science to drugs, which is subdivided into two broad categories: Pharmacodynamics, which is the study of the effects of drugs on organisms; this includes studying their biochemical mechanism of action (i.e how it works), what effects it induces in organisms, as well as other molecular interactions that occur with said drug. Pharmacokinetics, on the other hand, is defined as the effects of an organism on a drug - this is thus mainly the focus of how an organism metabolizes a drug, how fast it works, which organs deal with the drug mainly, as well as how the drug distributes itself in the body.

## Less explanations, more definitions - What even is a drug?

Before delving into the realm of pharmacy, pharmacological research, and other jobs, it’s important to understand what a drug even is… Unfortunately, this one is difficult to define. A drug is traditionally thought to be any molecule introduced to the body that can modify it, but this in itself omits a lot of definitions and includes many that maybe shouldn’t be present. 

Are molecules needed to survive for everyday living, like oxygen, then a drug? How about cellular therapies, which can modify the body, which are not defined as drugs according to that definition, despite what they do? As a result, drugs defined within this article refer to any molecule or substance, which isn’t food or drink, that can be used to treat, prevent, or diagnose a disease within the body¹.

---
¹: [National Cancer Institute. (n.d.).](https://www.cancer.gov/publications/dictionaries/cancer-terms/def/drug). Drug. In NCI Dictionary of Cancer Terms. U.S. Department of Health and Human Services. Accessed January 19, 2026.
---

## Putting the biopharmaceutical theory lecture aside, what jobs are in this field?

Great question! These include:

- Researchers in pharmacology
- Laboratory technicians
- Clinical scientists in hospitals
- Toxicologists
- Drug safety monitors
- Regulatory-compliant officers
- Pharmacists (PharmD or BScPharm)

However, what’s fascinating is that many pharmacologists work in business-related ventures. Examples include:

- Medical science liaisons
- Sales representatives for pharmaceutical companies
- Medical affairs associates
- And pharmacists (**NOT PHARMACOLOGISTS** - one’s a researcher, the other a health professional) - especially those who work in commercial environments! Pharmacists commonly (about 70%²) own or work in businesses (i.e pharmacies). They may be the sole proprietors of a pharmacy or in partnership with another, or they may be a part of a corporation, but it is a very common venture that allows for flexible hours, independence, and a team of their own. **If you’re into business and healthcare, this may be the career for you!**

---
²: [ Ontario College of Pharmacists. (2025)](https://ocpinfo.com/wp-content/uploads/2025/05/Supplementary-Data-2021-Annual-Report.pdf). Supplementary data: 2021 annual report.. Accessed January 19, 2026.
---

If you’re interested in a high, in-depth analysis of what a pharmacology degree can bring you, [I recommend you check out this article written by the University of Toronto](https://pharmtox.utoronto.ca/careers-pharmacology-and-toxicology).
 
We hope that you enjoyed this short introduction to this very chemistry and business-related month. We’ll see you next time!

---

## References

- [Baron, S., Linton, S., & O’Malley, M. A.](https://pmc.ncbi.nlm.nih.gov/articles/PMC10629940/) (2023). On drugs. Journal of Medical Philosophy.
- [Department of Pharmacology & Toxicology, University of Toronto.](https://pharmtox.utoronto.ca/careers-pharmacology-and-toxicology) (n.d.). Careers in pharmacology and toxicology. University of Toronto. Retrieved January 19th, 2026.
- [Marino, M., Jamal, Z., & Zito, P. M.](https://www.ncbi.nlm.nih.gov/books/NBK507791/) (2025). Pharmacodynamics. In StatPearls [Internet]. StatPearls Publishing.
- [National Cancer Institute.](https://www.cancer.gov/publications/dictionaries/cancer-terms/def/drug) (n.d.). Drug. In NCI Dictionary of Cancer Terms. U.S. Department of Health and Human Services. Retrieved January 19th, 2026.
- [Ontario College of Pharmacists.](https://ocpinfo.com/wp-content/uploads/2025/05/Supplementary-Data-2021-Annual-Report.pdf) (2025). Supplementary data: 2021 annual report.
- [PNGTree.](https://pngtree.com/free-png-vectors/pharmacist) (n.d.). Pharmacist vectors. PNGTree. Retrieved January 19th, 2026.
- [University of Waterloo School of Pharmacy.](https://uwaterloo.ca/pharmacy/news/path-pharmacy-ownership-part-three) (n.d.). The path to pharmacy ownership: Part three. Retrieved January 19th, 2026.`

const frenchContent = `---
title: "Le monde de la pharmacologie, de la pharmacie et des affaires - Une introduction "
---
*Écrit par Maroun Tarabey*  
*Le 19 janvier 2026*

![Pharmacist Image](https://t3.ftcdn.net/jpg/00/89/56/50/360_F_89565069_3DGtZfY1jzntFsfbffN7o5l1S5YfwYUp.jpg)

---
## Introduction

Bonjour à tous et bienvenue dans les articles de Lab2Life! Nous espérons que les vacances et le début du nouveau semestre se sont bien passés. En raison des examens, nous avons fait une petite pause dans la rédaction de nos articles en décembre, mais nous prévoyons de revenir plus forts que jamais avec nos articles, nos événements nouveaux et améliorés et nos podcasts mensuels!

Vous vous intéressez à la chimie? Vous vous intéressez au monde des affaires? Vous vous intéressez aux deux? Vous souhaitez obtenir un diplôme qui vous permettra de travailler dans la recherche ou la pratique clinique, dans un environnement entrepreneurial ou comportant des éléments entrepreneuriaux? Vous vous intéressez à... Bon, je pense que vous avez compris. Quoi qu'il en soit, si vous avez répondu oui à l'une de ces questions, vous allez adorer le thème de ce mois-ci!

Nous commençons ce mois-ci en force avec le monde de la pharmacologie. La pharmacologie est généralement définie comme l'étude et l'application de la science aux médicaments, qui se subdivise en deux grandes catégories: la pharmacodynamique, qui est l'étude des effets des médicaments sur les organismes; cela comprend l'étude de leur mécanisme d'action biochimique (c'est-à-dire comment ils fonctionnent), les effets qu'ils induisent dans les organismes, ainsi que d'autres interactions moléculaires qui se produisent avec le médicament. La pharmacocinétique, quant à elle, est définie comme les effets d'un organisme sur un médicament. Elle s'intéresse donc principalement à la façon dont un organisme métabolise un médicament, à la vitesse à laquelle il agit, aux organes qui le traitent principalement, ainsi qu'à la façon dont le médicament se distribue dans l'organisme.

## Moins d’explications, plus de définitions - C’est quoi une drogue même?

Avant de se plonger dans le domaine de la pharmacie, de la recherche pharmacologique et d'autres métiers, il est important de comprendre ce qu'est un médicament... Malheureusement, celui-ci est difficile à définir. On considère traditionnellement qu'un médicament est toute molécule introduite dans l'organisme qui peut le modifier, mais cette définition omet en soi de nombreuses définitions et en inclut beaucoup qui ne devraient peut-être pas y figurer. 

Les molécules nécessaires à la survie quotidienne, comme l'oxygène, sont-elles des médicaments? Qu'en est-il des thérapies cellulaires, qui peuvent modifier l'organisme, mais qui ne sont pas définies comme des médicaments selon cette définition, malgré leur action? Par conséquent, les médicaments définis dans cet article désignent toute molécule ou substance, autre qu'un aliment ou une boisson, qui peut être utilisée pour traiter, prévenir ou diagnostiquer une maladie dans l'organisme¹.

---
¹: [National Cancer Institute. (n.d.).](https://www.cancer.gov/publications/dictionaries/cancer-terms/def/drug). Drug. In NCI Dictionary of Cancer Terms. U.S. Department of Health and Human Services. Accédé le 19 janvier 2026.
---

## Bon, continuant avec la pharmacologie, quelles carrières puisse-je m’attendre à voir dans ce domaine?

Excellente question! Ceux-ci incluent:

- Chercheurs en pharmacologie
- Techniciens de laboratoire
- Chercheurs cliniques dans les hôpitaux
- Toxicologues
- Contrôleurs de la sécurité des médicaments
- Responsables de la conformité réglementaire
- Pharmaciens (PharmD ou BScPharm)

Par contre, ce qui est fascinant, c'est que plusieurs professionnels dans le domaine de la pharmacologie travaillent en affaires. Des exemples incluent:

- Chargés de liaison en sciences médicales
- Représentants commerciaux pour les sociétés pharmaceutiques
- Associés aux affaires médicales
- Et pharmaciens (**PAS PHARMACOLOGISTES** - les uns sont chercheurs, les autres professionnels de santé), en particulier ceux qui travaillent dans des environnements commerciaux! Souvent, ils travaillent ou sont propriétaires de leurs propres entreprises (des pharmacies, environ 70%). Ils peuvent être propriétaires uniques d'une pharmacie ou associés à un autre propriétaire, ou encore faire partie d'une société, mais il s'agit d'une entreprise très courante qui offre des horaires flexibles, une grande indépendance et la possibilité de constituer sa propre équipe. ** Si vous aimez les affaires et les soins de santé, cette carrière est peut-être faite pour vous!**

---
²: [Ontario College of Pharmacists. (2025)](https://ocpinfo.com/wp-content/uploads/2025/05/Supplementary-Data-2021-Annual-Report.pdf). Supplementary data: 2021 annual report. Accédé le 19 janvier 2026.
---

Si vous êtes intéressés à en savoir plus sur ce sujet, [veuillez lire cet article par l'Université de Toronto](https://pharmtox.utoronto.ca/careers-pharmacology-and-toxicology).
 
Nous espérons que vous avez apprécié cette brève introduction à ce mois consacré à la chimie et aux affaires. À la prochaine fois!

---

## Références

- [Baron, S., Linton, S., & O’Malley, M. A.](https://pmc.ncbi.nlm.nih.gov/articles/PMC10629940/) (2023). On drugs. Journal of Medical Philosophy.
- [Department of Pharmacology & Toxicology, University of Toronto.](https://pharmtox.utoronto.ca/careers-pharmacology-and-toxicology) (s.d.). Careers in pharmacology and toxicology. University of Toronto. Accédé le 19 janvier 2026.
- [Marino, M., Jamal, Z., & Zito, P. M.](https://www.ncbi.nlm.nih.gov/books/NBK507791/) (2025). Pharmacodynamics. In StatPearls [Internet]. StatPearls Publishing.
- [National Cancer Institute.](https://www.cancer.gov/publications/dictionaries/cancer-terms/def/drug) (s.d.). Drug. In NCI Dictionary of Cancer Terms. U.S. Department of Health and Human Services. Accédé le 19 janvier 2026.
- [Ontario College of Pharmacists.](https://ocpinfo.com/wp-content/uploads/2025/05/Supplementary-Data-2021-Annual-Report.pdf) (2025). Supplementary data: 2021 annual report. Accédé le 19 janvier 2026.
- [PNGTree.](https://pngtree.com/free-png-vectors/pharmacist) (s.d.). Pharmacist vectors. PNGTree. Accédé le 19 janvier 2026.
- [University of Waterloo School of Pharmacy.](https://uwaterloo.ca/pharmacy/news/path-pharmacy-ownership-part-three) (s.d.). The path to pharmacy ownership: Part three. Accédé le 19 janvier 2026.`

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

