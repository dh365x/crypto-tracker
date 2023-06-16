import { useEffect, useState } from "react";
import styled from "styled-components";
import { UpDownArrow } from "../assets/Svgs";
import ReactApexChart from "react-apexcharts";

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

const Price = styled.h1`
	font-size: 24px;
	font-weight: 500;
`;

const Changed1d = styled.span<{ isUp: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 10px;
	width: 60px;
	height: 30px;
	border-radius: 5px;
	background-color: ${(props) =>
		props.isUp ? "rgba(52, 179, 73, 0.1)" : "rgba(255, 53, 53, 0.1)"};
	color: ${(props) => (props.isUp ? "#34b349" : "#f02934")};
	font-size: 14px;
	font-weight: 500;
	svg {
		width: 10px;
		margin-right: 5px;
		transform: rotate(${(props) => (props.isUp ? "null" : "180deg")});
		fill: ${(props) => (props.isUp ? "#34b349" : "#f02934")};
	}
`;

const Container = styled.div`
	width: 800px;
	padding: 30px;
	margin-bottom: 30px;
	border: 1px solid #f2f2f2;
	border-radius: 24px;
	box-shadow: rgba(0, 0, 0, 0.02) 0px 8px 12px;
`;

interface IProps {
	coinId: string;
	price: number;
	priceChange1d: number;
}

interface IHistorical {
	chart: number[];
}

function Chart({ coinId, price, priceChange1d }: IProps) {
	const [chartData, setChartData] = useState<IHistorical>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async (coinId: string) => {
			try {
				const response = await fetch(
					`https://api.coinstats.app/public/v1/charts?period=1w&coinId=${coinId}`
				);
				const json = await response.json();
				setChartData(json);
			} catch (error) {
				console.log("Error fetching data:", error);
			}
			setLoading(false);
		};
		fetchData(coinId);
	}, [coinId]);

	const coinPrice: string = price.toLocaleString();
	const isUp: boolean = priceChange1d > 0 ? true : false;

	const yaxisLabel = (value: number) => {
		return `$${value.toLocaleString()}`;
	};
	const xaxisLabel = (timestamp: string) => {
		const date = new Date(parseInt(timestamp) * 1000);
		const formettedDate = date.toLocaleDateString("en-US");
		return `${formettedDate}`;
	};

	console.log("chartData", chartData);

	return (
		<Wrapper>
			{loading ? (
				<span>Loading...</span>
			) : (
				<>
					<Header>
						<div className="Col">
							<Price>${coinPrice}</Price>
							<Changed1d isUp={isUp}>
								<UpDownArrow />
								{priceChange1d}
							</Changed1d>
						</div>
					</Header>
					<Container>
						<div>
							<ReactApexChart
								type="line"
								series={[
									{
										name: "Price",
										data: chartData?.chart.map((price) => price) ?? [],
									},
								]}
								options={{
									chart: {
										toolbar: {
											show: false,
										},
										background: "transparent",
									},
									grid: { show: false },
									stroke: {
										curve: "straight",
										width: 4,
									},
									xaxis: {
										type: "datetime",
										labels: {
											show: true,
											formatter: xaxisLabel,
											style: {
												colors: "#8c8c8c",
											},
										},
										tickAmount: 8,
									},
									yaxis: {
										labels: {
											show: true,
											formatter: yaxisLabel,
											style: {
												fontSize: "16px",
												colors: "#333333",
											},
										},
									},
								}}
							/>
						</div>
					</Container>
				</>
			)}
		</Wrapper>
	);
}

export default Chart;
