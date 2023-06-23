export function formatCurrency(value: number) {
	const billion: number = 1000000000;
	const million: number = 1000000;

	if (value >= billion) {
		const billionValue: number = value / billion;
		return `$${billionValue.toFixed(1)}B`;
	} else if (value >= million) {
		const millionValue: number = value / million;
		return `$${millionValue.toFixed(1)}M`;
	} else {
		return value.toLocaleString();
	}
}
