import { Link } from "react-router-dom";
import styled from "styled-components";
import { SearchSvg, SettingSvg, UserSvg } from "../assets/navigation";

const Wrapper = styled.nav`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	z-index: 99;
	height: 40px;
	padding: 12px 24px;
	background-color: white;
	color: #666666;
	box-shadow: 2px 2px 5px 2px ${(props) => props.theme.gray.lighter};
	font-size: 14px;
	svg {
		width: 24px;
		height: 24px;
	}
`;

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	:last-child {
		font-weight: 500;
	}
`;

const Logo = styled.h1`
	margin-right: 20px;
	img {
		width: 130px;
	}
`;

const Item = styled.div`
	display: flex;
	align-items: center;
	margin-left: 30px;
`;

const Search = styled.form`
	position: relative;
	display: flex;
	align-items: center;
	width: 240px;
	height: 36px;
	input {
		position: absolute;
		width: 90%;
		padding-left: 20px;
		background-color: ${(props) => props.theme.gray.lighter};
		border: 1px solid ${(props) => props.theme.gray.normal};
		border-radius: 20px;
	}
	svg {
		position: absolute;
		right: 10px;
	}
`;

function Header() {
	return (
		<Wrapper>
			<Container>
				<Logo>
					<Link to="/">
						<img
							src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTUwIiBoZWlnaHQ9IjMyIj48ZGVmcz48cGF0aCBpZD0iYSIgZD0iTTAgMzEuOTQyaDE1MFYwSDB6Ii8+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZmlsbD0iIzU1NSIgZD0iTTQzLjQ3MiAxNy41OTZjMCAzLjUwNCAxLjYyNSA2LjQ4NyA1LjQ4NCA2LjQ4NyAzLjAyMiAwIDUuMDE1LTEuOTA0IDUuMDI4LTQuMjkxaDEuMDE1di4wMzhjMCAyLjgwNi0yLjM3NCA1LjE5My02LjA0MyA1LjE5My00LjU4MyAwLTYuNTI1LTMuMzQtNi41MjUtNy41NDF2LTIuOTMzYzAtNC4xOSAyLjAzMS03LjU4IDYuNDc1LTcuNTggMy44NDYgMCA1Ljk3OSAyLjczIDUuOTc5IDUuMjd2LjAzOGgtMS4wMTZjLS4wMjUtMi4wNTctMS44MDItNC4zNTUtNC45NjMtNC4zNTUtMy43NDYgMC01LjQzNCAyLjk3LTUuNDM0IDYuNTEzdjMuMTZ6bTE2LjE0Ni0uMTc4djEuNjVjMCAzLjI3NiAxLjgxNiA1LjAxNSA0LjM0MyA1LjAxNSAyLjQ4NyAwIDQuMzI4LTEuNyA0LjMyOC01LjAxNXYtMS42NWMwLTMuMjc1LTEuODQtNS4wNTItNC4zNDItNS4wNTItMi41IDAtNC4zMjkgMS43NTEtNC4zMjkgNS4wNTJtOS43LS4xMDJ2MS44NjdjMCAzLjcyLTIuMjYgNS44NC01LjM3IDUuODQtMy4xMSAwLTUuMzQ2LTIuMTItNS4zNDYtNS44NHYtMS44NjdjMC0zLjc0NSAyLjIxLTUuODc3IDUuMzQ2LTUuODc3IDMuMDg0IDAgNS4zNyAyLjE4MyA1LjM3IDUuODc3Ii8+PG1hc2sgaWQ9ImIiIGZpbGw9IiNmZmYiPjx1c2UgeGxpbms6aHJlZj0iI2EiLz48L21hc2s+PHBhdGggZmlsbD0iIzU1NSIgZD0iTTczLjY0NSAyNS4wMjJoMS4wMTZWMTEuODgzaC0xLjAxNnYxMy4xMzl6bS41MDgtMTcuNTA2Yy41MDcgMCAuOTE0LjQwNi45MTQuOTE0cy0uNDA3LjkwMS0uOTE0LjkwMWMtLjUwOCAwLS45MDItLjM5My0uOTAyLS45MDFzLjM5NC0uOTE0LjkwMi0uOTE0em01LjQ0NCA0LjM2N2gxLjAxN3YyLjQzOGguMDVjLjQzMS0xLjI0NSAxLjc3OC0yLjY1NCA0LjIyNy0yLjY1NCAyLjY0MSAwIDQuNTcgMS42OSA0LjU3IDQuNzYxdjguNTk0aC0xLjAyOHYtOC40NjdjMC0yLjI4NS0xLjM0Ni0zLjkzNi0zLjY5NC0zLjkzNi0yLjc1NSAwLTQuMTI2IDIuMTYtNC4xMjYgNC4zOTN2OC4wMWgtMS4wMTZWMTEuODgzeiIgbWFzaz0idXJsKCNiKSIvPjxwYXRoIGZpbGw9IiMzMDMwMzAiIGQ9Ik05NC43NjYgMjAuMDU5Yy4xNjUgMS43MTQgMS42IDMuMjM3IDQuNDU2IDMuMjM3IDIuNTE0IDAgNC4xNjQtMS4yNDQgNC4xNjQtMy4yMzcgMC0xLjU2Mi0uOTY1LTIuNDEyLTMuMDA5LTIuOTQ1bC0yLjk5Ni0uOGMtMi4wNTYtLjU0Ni0zLjk5OS0xLjg0MS0zLjk5OS00LjQ4MSAwLTMuMTc0IDIuODItNC45MTMgNS44NzgtNC45MTMgMi45MDcgMCA1LjgwMSAxLjUzNiA1Ljg2NSA0LjgyNGgtMS45MDRjLS4xNTItMS43MDEtMS40MzQtMy4wOTgtMy45OTktMy4wOTgtMi4yNzIgMC0zLjkxIDEuMTA1LTMuOTEgMy4wNiAwIDEuMzU4LjgyNSAyLjI5NyAyLjU2NCAyLjc1NGwyLjkzMy44YzIuNzMuNzM3IDQuNTIgMS45NDMgNC41MiA0LjY3MiAwIDMuMzUtMi44MzIgNS4wOS02LjM0OCA1LjA5LTQuNDk0IDAtNi4wNjktMi43OC02LjEzMi00Ljk2M2gxLjkxN3ptMTUuMDYyLTExLjc5NGgxLjg2NXYzLjM0aDIuNzE4djEuNTg2aC0yLjcxOHY4LjE4OGMwIDEuNjM4LjUzNCAyLjA0NCAyLjIyMiAyLjA0NC4yMjggMCAuNDIgMCAuNjEtLjAyNnYxLjUzN2MtLjE5LjAzOC0uNjM2LjA4OC0xLjA4LjA4OC0zLjAzMyAwLTMuNjE3LTEuMTkzLTMuNjE3LTMuNzU3di0xM3ptMTYuNTE0IDEyLjExMXYtMS42MzhoLTMuNTU1Yy0xLjk0MiAwLTIuNzY3LjkyNy0yLjc2NyAyLjIyMiAwIDEuNjUgMS4zNTggMi40NSAyLjg1NiAyLjQ1IDEuOTggMCAzLjQ2Ni0xLjI0NCAzLjQ2Ni0zLjAzNG0tMy45MSA0LjY0NmMtMi41NzcgMC00LjM0Mi0xLjU4Ny00LjM0Mi00LjAyNCAwLTIuMjk4IDEuNi0zLjc3IDQuNjM0LTMuNzgzaDMuNjE4VjE1Ljc4YzAtMS44NjYtMS4wOTItMi44NjktMi45ODMtMi44NjktMS44MyAwLTIuODMxLjkwMi0yLjk4NCAyLjMxMWgtMS43NjRjLjE1Mi0yLjMxIDEuNzM5LTMuOTIzIDQuODI0LTMuOTIzIDIuNzY3IDAgNC43NzMgMS41MzYgNC43NzMgNC4yNjZ2OS4yNDJoLTEuODE1VjIzLjA4aC0uMDUxYy0uNjM1IDEuMDY2LTEuODggMS45NDItMy45MSAxLjk0Mm05LjgzMS0xNi43NTdoMS44Njd2My4zNGgyLjcxNnYxLjU4NmgtMi43MTZ2OC4xODhjMCAxLjYzOC41MzIgMi4wNDQgMi4yMjEgMi4wNDQuMjI4IDAgLjQxOCAwIC42MS0uMDI2djEuNTM3YTYuNTIyIDYuNTIyIDAgMCAxLTEuMDguMDg4Yy0zLjAzNCAwLTMuNjE4LTEuMTkzLTMuNjE4LTMuNzU3di0xM3ptMTIuNzczIDMuMDM1YzMuMTM2IDAgNC42MzQgMS44NCA0LjYzNCAzLjkyMmgtMS43NjVjLS4wNjMtMS4wNC0uNzM2LTIuMzIzLTIuOTQ1LTIuMzIzLTEuNjYzIDAtMi44OTQuNzIzLTIuODk0IDIuMTQ1IDAgMS41MzYgMS42ODggMS45MDQgMy4zMDEgMi4yMjIgMi40NzUuNDU3IDQuNjMzIDEuMDggNC42MzMgMy42OTQgMCAyLjYyOC0yLjE0NiA0LjA2Mi01LjE2NyA0LjA2Mi0yLjkwNyAwLTQuODYyLTEuNDYtNC44NjItMy43NDVoMS44MjhjLjE3NyAxLjIyIDEuMjQ0IDIuMTQ2IDMuMTg2IDIuMTQ2IDIuMTIgMCAzLjE2MS0uOTkgMy4xNjEtMi4yNDcgMC0xLjU3NC0xLjQ0Ny0xLjg3OS0zLjQwMi0yLjI4NS0yLjUtLjU0Ni00LjUxOS0xLjI3LTQuNTE5LTMuNjQ0IDAtMi43MjkgMi4yODUtMy45NDggNC44MTEtMy45NDgiIG1hc2s9InVybCgjYikiLz48cGF0aCBmaWxsPSIjRkZCMzQ3IiBkPSJtNy40NjEgMjMuNDk2LTMuMjggMy4yOEMxLjQ4MyAyMy44NDMgMCAyMC4wMDcgMCAxNS45NjdjMC00LjI4OCAxLjY1LTguMyA0LjY0Ny0xMS4yOTdBMTYuMDM0IDE2LjAzNCAwIDAgMSAxMS4xMy43MzJsMS4wMTMgNC41NWExMS40MjkgMTEuNDI5IDAgMCAwLTQuMjI0IDIuNjcgMTEuMjc4IDExLjI3OCAwIDAgMC0zLjMxMiA3Ljc3IDExLjI4MiAxMS4yODIgMCAwIDAgMi44NTUgNy43NzQiIG1hc2s9InVybCgjYikiLz48cGF0aCBmaWxsPSIjRkY5MzMyIiBkPSJNMTUuOTM2IDE1Ljk2MiAxMi40NjcuMzcyYTE1Ljk2MSAxNS45NjEgMCAwIDEgNy44OC4yNjMgMTYuMjMgMTYuMjMgMCAwIDEgNi45MjggNC4wOTUgMTUuODczIDE1Ljg3MyAwIDAgMSA0LjEwNCA3LjFjLjY2MyAyLjQ4LjcyIDUuMTEyLjE2IDcuNjE2bC0xNS42MDMtMy40ODR6IiBtYXNrPSJ1cmwoI2IpIi8+PHBhdGggZmlsbD0iI0VBNTIzNyIgZD0iTTIzLjkxOCAyOS43NzZjLTMuNzEzIDIuMTQzLTguMDEzIDIuNzItMTIuMTA3IDEuNjI0YTE2LjA2IDE2LjA2IDAgMCAxLTYuNjc1LTMuNjY4bDMuMjgxLTMuMjgxYTExLjI5NiAxMS4yOTYgMCAwIDAgNy41MiAyLjg0OCAxMS4yNTQgMTEuMjU0IDAgMCAwIDguMDA4LTMuMzIgMTEuMzg0IDExLjM4NCAwIDAgMCAyLjY2Ni00LjIxNmw0LjU3IDEuMDE5Yy0xLjE5OCAzLjc4OC0zLjc3NCA2Ljk3OS03LjI2MyA4Ljk5NCIgbWFzaz0idXJsKCNiKSIvPjwvZz48L3N2Zz4="
							alt="CoinStats"
						/>
					</Link>
				</Logo>
				<Link to="/">
					<Item>Cryptocurrencies</Item>
				</Link>
				<Item>
					<Link to="/">Blog</Link>
				</Item>
			</Container>
			<Container>
				<Item>
					<Search>
						<input placeholder="Search" />
						<SearchSvg />
					</Search>
				</Item>
				<Item>
					<SettingSvg />
				</Item>
				<Link to="/">
					<Item>Login</Item>
				</Link>
				<Link to="/">
					<Item
						style={{
							display: "flex",
							justifyContent: "center",
							width: "115px",
							height: "40px",
							color: "white",
							backgroundColor: "#ff9332",
							borderRadius: "16px",
						}}
					>
						Get Started
					</Item>
				</Link>
				<Item>
					<UserSvg />
				</Item>
			</Container>
		</Wrapper>
	);
}

export default Header;
