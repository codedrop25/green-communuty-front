const ONE_MINUTE = 60 * 1000;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;

export function formatRelativeTime(value: string, now = new Date()) {
  const date = new Date(value);
  const diff = Math.max(0, now.getTime() - date.getTime());

  if (diff < ONE_MINUTE) return "방금";
  if (diff < ONE_HOUR) return `${Math.floor(diff / ONE_MINUTE)}분 전`;
  if (diff < ONE_DAY) return `${Math.floor(diff / ONE_HOUR)}시간 전`;
  if (diff < ONE_DAY * 2) return "어제";

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return date.getFullYear() === now.getFullYear()
    ? `${month}.${day}`
    : `${date.getFullYear()}.${month}.${day}`;
}

export function formatCount(value: number, compact = false) {
  if (compact && value >= 10_000) {
    return `${(value / 10_000).toFixed(1).replace(".0", "")}만`;
  }

  return value.toLocaleString("ko-KR");
}
