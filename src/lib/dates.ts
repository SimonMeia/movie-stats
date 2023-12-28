export function getShortMonth(monthNumber: number): string | null {
  const monthsShort = [
    'jan',
    'fev',
    'mar',
    'avr',
    'mai',
    'jun',
    'jui',
    'aou',
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
