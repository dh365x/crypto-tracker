import styled from "styled-components";
import { Mobile, PC } from "../styles/MediaQuery";

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
	span {
		width: 30%;
		margin: 0 10px;
		border-radius: 10px;
		background-color: lightgray;
	}
`;

const Table = styled.table`
	width: 100%;
	border: 1px solid #e5e5e5;
	border-radius: 10px;
	border-spacing: 10px;
	border-collapse: separate;
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
	.leftAlign {
		text-align: left;
	}
	.rightAlign {
		text-align: right;
	}
	.boldFont {
		font-weight: 500;
	}
	#rank {
		width: 60px;
	}
	#name {
		font-size: 18px;
		font-weight: 500;
		span:nth-child(2) {
			font-weight: 400;
			color: #8c8c8c;
		}
	}
`;

function Coins() {
	const coins = [
		{
			id: "bitcoin",
			icon: "https://api.coin-stats.com/api/files/812fde17aea65fbb9f1fd8a478547bde/f3738cc5df5f59afb57111d67d951170_1.png",
			name: "Bitcoin",
			symbol: "BTC",
			rank: 1,
			price: 6362.74960614,
			priceBtc: 1,
			volume: 4514555849.85,
			marketCap: 110545616313,
			availableSupply: 17373875,
			totalSupply: 17373875,
			priceChange1h: 0.12,
			priceChange1d: -0.56,
			priceChange1w: -1.07,
		},
		{
			id: "ethereum",
			icon: "https://api.coin-stats.com/api/files/812fde17aea65fbb9f1fd8a478547bde/e1259737fa19af705f0207d5b384c37e_1027.png",
			name: "Ethereum",
			symbol: "ETH",
			rank: 2,
			price: 208.130215868,
			priceBtc: 0.03282527,
			volume: 1522373585.13,
			marketCap: 21473551841,
			availableSupply: 103173639,
			totalSupply: 103173639,
			priceChange1h: 0.04,
			priceChange1d: -1.44,
			priceChange1w: -1.89,
		},
	];

	return (
		<>
			<PC>
				<Wrapper>
					<Container>
						<Title>Best Coin Price Tracker on the Market</Title>
						<Desc>
							<p>
								With CoinStats, you can manage all your crypto assets from one
								interface.
							</p>
							<p>
								The global crypto market cap is ₩1408.3T a 0.54 % increase over
								the last day.
							</p>
						</Desc>
					</Container>
					<Container>
						<StatsList>
							<span></span>
							<span></span>
							<span></span>
						</StatsList>
					</Container>
					<Container>
						<Table>
							<thead>
								<tr>
									<th>#</th>
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
											<span>{coin.name}</span>
											<span> • {coin.symbol}</span>
										</td>
										<td id="percentChange24h" className="rightAlign">
											<span className="boldFont">{coin.priceChange1d}</span>
										</td>
										<td id="price" className="rightAlign">
											<span className="boldFont">₩{coin.price}</span>
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
			</PC>
			<Mobile></Mobile>
		</>
	);
}

export default Coins;
