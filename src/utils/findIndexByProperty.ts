export function findIndexByProperty<T, K extends keyof T>(
  items: T[],
  property: K,
  value: T[K]
): number {
  return items.findIndex((item) => item[property] === value)
}
