import { extractSecondAndThirdDigits } from './color'

describe('extractSecondAndThirdDigits', () => {
  test('2digits', () => {
    const result = extractSecondAndThirdDigits('03')
    expect(result).toBe(30)
  })
  test('3digits', () => {
    const result = extractSecondAndThirdDigits('021')
    expect(result).toBe(21)
  })
  test('4digits', () => {
    const result = extractSecondAndThirdDigits('0134')
    expect(result).toBe(13)
  })
})
