import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function formatDate(date: string | number) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

function getOrdinalSuffix(day: number) {
  if (day >= 11 && day <= 13) {
    return 'th';
  }

  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

function formatDateWithDay(date: string | number) {
  const parsedDate = new Date(date);
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(parsedDate);
  const day = parsedDate.getDate();

  return `${month} ${day}${getOrdinalSuffix(day)} ${parsedDate.getFullYear()}`;
}

function shuffleArray<T>(array: T[]) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
  }

  return shuffled;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export { clamp, cn, formatDate, formatDateWithDay, shuffleArray };
