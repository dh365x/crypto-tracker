import { useEffect, useState } from "react";
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";

const ChartBox = styled.div`
	padding: 30px;
	border: 1px solid #f2f2f2;
	border-radius: 24px;
`;

interface IProps {
	coinId: string;
}

interface IHistorical {
	chart: number[];
}

function Chart({ coinId }: IProps) {
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

	const yaxisLabel = (value: number) => {
		return `$${value.toLocaleString()}`;
	};
	const xaxisLabel = (timestamp: string) => {
		const date = new Date(parseInt(timestamp) * 1000);
		const formettedDate = date.toLocaleDateString("en-US");
		return `${formettedDate}`;
	};

	return (
		<>
			{loading ? (
				<span>Loading...</span>
			) : (
				<ChartBox>
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
				</ChartBox>
			)}
		</>
	);
}

export default Chart;
