import styled from "styled-components";
import { Mobile, PC } from "../styles/MediaQuery";
import CoinsMoblie from "./CoinsMoblie";
import { useEffect, useState } from "react";
import { UpDownArrow } from "../assets/Svgs";

const Wrapper = styled.div`
	margin-top: 25px;
	padding: 0 230px;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 10px 0;
	color: #4c4c4c;
`;

const Title = styled.h1`
	padding: 10px;
	font-size: 36px;
	font-weight: 700;
`;

const Desc = styled.div`
	padding: 10px;
	text-align: center;
	font-size: 18px;
	font-weight: 300;
	line-height: 1.5;
`;

const StatsList = styled.div`
	display: flex;
	justify-content: space-around;
	margin-top: 10px;
	margin-bottom: 20px;
	width: 90%;
	height: 95px;
	div {
		width: 30%;
		padding: 10px;
		border-radius: 10px;
		background-color: ${(props) => props.theme.gray.lighter};
	}
	p {
		padding: 10px;
		margin-bottom: 5px;
		color: #4c4c4c;
		font-weight: 300;
	}
	span {
		font-size: 22px;
		font-weight: 700;
		padding-left: 10px;
	}
`;

const Loader = styled.span`
	display: block;
	text-align: center;
`;

const Table = styled.table`
	width: 100%;
	border: 1px solid #e5e5e5;
	border-radius: 10px;
	border-spacing: 10px;
	border-collapse: separate;
	padding: 0 10px;
	text-align: center;
	thead {
		display: table-call;
		vertical-align: middle;
		font-size: 14px;
		color: #737373;
		th {
			height: 35px;
		}
	}
	th,
	td {
		display: table-cell;
		vertical-align: middle;
		height: 65px;
	}
	img {
		width: 32px;
	}
	.leftAlign {
		text-align: left;
	}
	.rightAlign {
		text-align: right;
	}
	.vAlign {
		display: flex;
		align-items: center;
	}
	.fontStyle {
		font-weight: 500;
	}
	#rank {
		width: 60px;
	}
	#name {
		font-size: 18px;
		font-weight: 500;
		span {
			margin-left: 10px;
		}
		span:nth-last-child(1) {
			font-weight: 400;
			color: #8c8c8c;
		}
	}
`;

const Change24h = styled.div<{ percent: number }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 70px;
	height: 35px;
	border-radius: 10px;
	background-color: ${(props) =>
		props.percent > 0 ? "rgba(52, 199, 89, 0.1)" : "rgba(255, 53, 53, 0.1)"};
	color: ${(props) => (props.percent > 0 ? "#34b349" : "#f02934")};
	font-weight: 500;
	svg {
		width: 10px;
		margin-right: 5px;
		transform: rotate(${(props) => (props.percent > 0 ? "null" : "180deg")});
		fill: ${(props) => (props.percent > 0 ? "#34b349" : "#f02934")};
	}
`;

interface ICoin {
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

function Coins() {
	const [coins, setCoins] = useState<ICoin[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`https://api.coinstats.app/public/v1/coins?skip=0&limit=30`
				);
				const json = await response.json();
				setCoins(json.coins);
				setLoading(false);
			} catch (error) {
				console.log("Error fetching data:", error);
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const formatCurrency = (value: number) => {
		const billion: number = 1000000000;
		if (value >= billion) {
			const bValue: number = value / billion;
			return `${bValue.toFixed(1)}B`;
		}
		return value.toLocaleString();
	};

	const makeMarketCap = () => {
		const arr: number[] = coins.map((coin) => coin.marketCap);
		const sum: number = arr.reduce((acc, curr) => acc + curr, 0);
		return sum;
	};
	const totalMarketCap = makeMarketCap();

	const makeVolume24h = () => {
		const arr: number[] = coins.map((coin) => coin.volume);
		const sum: number = arr.reduce((acc, curr) => acc + curr, 0);
		return sum;
	};
	const totalVolume24h = makeVolume24h();

	const findBtcMarketCap = () => {
		const pickBtc: ICoin | undefined = coins.find(
			(coin) => coin.id === "bitcoin"
		);
		const percent: number = (Number(pickBtc?.marketCap) / totalMarketCap) * 100;
		return percent;
	};
	const btcDominance = findBtcMarketCap();

	return (
		<>
			<PC>
				{loading ? (
					<Loader>Loading...</Loader>
				) : (
					<Wrapper>
						<Container>
							<Title>Best Coin Price Tracker on the Market</Title>
							<Desc>
								<p>
									With CoinStats, you can manage all your crypto assets from one
									interface.
								</p>
								<p>
									The global crypto market cap is $1.1T a 0.02 % increase over
									the last day.
								</p>
							</Desc>
						</Container>
						<Container>
							<StatsList>
								<div>
									<p>Market Cap</p>
									<span>${totalMarketCap.toLocaleString()}</span>
								</div>
								<div>
									<p>Volume 24h</p>
									<span>${totalVolume24h.toLocaleString()}</span>
								</div>
								<div>
									<p>BTC Dominance</p>
									<span>{btcDominance.toFixed(1)}%</span>
								</div>
							</StatsList>
						</Container>
						<Container>
							<Table>
								<thead>
									<tr>
										<th className="leftAlign">#</th>
										<th className="leftAlign">Name</th>
										<th className="leftAlign">Change (24h)</th>
										<th className="rightAlign">Price</th>
										<th>Price in BTC</th>
										<th>Market Cap</th>
										<th>Volume 24h</th>
									</tr>
								</thead>
								<tbody>
									{coins.map((coin) => (
										<tr key={coin.id}>
											<td id="rank">{coin.rank}</td>
											<td id="name" className="leftAlign">
												<div className="vAlign">
													<img src={`${coin.icon}`} alt="" />
													<span>{coin.name}</span>
													<span> • {coin.symbol}</span>
												</div>
											</td>
											<td id="percentChange24h" className="leftAlign">
												<Change24h percent={coin.priceChange1d}>
													<UpDownArrow />
													{coin.priceChange1d}
												</Change24h>
											</td>
											<td id="price" className="rightAlign">
												<span className="fontStyle">
													${formatCurrency(coin.price)}
												</span>
											</td>
											<td id="bitcoinPrice">{coin.priceBtc.toFixed(7)}</td>
											<td id="marketCap">${formatCurrency(coin.marketCap)}</td>
											<td id="volume24h">${formatCurrency(coin.volume)}</td>
										</tr>
									))}
								</tbody>
							</Table>
						</Container>
					</Wrapper>
				)}
			</PC>
			<Mobile>
				<CoinsMoblie />
			</Mobile>
		</>
	);
}

export default Coins;
