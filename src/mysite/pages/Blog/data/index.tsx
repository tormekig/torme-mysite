import { A001_AdventCalendar2024 } from './A001_AdventCalendar2024'

export interface BlogArticle {
  title: string
  date: string
  thumbnail: string
  article: React.JSX.Element
  category?: string[]
}

export const blogArticles: BlogArticle[] = [A001_AdventCalendar2024]
