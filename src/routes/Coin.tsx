import { useLocation, useParams } from "react-router-dom";
import { Mobile, PC } from "../styles/MediaQuery";
import styled from "styled-components";
import { formatCurrency } from "../utils";
import { ICoin, RouteParams, RouteState } from "../types";
import Chart from "./Chart";
import { UpDownArrow } from "../assets/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCoin } from "../api";
import Loading from "../Loading";

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
	display: flex;
	flex-direction: column;
	padding: 0 30px;
	height: 100%;
	border: 1px solid #f2f2f2;
	border-radius: 24px;
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
	}
	p:first-child {
		color: #8c8c8c;
		font-size: 16px;
		font-weight: 400;
	}
	p {
		margin-top: 8px;
		color: "#333333";
		font-size: 20px;
		line-height: 20px;
	}
	hr {
		border-top: 1px solid #f2f2f2;
	}
`;

function Coin() {
	const { coinId } = useParams<RouteParams>();
	const { state } = useLocation<RouteState>();

	const { data, isLoading } = useQuery<ICoin>([`coin`, `coin_${coinId}`], () =>
		getCoin(coinId)
	);

	const marketCap: string = formatCurrency(
		state.price * Number(data?.coin.availableSupply)
	);
	const availbleSupply: string | undefined =
		data?.coin.availableSupply.toLocaleString();

	const totalSupply: string | undefined =
		data?.coin.totalSupply.toLocaleString();

	const FullyDilutedValue: string = formatCurrency(
		state.price * Number(data?.coin.totalSupply)
	);
	const volume = formatCurrency(Number(data?.coin.volume));

	return (
		<>
			{isLoading ? (
				<Loading />
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
											<p>Market Cap</p>
											<p>{marketCap}</p>
										</div>
										<hr />
										<div>
											<p>Fully Diluted Valuation</p>
											<p>{FullyDilutedValue}</p>
										</div>
										<hr />
										<div>
											<p>Circulating Supply</p>
											<p>{availbleSupply}</p>
										</div>
										<hr />
										<div>
											<p>Total Supply</p>
											<p>{totalSupply}</p>
										</div>
										<hr />
										<div>
											<p>Volume</p>
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
