import { useEffect, useState } from 'react'

export interface RememberWord {
  length: string
  areacode: string
  city: string
  word: string
  dateAisu: string
  dateTorme: string
  supplement: string
}

export default function RememberWordCsvLoader() {
  const [data, setData] = useState<RememberWord[] | null>(null)

  useEffect(() => {
    fetch('/areacode/rememberWords.csv')
      .then((res) => res.text())
      .then((text) => {
        const parsed = parseCSV<RememberWord>(text, (row) => ({
          length: row['長さ'],
          areacode: row['市外局番'],
          city: row['代表都市'],
          word: row['覚え方'],
          dateAisu: row['あいす'],
          dateTorme: row['とるめ'],
          supplement: row['補足\r'].split('\r')[0],
        }))

        setData(parsed)
      })
  }, [])

  console.log(data)
  return data
}

function parseCSV<T>(
  csvText: string,
  convert: (row: Record<string, string>) => T,
): T[] {
  const lines = csvText.trim().split('\n')
  const headers = lines[0].split(',')
  console.log(headers)

  return lines.slice(1).map((line) => {
    const cols = line.split(',')
    const rowObj: Record<string, string> = {}

    headers.forEach((header, i) => {
      rowObj[header] = cols[i]
    })
    return convert(rowObj)
  })
}
