import React from 'react'
import { Link } from 'react-router-dom'
import { getColorStyleByAreaCode } from './color'
import areacode from 'areacode/assets/css/areacode.module.scss'

export function Code2digit() {
  const cols = 9

  const numbers = Array.from({ length: cols }, (_, row) =>
    (row + 1).toString().padStart(2, '0'),
  )

  return (
    <div className={areacode.codeListContainer}>
      <table
        style={{ borderCollapse: 'collapse', textAlign: 'center' }}
        className={areacode.codeList}
      >
        <tbody>
          <tr>
            {numbers.map((col, colIndex) => {
              return (
                <td
                  key={colIndex}
                  style={getColorStyleByAreaCode(col).background}
                >
                  <Link to={`/areacode/code/prefix/${col}`}>{col}</Link>
                </td>
              )
            })}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export function Code3digit({
  rowsToShow,
  closeFunc,
}: {
  rowsToShow?: number[]
  closeFunc?: () => void
}) {
  const rows = 9
  const cols = 9

  rowsToShow = rowsToShow ? rowsToShow : [1, 2, 3, 4, 5, 6, 7, 8, 9]

  const numbers = Array.from({ length: rows }, (_, row) => {
    if (row === 2) return ['03']
    if (row === 5) return ['06']
    return Array.from({ length: cols }, (_, col) =>
      ((row + 1) * 10 + (col + 1)).toString().padStart(3, '0'),
    )
  })

  return (
    <div className={areacode.codeListContainer}>
      <table
        style={{ borderCollapse: 'collapse', textAlign: 'center' }}
        className={areacode.codeList}
      >
        <tbody onClick={closeFunc}>
          {numbers.map((row, rowIndex) => {
            if (rowsToShow && !rowsToShow.includes(rowIndex + 1)) return <></>
            const num2digits = '0' + (rowIndex + 1).toString()
            return (
              <tr key={rowIndex}>
                {rowIndex + 1 === 3 || rowIndex + 1 === 6 ? (
                  <td
                    key={rowIndex}
                    colSpan={cols}
                    style={getColorStyleByAreaCode(num2digits).background}
                  >
                    <Link to={`/areacode/code/prefix/${num2digits}`}>
                      {num2digits}
                    </Link>
                  </td>
                ) : (
                  row.map((num, colIndex) => {
                    if (colIndex == 0 && rowIndex != 0)
                      return (
                        <td
                          key={colIndex}
                          style={{
                            backgroundColor: '#eee',
                            color: '#fff',
                          }}
                        >
                          {num}
                        </td>
                      )
                    return (
                      <td
                        key={colIndex}
                        style={getColorStyleByAreaCode(num).background}
                      >
                        <Link to={`/areacode/code/prefix/${num}`}>{num}</Link>
                      </td>
                    )
                  })
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
