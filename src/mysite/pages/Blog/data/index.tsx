import { A001_ } from './A001_ruleOfPics'

export interface BlogArticle {
  title: string
  date: string
  thumbnail: string
  article: React.JSX.Element
  category?: string[]
}

export const blogArticles: BlogArticle[] = [
  {
    title: 'title',
    date: '2024/12/17',
    thumbnail: 'img/memory/2405バガテル公園/IMG_0682.jpeg',
    article: A001_(),
  },
]
