export function toNumber(value: any): number {
  if (value === null || value === undefined) return 0
  return Number(value)
}