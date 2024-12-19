import { A001_AdventCalendar2024 } from './A001_AdventCalendar2024'

export type BlogArticle = {
  title: string
  date: string
  thumbnail: string
  article: React.JSX.Element
  category?: string[]
}

// export const blogArticles: BlogArticle[] = {A001_AdventCalendar2024}

export const blogArticles = new Map<number, BlogArticle>()
blogArticles.set(20241219001, A001_AdventCalendar2024)
