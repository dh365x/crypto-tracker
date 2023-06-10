import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coins from "./components/Coins";
import Coin from "./components/Coin";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/:coinId">
					<Coin />
				</Route>
				<Route path="/">
					<Coins />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
