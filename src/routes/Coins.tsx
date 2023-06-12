import styled from "styled-components";
import { Mobile, PC } from "../styles/MediaQuery";
import CoinsMoblie from "./CoinsMoblie";
import { useEffect, useState } from "react";

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
	justify-content: center;
	width: 100%;
	height: 120px;
	padding-bottom: 20px;
	div {
		width: 30%;
		margin: 0 10px;
		border-radius: 10px;
		background-color: lightgray;
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
					`https://api.coinstats.app/public/v1/coins?skip=0&limit=10`
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
									The global crypto market cap is ₩1408.3T a 0.54 % increase
									over the last day.
								</p>
							</Desc>
						</Container>
						<Container>
							<StatsList>
								<div></div>
								<div></div>
								<div></div>
							</StatsList>
						</Container>
						<Container>
							<Table>
								<thead>
									<tr>
										<th className="leftAlign">#</th>
										<th className="leftAlign">Name</th>
										<th className="rightAlign">Change (24h)</th>
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
											<td id="percentChange24h" className="rightAlign">
												<span className="fontStyle">{coin.priceChange1d}</span>
											</td>
											<td id="price" className="rightAlign">
												<span className="fontStyle">₩{coin.price}</span>
											</td>
											<td id="bitcoinPrice">{coin.priceBtc}</td>
											<td id="marketCap">₩{coin.marketCap}</td>
											<td id="volume24h">₩{coin.volume}</td>
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
