import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export function shuffleArray<T>(array: T[]) {
  const bool = [1, -1]
  return array.concat().sort(function () {
    return bool[Math.floor(Math.random() * bool.length)]
  })
}

export function isWithinRange(
  value: number,
  min: number,
  max: number,
): boolean {
  return value >= min && value <= max
}

export interface RoutePath {
  path: string
  children: React.JSX.Element
}

export function convertPathToS3(path: string, isThumb: boolean = false) {
  let isLocal = false
  // isLocal = true

  const BUCKET_NAME = 'torme-mysite-bucket'
  const REGION = 'ap-northeast-1'
  if (isLocal) {
    return `sync/${path}`
  } else {
    if (isThumb) {
      return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/sync/thumb/${path}`
    } else {
      return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/sync/${path}`
    }
  }
}
