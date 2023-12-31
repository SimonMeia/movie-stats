export function getShortMonth(monthNumber: number): string | null {
  const monthsShort = [
    'jan',
    'feb',
    'mar',
    'apr',
    'mai',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec'
  ]

  if (monthNumber >= 0 && monthNumber <= 12) {
    return monthsShort[monthNumber]
  } else {
    return null
  }
}
