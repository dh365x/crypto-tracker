import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route path="/:coinId">
					<Coin />
				</Route>
				<Route path="/">
					<Coins />
				</Route>
			</Switch>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
