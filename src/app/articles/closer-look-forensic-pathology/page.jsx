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
title: "Uncovering the Truth: A Closer Look at Forensic Pathology"
---
*By Lacey Mullin*  
*November 28th, 2025*

![Forensic Pathologist](https://app.gladeo.org/sites/default/files/2023-07/Forensic%20Pathologist.jpg)

---

What really happens when medicine meets mystery? It's not as simple as an epic crossover episode of Grey's Anatomy and Criminal Minds. The real answer lies within the hands of the forensic pathologists who answer that question one cell, one sample, one data point at a time. Using microscopy, toxicology, imaging, and a detailed anatomical examination, they work methodically to determine what the body can reveal. Unlike Grey's Anatomy and Criminal Minds, their role is less about drama and more about accuracy; translating biological evidence into clear answers for families, clinicians, and investigators.

## Job Description and List of Tasks

Pathology is a branch of medicine that focuses on the examination of tissues, organs, and bodily fluids to understand disease or injury. Forensics applies scientific principles to investigate and resolve legal questions. Forensic pathologists combine the two studies to perform laboratory tests to determine the cause of suspicious deaths. In order to perform these tests with accuracy, forensic pathologists receive specialized training in the following fields:

- Toxicology
- Ballistics and ballistics wounds
- Trace evidence
- Serology
- DNA technology

Along with learning these specialized skills, forensic pathologists perform the following tasks:

- Confirming the body through the collection of information
- Studying the deceased person's medical history
- Evaluating the crime scene
- Performing autopsies

Upon completing their testing, forensic pathologists compile the data to produce a detailed report that explains the mechanism, cause, and time of death. In cases involving potential criminal activity, they may also provide expert testimony in court, presenting their findings in a clear, objective, and scientifically supported manner.

## Soft Skills

Like all medical and investigative professions, forensic pathologists rely on a strong set of soft skills to perform their work effectively:

- Good communication skills - they must translate complex medical findings into precise, understandable reports for investigators, families, and courts
- Adaptability - no two cases are alike; each situation requires a tailored approach and flexible problem-solving
- Ability to cope under pressure - forensic work can involve challenging environments and emotionally heavy cases, making the ability to remain calm under pressure essential
- Record keeping - accurate, organized documentation is crucial to ensure that findings can be easily reviewed, verified, and used in legal proceedings

## Education, Salary, and Work Environment

In Ontario, forensic pathologists make an average of $282,182, thus reflecting the high level of expertise required for this role. Reaching this stage involves extensive training, beginning with a bachelor's degree, followed by a Doctor of Medicine, residency training in pathology, and a fellowship in forensic pathology for specialized expertise. Once certified, forensic pathologists can pursue careers in a range of settings, including medical examiner or coroner's offices, hospitals and private practices, and morgues or forensic laboratories, where they apply their skills in both medical investigation and scientific analysis.

## Conclusion

Forensic pathology is a demanding yet profoundly meaningful profession. From meticulously analyzing evidence to providing answers for families and aiding the justice system, forensic pathologists play a vital role in understanding the circumstances of death and protecting the living. Their extensive training, specialized skill set, and commitment to accuracy ensure that every case is approached with professionalism and care. In a field where every detail matters, forensic pathologists stand at the intersection of knowledge and responsibility, giving a voice to those who can no longer speak for themselves.

## References

- [Cleveland Clinic](https://my.clevelandclinic.org/health/articles/24614-forensic-pathologist) (2023, January 17). What Is a Forensic Pathologist? What They Do & Training. Accessed 28 Nov. 2025.
- [Gladeo](https://losangeles.gladeo.org/career/forensic-pathologist) (n.d.). Forensic pathologist. Accessed 28 Nov. 2025.
- [Indeed Careers](https://ca.indeed.com/career-advice/pay-salary/how-much-does-forensic-pathologist-make) (2025, November 20). How Much Does a Forensic Pathologist Make? (With FAQs). Accessed 28 Nov. 2025.
- [The Royal College of Pathologists](https://www.rcpath.org/discover-pathology/careers-in-pathology/careers-in-medicine/become-a-forensic-pathologist.html) (n.d). Become a Forensic Pathologist. Accessed 28 Nov. 2025.`

const frenchContent = `---
title: "Découvrir la vérité: Un regard approfondi sur la pathologie médico-légale"
---
*Par Lacey Mullin*  
*Le 28 novembre 2025*

![Forensic Pathologist](https://app.gladeo.org/sites/default/files/2023-07/Forensic%20Pathologist.jpg)

---

Que se passe-t-il réellement lorsque la médecine rencontre le mystère ? Ce n'est pas aussi simple qu'un épisode crossover épique entre Grey's Anatomy et Criminal Minds. La véritable réponse se trouve entre les mains des médecins légistes qui, cellule après cellule, échantillon après échantillon, donnée après donnée, la solution est apportée méthodiquement. Grâce à la microscopie, la toxicologie, l'imagerie et un examen anatomique approfondi, ils travaillent avec méthode pour déterminer ce que le corps peut révéler. Contrairement à Grey's Anatomy et Criminal Minds, leur rôle est moins axé sur le sensationnalisme que sur la précision: traduire les preuves biologiques en réponses claires pour les familles, les cliniciens et les enquêteurs.

## Description du poste et liste des tâches

La pathologie est une branche de la médecine qui se concentre sur l'examen des tissus, des organes et des fluides corporels afin de comprendre les maladies et les blessures. La médecine légale applique les principes scientifiques pour enquêter sur les questions juridiques et les résoudre. Les médecins légistes combinent ces deux disciplines pour effectuer des analyses de laboratoire permettant de déterminer la cause des décès suspects. Afin de réaliser ces analyses avec précision, les médecins légistes reçoivent une formation spécialisée dans les domaines suivants:

- Toxicologie
- Balistique et blessures par balles
- Indices de traces
- Sérologie
- Technologie ADN

En plus d'acquérir ces compétences spécialisées, les médecins légistes accomplissent les tâches suivantes:

- Confirmation de l'identité du corps grâce à la collecte d'informations
- Étude des antécédents médicaux de la personne décédée
- Évaluation de la scène du crime
- Réalisation d'autopsies

Une fois leurs tests terminés, les médecins légistes compilent les données afin de produire un rapport détaillé qui explique le mécanisme, la cause et l'heure du décès. Dans les affaires impliquant une activité criminelle potentielle, ils peuvent également fournir un témoignage d'expert devant les tribunaux, en présentant leurs conclusions de manière claire, objective et scientifiquement étayée.

## Compétences relationnelles

Comme toutes les professions médicales et d'enquête, les médecins légistes s'appuient sur un ensemble solide de compétences générales pour accomplir efficacement leur travail:

- Bonnes compétences en communication - ils doivent traduire des conclusions médicales complexes en rapports précis et compréhensibles pour les enquêteurs, les familles et les tribunaux
- Capacité d'adaptation - il n'y a pas deux cas identiques ; chaque situation nécessite une approche sur mesure et une résolution flexible des problèmes
- Capacité à faire face à la pression - le travail médico-légal peut impliquer des environnements difficiles et des cas émotionnellement lourds, ce qui rend essentielle la capacité à rester calme sous pression
- Tenue des dossiers - une documentation précise et organisée est cruciale pour garantir que les conclusions puissent être facilement examinées, vérifiées et utilisées dans le cadre de procédures judiciaires

## Formation, salaire et environnement de travail

En Ontario, les médecins légistes gagnent en moyenne 282 182$, ce qui reflète le haut niveau d'expertise requis pour cette fonction. Pour atteindre ce niveau, il faut suivre une formation approfondie, qui commence par un baccalauréat, suivi d'un doctorat en médecine, d'une résidence en pathologie et d'une bourse de recherche en médecine légale pour acquérir une expertise spécialisée. Une fois certifiés, les médecins légistes peuvent poursuivre leur carrière dans divers milieux, notamment les bureaux des médecins légistes ou des coroners, les hôpitaux et les cabinets privés, ainsi que les morgues ou les laboratoires médico-légaux, où ils mettent en pratique leurs compétences en matière d'enquête médicale et d'analyse scientifique.

## Conclusion

La médecine légale est une profession exigeante, mais profondément significative. Qu'il s'agisse d'analyser méticuleusement des preuves, d'apporter des réponses aux familles ou d'aider le système judiciaire, les médecins légistes jouent un rôle essentiel dans la compréhension des circonstances d'un décès et la protection des vivants. Leur formation approfondie, leurs compétences spécialisées et leur souci de précision garantissent que chaque cas est traité avec professionnalisme et attention. Dans un domaine où chaque détail compte, les médecins légistes se trouvent à la croisée des chemins entre le savoir et la responsabilité, donnant une voix à ceux qui ne peuvent plus s'exprimer eux-mêmes.

## Références

- [Cleveland Clinic](https://my.clevelandclinic.org/health/articles/24614-forensic-pathologist) (2023, 17 janvier). What Is a Forensic Pathologist? What They Do & Training. Accédé le 28 nov. 2025.
- [Gladeo](https://losangeles.gladeo.org/career/forensic-pathologist) (s.d.). Forensic pathologist. Accédé le 28 nov. 2025.
- [Indeed Careers](https://ca.indeed.com/career-advice/pay-salary/how-much-does-forensic-pathologist-make) (2025, 20 novembre). How Much Does a Forensic Pathologist Make? (With FAQs). Accédé le 28 nov. 2025.
- [The Royal College of Pathologists](https://www.rcpath.org/discover-pathology/careers-in-pathology/careers-in-medicine/become-a-forensic-pathologist.html) (s.d). Become a Forensic Pathologist. Accédé le 28 nov. 2025.`

export default function CloserLookForensicPathologyPage() {
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

