export function formatPEN(amount: number) {
  return `S/ ${amount.toLocaleString("es-PE")}`;
}

export function formatCurrencyPEN(amount: number) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(amount);
}
