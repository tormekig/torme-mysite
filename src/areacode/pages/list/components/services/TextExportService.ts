import { RememberWord, CSVExportResult } from '../types/dojinshiTypes'

export class TextExportService {
  static createEmptyExports(): CSVExportResult {
    return {
      noMA: '4桁;覚え方\n',
      oneMA: '4桁;覚え方;MA1;MA1地域詳細\n',
      twoMA: '4桁;覚え方;MA1;MA1地域詳細;MA2;MA2地域詳細\n',
      multiMA:
        '4桁;覚え方;MA1;MA1地域詳細;MA2;MA2地域詳細;MA3;MA3地域詳細;MA4;MA4地域詳細;MA5;MA5地域詳細\n',
      allMA: '4桁;覚え方;MA;MA複数/単一;市町村;\n',
    }
  }

  static searchRememberWordData(data: RememberWord[], query: string): RememberWord[] {
    return data.filter((row) => row.areacode === query)
  }

  static addToExports(
    exports: CSVExportResult,
    key: keyof CSVExportResult,
    text: string,
  ): void {
    exports[key] += text + '\n'
  }

  static determineExportKey(
    maCount: number,
  ): 'noMA' | 'oneMA' | 'twoMA' | 'multiMA' {
    if (maCount === 0) return 'noMA'
    if (maCount === 1) return 'oneMA'
    if (maCount === 2) return 'twoMA'
    return 'multiMA'
  }
}
