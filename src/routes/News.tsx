import styled from "styled-components";
import { INews } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getNews } from "../api";

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

function News() {
	const { data, isLoading } = useQuery<INews>([`news`], getNews);

	return (
		<Wrapper>
			{isLoading ? (
				<span>Loading...</span>
			) : (
				<Header>
					<Title>News</Title>
					<Row>
						{data?.news.map((news) => (
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
