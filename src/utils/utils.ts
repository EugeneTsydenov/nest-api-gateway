import { Timestamp } from '../user/types/types';

export function formatDate(timestamp: Timestamp) {
  const date = new Date(timestamp.seconds.low * 1000);

  return (
    date.getFullYear().toString().slice(-2) +
    '/' +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '/' +
    ('0' + date.getDate()).slice(-2)
  );
}
