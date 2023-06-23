import styled from "styled-components";
import ReactApexChart from "react-apexcharts";
import { ICharts, RouteParams } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getCharts } from "../api";

const ChartBox = styled.div`
	padding: 30px;
	border: 1px solid #f2f2f2;
	border-radius: 24px;
`;

function Chart({ coinId }: RouteParams) {
	const { data, isLoading } = useQuery<ICharts>(
		[`chart`, `chart_${coinId}`],
		() => getCharts(coinId)
	);

	const yaxisLabel = (value: number) => {
		return `$${value.toLocaleString()}`;
	};
	const xaxisLabel = (timestamp: string) => {
		const date: Date = new Date(parseInt(timestamp) * 1000);
		const formettedDate: string = date.toLocaleDateString("en-US");
		return `${formettedDate}`;
	};

	return (
		<>
			{isLoading ? (
				<span>Loading...</span>
			) : (
				<ChartBox>
					<ReactApexChart
						type="line"
						series={[
							{
								name: "Price",
								data: data?.chart.map((price) => price) ?? [],
							},
						]}
						options={{
							chart: {
								toolbar: {
									show: false,
								},
								background: "transparent",
							},
							colors: ["#ff9223"],
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
