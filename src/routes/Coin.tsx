import { useLocation, useParams } from "react-router-dom";
import { Mobile, PC } from "../styles/MediaQuery";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { ICoin, formatCurrency } from "./Coins";
import Chart from "./Chart";

const Wrapper = styled.div`
	margin: 0 auto;
	width: 100%;
	max-width: 1200px;
	padding-top: 40px;
`;

const Header = styled.header`
	display: flex;
	flex-direction: column;
	.Col {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
	}
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

const Title = styled.h1`
	font-size: 24px;
	font-weight: 500;
`;

const Symbol = styled.span`
	margin-left: 5px;
	font-size: 18px;
	color: #8c8c8c;
`;

const Container = styled.div`
	display: flex;
	gap: 30px;
	padding: 30px;
	margin-bottom: 30px;
	border: 1px solid #f2f2f2;
	border-radius: 24px;
	box-shadow: rgba(0, 0, 0, 0.02) 0px 8px 12px;
`;

const MarketBox = styled.div`
	width: 100%;
	span {
		font-size: 16px;
		color: #8c8c8c;
	}
	p {
		margin-top: 10px;
		color: 333333;
		font-size: 20px;
		font-weight: 500;
		line-height: 28px;
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
					`https://api.coinstats.app/public/v1/coins/bitcoin?currency=AMD`
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
			<PC>
				<Wrapper>
					<Header>
						<div className="Col">
							<Rank>RANK #{state.rank}</Rank>
						</div>
						<div className="Col">
							<Icon src={state?.icon} alt="" />
							<Title>{state?.name}</Title>
							<Symbol>• {state?.symbol}</Symbol>
						</div>
					</Header>
					<Container>
						{loading ? (
							<span>Loading...</span>
						) : (
							<>
								<MarketBox>
									<span>Market Cap</span>
									<p>${marketCap}</p>
								</MarketBox>
								<MarketBox>
									<span>Fully Diluted Valuation</span>
									<p>${FDValue}</p>
								</MarketBox>
								<MarketBox>
									<span>Circulating Supply</span>
									<p>{coin?.availableSupply}</p>
								</MarketBox>
								<MarketBox>
									<span>Total Supply</span>
									<p>{coin?.totalSupply}</p>
								</MarketBox>
								<MarketBox>
									<span>Volume</span>
									<p>{volume}</p>
								</MarketBox>
							</>
						)}
					</Container>
					<Chart
						coinId={coin?.id + ""}
						price={Number(coin?.price)}
						priceChange1d={Number(coin?.priceChange1d)}
					/>
				</Wrapper>
			</PC>
			<Mobile></Mobile>
		</>
	);
}

export default Coin;
