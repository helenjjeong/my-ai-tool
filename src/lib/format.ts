export function formatKRW(won: number): string {
  if (won <= 0) return '0원'

  const eok = Math.floor(won / 100_000_000)
  const remainder = won % 100_000_000
  const man = Math.floor(remainder / 10_000)

  const parts: string[] = []
  if (eok > 0) parts.push(`${eok}억`)
  if (man > 0) parts.push(`${man.toLocaleString('ko-KR')}만`)
  if (parts.length === 0) parts.push(won.toLocaleString('ko-KR'))

  return parts.join(' ') + '원'
}
