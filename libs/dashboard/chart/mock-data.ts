export function mockData(): Array<{ x: number; y: number }> {
  let ts2 = 1484418600000;
  const dates = [{ x: ts2, y: 0 }];

  for (let i = 0; i < 30; i++) {
    ts2 = ts2 + 60 * 3600;
    dates.push({ x: ts2, y: Math.floor(Math.random() * 90) + 10 });
  }

  return dates;
}
