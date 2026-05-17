export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function certPath(filename: string): string {
  return `/certificates/${encodeURIComponent(filename)}`;
}
