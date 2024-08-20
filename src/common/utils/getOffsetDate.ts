import ms from 'ms';

export default function getOffsetDate(offset: string) {
  return new Date(Date.now() + ms(offset));
}
