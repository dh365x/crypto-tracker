// Coins
export interface ICoins {
	coins: [
		{
			id: string;
			icon: string;
			name: string;
			symbol: string;
			rank: number;
			price: number;
			priceBtc: number;
			volume: number;
			marketCap: number;
			availableSupply: number;
			totalSupply: number;
			priceChange1h: number;
			priceChange1d: number;
			priceChange1w: number;
		}
	];
}

// Coin
export interface ICoin {
	coin: {
		id: string;
		icon: string;
		name: string;
		symbol: string;
		rank: number;
		price: number;
		priceBtc: number;
		volume: number;
		marketCap: number;
		availableSupply: number;
		totalSupply: number;
		priceChange1h: number;
		priceChange1d: number;
		priceChange1w: number;
	};
}
export interface RouteParams {
	coinId: string;
}
export interface RouteState {
	name: string;
	rank: number;
	icon: string;
	symbol: string;
	price: number;
	priceChange1d: number;
}

// Chart
export interface ICharts {
	chart: number[];
}

// News
export interface INews {
	news: [
		{
			id: string;
			feedDate: number;
			source: string;
			title: string;
			isFeatured: boolean;
			description: string;
			imgURL: string;
			link: string;
			sourceLink: string;
			shareURL: string;
			relatedCoins: string[];
		}
	];
}
