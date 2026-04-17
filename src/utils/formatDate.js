export function formatDate(dateValue) {
  if (!dateValue) return '';
  const d = new Date(dateValue);
  return d.toLocaleString([], {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}