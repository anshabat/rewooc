export const getFormattedDate = (iso: string): string => {
  const date = new Date(iso)
  return date.toLocaleString('ru', {
    year: '2-digit',
    month: 'long',
    day: 'numeric',
  })
}
