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
