import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 50px;
	width: 100%;
`;

const Header = styled.header`
	left: 0;
	right: 0;
	margin: 0 auto;
	margin-top: 50px;
	width: 100%;
	max-width: 1200px;
`;

const Title = styled.h2`
	margin-bottom: 30px;
	font-size: 32px;
	font-weight: 500;
`;

const Row = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 10px;
	width: 100%;
`;

const Box = styled.div<{ bg: string }>`
	position: relative;
	height: 190px;
	border-radius: 10px;
	background-image: url(${(props) => props.bg});
	background-size: cover;
	background-position: center center;
	border: 1px solid #f7f7f7;
	div {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		bottom: 0;
		width: 100%;
		height: 25%;
		padding: 10px 0;
		border-radius: 0 0 5px 5px;
		background-color: rgb(242, 242, 242);
		color: #666666;
		font-size: 14px;
		text-align: center;
	}
`;

interface INews {
	news: [
		{
			id: string;
			feedDate: number;
			source: string;
			title: string;
			isFeatured: boolean;
			description: string;
			imgURL: string;
			link: string;
			sourceLink: string;
			shareURL: string;
			relatedCoins: string[];
		}
	];
}

function News() {
	const [newsData, setNewsData] = useState<INews>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`https://api.coinstats.app/public/v1/news?skip=0&limit=15`
				);
				const json = await response.json();
				setNewsData(json);
			} catch (error) {
				console.log("Error fetching data:", error);
			}
			setLoading(false);
		};
		fetchData();
	}, []);

	return (
		<Wrapper>
			{loading ? (
				<span>Loading...</span>
			) : (
				<Header>
					<Title>News</Title>
					<Row>
						{newsData?.news.map((news) => (
							<a href={news.link} key={news.id}>
								<Box bg={news.imgURL}>
									<div>{news.title}</div>
								</Box>
							</a>
						))}
					</Row>
				</Header>
			)}
		</Wrapper>
	);
}

export default News;
