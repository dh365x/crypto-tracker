import axios from "axios";

const baseURL = `https://api.coinstats.app/public/v1`;

export function getCoins() {
	return axios
		.get(`${baseURL}/coins`, {
			params: {
				skip: 0,
				limit: 30,
			},
		})
		.then((response) => response.data)
		.catch((error) => {
			console.error(`getCoins 요청 중 에러 발생:`, error);
			throw error;
		});
}

export function getCoin(coinId: string) {
	return axios
		.get(`${baseURL}/coins/${coinId}`, {
			params: { currency: "AMD" },
		})
		.then((response) => response.data)
		.catch((error) => {
			console.error(`getCoin(${coinId}) 요청 중 에러 발생:`, error);
			throw error;
		});
}

export function getCharts(coinId: string) {
	return axios
		.get(`${baseURL}/charts`, {
			params: {
				period: "1w",
				coinId: coinId,
			},
		})
		.then((response) => response.data)
		.catch((error) => {
			console.error(`getCharts(${coinId}) 요청 중 에러 발생:`, error);
			throw error;
		});
}

export function getNews() {
	return axios
		.get(`${baseURL}/news`, {
			params: {
				skip: 0,
				limit: 15,
			},
		})
		.then((response) => response.data)
		.catch((error) => {
			console.error(`getNews() 요청 중 에러 발생:`, error);
			throw error;
		});
}
