export interface CalculationResult {
  tipAmount: number;
  total: number;
  perPerson: number;
  people: number;
  tipPercent: number;
}

export function calculate(
  bill: number,
  tipPercent: number,
  people: number
): CalculationResult {
  const tipAmount = bill * (tipPercent / 100);
  const total = bill + tipAmount;
  // Round up to nearest cent: group never underpays by even a penny
  const perPerson = Math.ceil((total / people) * 100) / 100;
  return { tipAmount, total, perPerson, people, tipPercent };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
