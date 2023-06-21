import { useLocation, useParams } from "react-router-dom";
import { Mobile, PC } from "../styles/MediaQuery";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { ICoin, formatCurrency } from "./Coins";
import Chart from "./Chart";
import { UpDownArrow } from "../assets/Svgs";

const Wrapper = styled.div`
	margin: 0 auto;
	max-width: 1200px;
	padding-top: 40px;
`;

const Header = styled.header`
	display: flex;
	flex-direction: column;
`;

const Col = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`;

const Rank = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 60px;
	height: 20px;
	border-radius: 5px;
	background-color: #ff9332;
	color: white;
	font-size: 11px;
	font-weight: 500;
`;

const Icon = styled.img`
	width: 40px;
	height: 40px;
	margin-right: 10px;
`;

const Title = styled.span`
	font-size: 24px;
	font-weight: 400;
`;

const Symbol = styled.span`
	margin-left: 5px;
	font-size: 18px;
	color: #8c8c8c;
`;

const Price = styled.span`
	margin-right: 10px;
	font-size: 32px;
	font-weight: 500;
`;

const Change24h = styled.div<{ fluctuation: number }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 70px;
	height: 35px;
	border-radius: 10px;
	background-color: ${(props) =>
		props.fluctuation > 0
			? "rgba(52, 199, 89, 0.1)"
			: "rgba(255, 53, 53, 0.1)"};
	color: ${(props) => (props.fluctuation > 0 ? "#34b349" : "#f02934")};
	font-weight: 500;
	svg {
		width: 10px;
		margin-right: 5px;
		transform: rotate(
			${(props) => (props.fluctuation > 0 ? "null" : "180deg")}
		);
		fill: ${(props) => (props.fluctuation > 0 ? "#34b349" : "#f02934")};
	}
`;

const Container = styled.div`
	display: flex;
	gap: 30px;
	margin-top: 30px;
`;

const Box = styled.div<{ widthh: number }>`
	display: flex;
	flex-direction: column;
	gap: 20px;
	width: ${(props) => `${props.widthh}px`};
	span:first-child {
		margin-left: 10px;
	}
`;

const MarketStats = styled.div`
	padding: 30px;
	border: 1px solid #f2f2f2;
	border-radius: 24px;
	div {
		span {
			font-size: 16px;
			color: #8c8c8c;
		}
		p {
			margin-top: 10px;
			color: "#333333";
			font-size: 20px;
			font-weight: 500;
			line-height: 28px;
		}
	}
	hr {
		margin: 30px 0;
		border-top: 1px solid #f2f2f2;
	}
`;

interface RouteParams {
	coinId: string;
}
interface RouteState {
	name: string;
	rank: number;
	icon: string;
	symbol: string;
	price: number;
	priceChange1d: number;
}

function Coin() {
	const [coin, setCoin] = useState<ICoin>();
	const [loading, setLoading] = useState(true);

	const { coinId } = useParams<RouteParams>();
	const { state } = useLocation<RouteState>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`https://api.coinstats.app/public/v1/coins/${coinId}?currency=AMD`
				);
				const json = await response.json();
				setCoin(json.coin);
			} catch (error) {
				console.log("Error fetching data:", error);
			}
			setLoading(false);
		};
		fetchData();
	}, [coinId]);

	const marketCap = formatCurrency(state.price * Number(coin?.availableSupply));
	const FDValue = formatCurrency(state.price * Number(coin?.totalSupply));
	const volume = formatCurrency(Number(coin?.volume));

	return (
		<>
			{loading ? (
				<span>Loading...</span>
			) : (
				<>
					<PC>
						<Wrapper>
							<Header>
								<Col>
									<Rank>RANK #{state.rank}</Rank>
								</Col>
								<Col>
									<Icon src={state?.icon} alt="" />
									<Title>{state?.name} Price</Title>
									<Symbol>• {state?.symbol}</Symbol>
								</Col>
								<Col>
									<Price>${state.price.toLocaleString()}</Price>
									<Change24h fluctuation={state.priceChange1d}>
										<UpDownArrow />
										{state.priceChange1d}
									</Change24h>
								</Col>
							</Header>
							<Container>
								<Box widthh={900}>
									<Title>
										{state.name} Price Chart ({state.symbol})
									</Title>
									<Chart coinId={coinId} />
								</Box>
								<Box widthh={300}>
									<Title>Market Stats</Title>
									<MarketStats>
										<div>
											<span>Market Cap</span>
											<p>${marketCap}</p>
										</div>
										<hr />
										<div>
											<span>Fully Diluted Valuation</span>
											<p>${FDValue}</p>
										</div>
										<hr />
										<div>
											<span>Circulating Supply</span>
											<p>{coin?.availableSupply}</p>
										</div>
										<hr />
										<div>
											<span>Total Supply</span>
											<p>{coin?.totalSupply}</p>
										</div>
										<hr />
										<div>
											<span>Volume</span>
											<p>{volume}</p>
										</div>
									</MarketStats>
								</Box>
							</Container>
						</Wrapper>
					</PC>
					<Mobile></Mobile>
				</>
			)}
		</>
	);
}

export default Coin;
