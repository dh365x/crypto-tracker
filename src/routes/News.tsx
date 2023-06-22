import { useEffect, useState } from "react";

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
					`https://api.coinstats.app/public/v1/news?skip=0&limit=20`
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

	console.log(newsData);

	return <div>News</div>;
}

export default News;
