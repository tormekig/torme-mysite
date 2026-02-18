import {
  MACompListContent,
  type SearchType,
} from 'areacode/pages/list/MACompListContent'

export function toMAKey(areaCode: string, MAName: string): string {
  return `${areaCode}|${MAName}`
}

export function getMAKeysFromFilter(type: SearchType, query: string): string[] {
  const MAComps = new MACompListContent().filter(type, query).MAComps
  return [
    ...new Set(
      MAComps.map((maComp) => toMAKey(maComp.areaCode, maComp.MAName)),
    ),
  ]
}
