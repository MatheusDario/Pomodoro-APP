export function SecondsTimer(seconds: number): string {
  const zeroLetf = (n: number) => Math.floor(n).toString().padStart(2, '0');
  const min = zeroLetf((seconds / 60) % 60);
  const sec = zeroLetf((seconds % 60) % 60);
  return `${min}:${sec}`;
}
