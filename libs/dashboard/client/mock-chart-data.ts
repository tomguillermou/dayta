export function mockChartData(): Array<{ x: number; y: number }> {
  let ts2 = 1484418600000;
  let dates = [{ x: ts2, y: 0 }];

  for (let i = 0; i < 30; i++) {
    ts2 = ts2 + 60 * 3600;
    dates = [...dates, { x: ts2, y: Math.floor(Math.random() * 90) + 10 }];
  }

  return [...dates];
}
