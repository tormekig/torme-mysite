export interface ColorStyle {
  background: {
    backgroundColor: string
    color: string
  }
  text: {
    color: string
  }
}

export function extractSecondAndThirdDigits(areaCode: string): number {
  return areaCode.length === 2
    ? Number(areaCode.charAt(1)) * 10
    : Number(areaCode.charAt(1)) * 10 + Number(areaCode.charAt(2))
}

function getColorStyle(areacodeSecondAndThirdDigits: number): ColorStyle {
  const startHue = (360 / 88) * 60,
    inc = -1
  const hue = (startHue / 88) * inc * areacodeSecondAndThirdDigits + startHue
  const color = `hsl(${hue}, 48%, 55%)`

  return {
    background: {
      backgroundColor: color,
      color: '#fff',
    },
    text: {
      color: color,
    },
  }
}

export function getColorStyleByAreaCode(areaCode: string): ColorStyle {
  const areacodeSecondAndThirdDigits = extractSecondAndThirdDigits(areaCode)
  return getColorStyle(areacodeSecondAndThirdDigits)
}

export function getColorStyleForQuiz(): ColorStyle {
  return {
    background: {
      backgroundColor: '#666',
      color: '#fff',
    },
    text: {
      color: '#666',
    },
  }
}
