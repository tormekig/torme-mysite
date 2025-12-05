import React from 'react'
import { Link } from 'react-router-dom'
import { getColorStyleByAreaCode } from './color'
import areacode from 'areacode/assets/css/areacode.module.scss'

const twoDigitNumbers = ['01', '02', '03', '04', '05', '06', '07', '08', '09']

export function Code2digit() {
  return (
    <div className={areacode.codeListContainer}>
      <table
        style={{ borderCollapse: 'collapse', textAlign: 'center' }}
        className={areacode.codeList}
      >
        <tbody>
          <tr>
            {twoDigitNumbers.map((col, colIndex) => {
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

const threeDigitNumbers = [
  ['011', '012', '013', '014', '015', '016', '017', '018', '019'],
  ['021', '022', '023', '024', '025', '026', '027', '028', '029'],
  ['03'],
  ['041', '042', '043', '044', '045', '046', '047', '048', '049'],
  ['051', '052', '053', '054', '055', '056', '057', '058', '059'],
  ['06'],
  ['071', '072', '073', '074', '075', '076', '077', '078', '079'],
  ['081', '082', '083', '084', '085', '086', '087', '088', '089'],
  ['091', '092', '093', '094', '095', '096', '097', '098', '099'],
]

const disabledThreeDigitNumbers = [
  '021',
  '041',
  '051',
  '061',
  '071',
  '081',
  '091',
]

export function getAvailableThreeDigitNumbers() {
  const nums = threeDigitNumbers.flat()
  return nums.filter((num) => !disabledThreeDigitNumbers.includes(num))
}

export function Code3digit({
  rowsToShow,
  closeFunc,
}: {
  rowsToShow?: number[]
  closeFunc?: () => void
}) {
  rowsToShow = rowsToShow ? rowsToShow : [1, 2, 3, 4, 5, 6, 7, 8, 9]

  function link(num: string, cols: number) {
    return (
      <td
        key={num}
        colSpan={cols}
        style={getColorStyleByAreaCode(num).background}
      >
        <Link to={`/areacode/code/prefix/${num}`}>{num}</Link>
      </td>
    )
  }

  function nolink(num: string) {
    return (
      <td
        key={num}
        style={{
          backgroundColor: '#ccc',
          color: '#fff',
          padding: '0.8rem 0.5rem',
        }}
      >
        {num}
      </td>
    )
  }

  return (
    <div className={areacode.codeListContainer}>
      <table
        style={{ borderCollapse: 'collapse', textAlign: 'center' }}
        className={areacode.codeList}
      >
        <tbody onClick={closeFunc}>
          {threeDigitNumbers.map((row, rowIndex) => {
            if (rowsToShow && !rowsToShow.includes(rowIndex + 1)) return <></>
            const num2digits = '0' + (rowIndex + 1).toString()
            return (
              <tr key={num2digits}>
                {rowIndex + 1 === 3 || rowIndex + 1 === 6
                  ? link(num2digits, 9)
                  : row.map((num, colIndex) => {
                      return disabledThreeDigitNumbers.includes(num)
                        ? nolink(num)
                        : link(num, 1)
                    })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
