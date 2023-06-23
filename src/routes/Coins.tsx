import styled from "styled-components";
import { Mobile, PC } from "../styles/MediaQuery";
import CoinsMoblie from "./CoinsMoblie";
import { UpDownArrow } from "../assets/navigation";
import { Link } from "react-router-dom";
import { ICoins } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getCoins } from "../api";

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

export const formatCurrency = (value: number) => {
	const billion: number = 1000000000;
	if (value >= billion) {
		const bValue: number = value / billion;
		return `${bValue.toFixed(1)}B`;
	}
	return value.toLocaleString();
};

function Coins() {
	const { data, isLoading } = useQuery<ICoins>(["coins"], getCoins);

	const makeMarketCap = () => {
		const values: number[] | undefined = data?.coins.map(
			(coin) => coin.marketCap
		);
		const sum: number | undefined = values?.reduce(
			(acc, curr) => acc + curr,
			0
		);
		return sum?.toLocaleString();
	};

	const makeVolume24h = () => {
		const values: number[] | undefined = data?.coins.map((coin) => coin.volume);
		const sum: number | undefined = values?.reduce(
			(acc, curr) => acc + curr,
			0
		);
		return sum?.toLocaleString();
	};

	const makeBtcDominance = () => {
		const allValue: number | undefined = data?.coins
			.map((coin) => coin.marketCap)
			.reduce((acc, curr) => acc + curr, 0);
		const btcValue: number | undefined = data?.coins.find(
			(coin) => coin.id === "bitcoin"
		)?.marketCap;

		if (btcValue !== undefined && allValue !== undefined) {
			const dominance: number = (btcValue / allValue) * 100;
			return dominance.toFixed(1);
		}
	};

	const totalMarketCap: string | undefined = makeMarketCap();
	const totalVolume24h: string | undefined = makeVolume24h();
	const btcDominance: string | undefined = makeBtcDominance();

	return (
		<>
			<PC>
				{isLoading ? (
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
									<span>${totalMarketCap}</span>
								</div>
								<div>
									<p>Volume 24h</p>
									<span>${totalVolume24h}</span>
								</div>
								<div>
									<p>BTC Dominance</p>
									<span>{btcDominance}%</span>
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
									{data?.coins.map((coin) => (
										<tr key={coin.id}>
											<td id="rank">{coin.rank}</td>
											<td id="name" className="leftAlign">
												<Link
													to={{
														pathname: `/${coin.id}`,
														state: {
															name: coin.name,
															rank: coin.rank,
															icon: coin.icon,
															symbol: coin.symbol,
															price: coin.price,
															priceChange1d: coin.priceChange1d,
														},
													}}
												>
													<div className="vAlign">
														<img src={`${coin.icon}`} alt="" />
														<span>{coin.name}</span>
														<span> • {coin.symbol}</span>
													</div>
												</Link>
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
