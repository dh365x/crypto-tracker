import { useEffect } from "react";

function News() {
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`https://api.coinstats.app/public/v1/news?skip=0&limit=20`
				);
				const json = await response.json();
				console.log(json);
			} catch (error) {
				console.log("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);

	return <div>News</div>;
}

export default News;
