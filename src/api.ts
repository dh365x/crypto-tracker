export function getCoins() {
	return fetch(
		`https://api.coinstats.app/public/v1/coins?skip=0&limit=30`
	).then((response) => response.json());
}

export function getCoin(coinId: string) {
	return fetch(
		`https://api.coinstats.app/public/v1/coins/${coinId}?currency=AMD`
	).then((response) => response.json());
}

export function getCharts(coinId: string) {
	return fetch(
		`https://api.coinstats.app/public/v1/charts?period=1w&coinId=${coinId}`
	).then((response) => response.json());
}

export function getNews() {
	return fetch(`https://api.coinstats.app/public/v1/news?skip=0&limit=15`).then(
		(response) => response.json()
	);
}
