export function* range(min: number, max: number) {
  let i = min;

  while (i < max) {
    yield i;
    i++;
  }
}
