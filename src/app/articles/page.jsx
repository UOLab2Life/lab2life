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
title: Getting Started
---

## Welcome to Lab2Life

Our mission is to help you explore the diverse and fascinating world of healthcare careers. Whether you're a student curious about your future, a professional looking for a fresh perspective, or simply someone interested in medicine, these articles are written to guide, inform, and inspire you.  

## Why We Created These Articles  

Finding reliable and clear information about healthcare professions can often feel overwhelming. It usually requires hours of research, scattered across multiple sources, before you get the full picture. That's where we come in. Our representatives at Lab2Life have distilled complex information into concise yet detailed articles that highlight key insights. We save you time while still ensuring you gain a deep understanding of each field.  

## What You Can Expect  

Each article is:  

- **Concise and engaging**
- **Focused on healthcare careers**
- **Written with care**

By the end of each read, you'll walk away with a stronger sense of what a profession is, why it matters, and how it fits into the larger healthcare system.  

## How to Navigate  

On the left-hand side of the page, you'll find articles grouped by theme. We recommend starting with a topic that sparks your curiosity. If you're looking for something specific, use the search shortcut **⌘+K** on Mac or **Ctrl+K** on Windows to quickly find what you need. On the right-hand side, you'll see a subheadings panel that shows your current position within an article, making it easier to follow along.

## Learn More Deeply

If a particular topic excites you and you want to continue exploring, we've got you covered. Each article includes a section of sources and references at the bottom, giving you a starting point for further reading and research. We encourage you to take advantage of these references they're your gateway to understanding the field on a deeper level and connecting what you've learned here with the broader medical world.  

## Discover Your Path  

Every career in healthcare plays a vital role, and through this collection, you might just uncover the path that speaks to you. So take a moment, browse through our curated content, and let yourself be inspired. The profession of your dreams might be waiting just a few clicks away.`

const frenchContent = `---
title: "Pour commencer"
---

## Bienvenue à Lab2Life

Notre mission est de vous aider à explorer le monde diversifié et fascinant des carrières en soins de santé. Que vous soyez un étudiant curieux de votre avenir, un professionnel à la recherche d'une nouvelle perspective, ou simplement quelqu'un intéressé par la médecine, ces articles sont écrits pour vous guider, vous informer et vous inspirer.  

## Pourquoi nous avons créé ces articles  

Trouver des informations fiables et claires sur les professions de la santé peut souvent sembler accablant. Il faut généralement des heures de recherche, dispersées sur plusieurs sources, avant d'avoir une vue d'ensemble. C'est là que nous intervenons. Nos représentants chez Lab2Life ont distillé des informations complexes en articles concis mais détaillés qui mettent en évidence les idées clés. Nous vous faisons gagner du temps tout en vous assurant d'acquérir une compréhension approfondie de chaque domaine.  

## Ce que vous pouvez attendre  

Chaque article est :  

- **Concis et engageant**
- **Axé sur les carrières en soins de santé**
- **Écrit avec soin**

À la fin de chaque lecture, vous repartirez avec une meilleure compréhension de ce qu'est une profession, pourquoi elle est importante, et comment elle s'intègre dans le système de soins de santé plus large.  

## Comment naviguer  

Sur le côté gauche de la page, vous trouverez des articles regroupés par thème. Nous recommandons de commencer par un sujet qui éveille votre curiosité. Si vous cherchez quelque chose de spécifique, utilisez le raccourci de recherche **⌘+K** sur Mac ou **Ctrl+K** sur Windows pour trouver rapidement ce dont vous avez besoin. Sur le côté droit, vous verrez un panneau de sous-titres qui montre votre position actuelle dans un article, facilitant le suivi.

## Apprendre plus en profondeur

Si un sujet particulier vous passionne et que vous voulez continuer à explorer, nous sommes là pour vous. Chaque article comprend une section de sources et de références en bas, vous donnant un point de départ pour une lecture et une recherche plus approfondies. Nous vous encourageons à profiter de ces références - elles sont votre passerelle pour comprendre le domaine à un niveau plus profond et connecter ce que vous avez appris ici avec le monde médical plus large.  

## Découvrez votre chemin  

Chaque carrière en soins de santé joue un rôle vital, et à travers cette collection, vous pourriez découvrir le chemin qui vous parle. Alors prenez un moment, parcourez notre contenu sélectionné, et laissez-vous inspirer. La profession de vos rêves pourrait vous attendre à quelques clics seulement.`

export default function ArticlesPage() {
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
