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
title: "From Injury to Recovery - The Work of Athletic Therapists"
---
*Written by Anoosha Rehman*  
*February 16th, 2026*

![Athletic therapist at work](https://brocku.ca/brock-news/wp-content/uploads/2020/09/KelseyMarshall-1600x1067.jpg?x56978)

---
## Introduction

In the final minutes of a close game, you see an athlete go down. The crowd quiets. Coaches signal for help… And within seconds, an athletic therapist is at the athlete’s side, assessing the injury, stabilizing the joint, and making a rapid decision that could affect the rest of the athlete’s career.

Athletic therapists are often the first medical professionals to respond when injuries occur in sport. While physicians diagnose and surgeons operate, athletic therapists manage the critical space between injury and full recovery. Their work blends emergency care, rehabilitation science, and injury prevention into one highly specialized profession. In a field driven by performance and pressure, they ensure that recovery is safe, structured, and evidence-based.

## Understanding Athletic Therapy

Athletic therapy is a healthcare profession focused on the prevention, assessment, emergency care, and rehabilitation of musculoskeletal injuries. In Canada, certified professionals are regulated through the Canadian Athletic Therapists Association. 

Athletic therapists combine rapid decision-making during competition with long-term rehabilitation planning in clinical settings. Unlike general fitness trainers, athletic therapists are medically trained to handle acute injuries on the field and guide structured rehabilitation afterward. Their work is not limited to elite athletes; they are also able to treat dancers, industrial workers, military personnel, and active individuals of all ages. 

Their responsibilities may include:

- Providing immediate on-field injury assessment and emergency care
- Taping, bracing, and stabilizing injured joints
- Designing individualized rehabilitation programs
- Conducting return-to-play evaluations
- Managing concussions and monitoring recovery protocols
- Educating athletes on injury prevention strategies
- Communicating with physicians, coaches, and physiotherapists
- Documenting progress through detailed clinical reports

## Skills Beyond the Field

Athletic therapy demands more than anatomical knowledge. Professionals must remain calm and composed under pressure, especially during high-stakes competitions where athletes, coaches, and spectators are watching.

Key soft skills include:

- Quick clinical reasoning during emergencies
- Strong observation of biomechanics and movement patterns
- Clear communication with athletes and medical teams
- Emotional intelligence and motivational support
- Ethical judgment when determining safe return-to-play
- Physical stamina for long hours during tournaments or travel
- Attention to detail in rehabilitation progress tracking

Athletic therapists often act as both medical providers and trusted supports for athletes navigating frustration, setbacks, and recovery challenges.

## Professional Path & Workplace Setting

Athletic therapists in Canada typically earn around $32 per hour, which corresponds to an estimated $66,000 CAD per year for full-time workers¹. This can vary depending on experience, setting, and whether they work with professional teams or private clinics. Some combine team coverage with clinic-based rehabilitation practice.

Common workplaces include:

- University and collegiate athletic departments
- Professional sports organizations
- Private sports injury clinics
- High school athletic programs
- Military and industrial rehabilitation settings

Educational requirements generally include:

- A Bachelor’s degree in athletic therapy or a related kinesiology program
- Completion of an accredited athletic therapy certification program
- Successful completion of the national certification exam through the Canadian Athletic Therapists Association
- Ongoing professional development and emergency-care certification (CPR/AED)

Unlike physicians, athletic therapists do not attend medical school, but their clinical training is specialized and intensive, particularly in musculoskeletal assessment and rehabilitation.

Athletic therapists ensure that injuries are not ignored, rushed, or mishandled. They protect athletes from long-term damage, reduce the risk of reinjury, and help restore confidence alongside physical strength.

As sports grow increasingly competitive and year-round training becomes the norm, the demand for injury prevention and rehabilitation continues to expand. Behind every safe return to play is a professional who understands that healing is not simply about pain reduction; it’s about restoring stability, strength, and trust in one’s body.

In the world of sport, resilience is admired. Athletic therapists make it possible.

---
¹: [Government of Canada.](https://www.jobbank.gc.ca/marketreport/wages-occupation/22755/ca) (2025, November 19). Athletic Therapist in Canada | Wages. Job Bank. Accessed February 17, 2026.
---

## References

- [Government of Canada.](https://www.jobbank.gc.ca/marketreport/wages-occupation/22755/ca) (2025, November 19). Athletic Therapist in Canada | Wages. Job Bank. Accessed February 17, 2026.
- [Indeed Canada.](https://ca.indeed.com/career-advice/finding-a-job/how-to-become-sports-therapist) (2025, November 20). How to Become a Sports Therapist. Indeed Career Guide. Accessed February 17, 2026.
- [Canadian Athletic Therapists Association.](https://athletictherapy.org/) (2025). Canadian Athletic Therapists Association. Canadian Athletic Therapists Association. Accessed February 17, 2026.
- [Brock University.](https://brocku.ca/brock-news/2020/09/brock-athletic-therapist-building-career-on-national-stage/) (2020, September 30). Brock Athletic Therapist Building Career on National Stage. Brock News. Accessed February 17, 2026.`

const frenchContent = `---
title: "De la blessure à la guérison - le travail des thérapeutes sportifs"
---
*Écrit par Anoosha Rehman*  
*Le 16 février 2026*

![Thérapeute sportif au travail](https://brocku.ca/brock-news/wp-content/uploads/2020/09/KelseyMarshall-1600x1067.jpg?x56978)

---
## Introduction

Dans les dernières minutes d'un match serré, vous voyez un athlète s'effondrer. La foule se tait. Les entraîneurs font signe pour demander de l'aide... Et en quelques secondes, un thérapeute sportif est aux côtés de l'athlète, évaluant la blessure, stabilisant l'articulation et prenant une décision rapide susceptible d'avoir une incidence sur le reste de sa carrière.

Les thérapeutes sportifs sont souvent les premiers professionnels de santé à intervenir en cas de blessure dans le domaine du sport. Tandis que les médecins établissent le diagnostic et que les chirurgiens opèrent, les thérapeutes sportifs gèrent la période critique entre la blessure et le rétablissement complet. Leur travail combine les soins d'urgence, la science de la rééducation et la prévention des blessures en une profession hautement spécialisée. Dans un domaine où la performance et la pression sont omniprésentes, ils veillent à ce que le rétablissement se fasse en toute sécurité, de manière structurée et fondée sur des preuves scientifiques.

## Comprendre la thérapie sportive

La thérapie sportive est une profession de la santé axée sur la prévention, l'évaluation, les soins d'urgence et la réadaptation des blessures musculo-squelettiques. Au Canada, les professionnels certifiés sont réglementés par l'Association canadienne des thérapeutes du sport. 

Les thérapeutes du sport combinent une prise de décision rapide pendant les compétitions et une planification de la réadaptation à long terme en milieu clinique. Contrairement aux entraîneurs physiques généraux, les thérapeutes du sport ont une formation médicale qui leur permet de traiter les blessures aiguës sur le terrain et d'orienter ensuite les patients vers une réadaptation structurée. Leur travail ne se limite pas aux athlètes d'élite ; ils peuvent également traiter des danseurs, des travailleurs industriels, des militaires et des personnes actives de tous âges.

Leurs responsabilités peuvent inclure:

- Évaluation immédiate des blessures sur le terrain et soins d'urgence
- Bander, immobiliser et stabiliser les articulations blessées
- Concevoir des programmes de rééducation personnalisés
- Réaliser des évaluations de reprise du sport
- Gérer les commotions cérébrales et surveiller les protocoles de rétablissement
- Sensibiliser les athlètes aux stratégies de prévention des blessures
- Communiquer avec les médecins, les entraîneurs et les physiothérapeutes
- Documenter les progrès réalisés à l'aide de rapports cliniques détaillés

## Compétences au-delà du terrain

La thérapie sportive exige plus que des connaissances anatomiques. Les professionnels doivent rester calmes et sereins sous pression, en particulier lors de compétitions à enjeux élevés où les athlètes, les entraîneurs et les spectateurs les observent.

Les compétences relationnelles clés comprennent:

- Raisonnement clinique rapide lors des urgences
- Observation attentive de la biomécanique et des schémas de mouvement
- Communication claire avec les athlètes et les équipes médicales
- Intelligence émotionnelle et soutien motivationnel
- Jugement éthique pour déterminer le moment où un athlète peut reprendre le sport en toute sécurité
- Endurance physique pour les longues heures passées lors des tournois ou des déplacements
- Souci du détail dans le suivi des progrès de rééducation

Les thérapeutes sportifs jouent souvent le rôle à la fois de prestataires médicaux et de soutiens de confiance pour les athlètes confrontés à la frustration, aux revers et aux défis liés à la récupération.

## Parcours professionnel et environnement de travail

Au Canada, les thérapeutes sportifs gagnent généralement environ 32 dollars de l'heure, ce qui correspond à environ 66 000 $¹ par an pour les travailleurs à temps plein. Cela peut varier en fonction de l'expérience, du contexte et du fait qu'ils travaillent avec des équipes professionnelles ou dans des cliniques privées. Certains combinent la couverture d'équipes avec la pratique de la rééducation en clinique.

Les lieux de travail courants comprennent:

- Départements sportifs universitaires et collégiaux
- Organisations sportives professionnelles
- Cliniques privées spécialisées dans les blessures sportives
- Programmes sportifs dans les lycées
- Centres de rééducation militaires et industriels

Les exigences en matière de formation comprennent généralement:

- Un baccalauréat en thérapie sportive ou dans un programme connexe en kinésiologie.
- Avoir suivi un programme de certification en thérapie sportive agréé.
- Avoir réussi l'examen national de certification de l'Association canadienne des thérapeutes du sport.
- Formation professionnelle continue et certification en soins d'urgence (RCR/DEA).

Contrairement aux médecins, les thérapeutes sportifs ne suivent pas de formation médicale, mais leur formation clinique est spécialisée et intensive, en particulier dans le domaine de l'évaluation et de la rééducation musculo-squelettiques.

Les thérapeutes sportifs veillent à ce que les blessures ne soient pas ignorées, traitées à la hâte ou mal soignées. Ils protègent les athlètes contre les dommages à long terme, réduisent le risque de nouvelle blessure et les aident à retrouver leur confiance en eux ainsi que leur force physique.

À mesure que le sport devient de plus en plus compétitif et que l'entraînement tout au long de l'année devient la norme, la demande en matière de prévention des blessures et de rééducation ne cesse de croître. Derrière chaque retour au jeu en toute sécurité se cache un professionnel qui comprend que la guérison ne consiste pas simplement à réduire la douleur, mais aussi à restaurer la stabilité, la force et la confiance en son corps.

Dans le monde du sport, la résilience est admirée. Les thérapeutes sportifs la rendent possible.

---
¹: [Gouvernement du Canada.](https://www.jobbank.gc.ca/marketreport/wages-occupation/22755/ca) (2025, 19 novembre). Athletic Therapist in Canada | Wages. Job Bank. Accédé le 17 février 2026.
---

## Références

- [Gouvernement du Canada.](https://www.jobbank.gc.ca/marketreport/wages-occupation/22755/ca) (2025, 19 novembre). Athletic Therapist in Canada | Wages. Job Bank. Accédé le 17 février 2026.
- [Indeed Canada.](https://ca.indeed.com/career-advice/finding-a-job/how-to-become-sports-therapist) (2025, 20 novembre). How to Become a Sports Therapist. Indeed Career Guide. Accédé le 17 février 2026.
- [Canadian Athletic Therapists Association.](https://athletictherapy.org/) (2025). Canadian Athletic Therapists Association. Canadian Athletic Therapists Association. Accédé le 17 février 2026.
- [Université Brock.](https://brocku.ca/brock-news/2020/09/brock-athletic-therapist-building-career-on-national-stage/) (2020, 30 septembre). Brock Athletic Therapist Building Career on National Stage. Brock News. Accédé le 17 février 2026.`

export default function WorkAthleticTherapistsPage() {
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
