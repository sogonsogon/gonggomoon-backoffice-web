export function formatDate(dateStr?: string): string {
  if (!dateStr) return '-';
  return dateStr.split('T')[0].replace(/-/g, '.');
}
