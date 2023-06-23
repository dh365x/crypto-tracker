import styled, { keyframes } from "styled-components";

// 스피너 회전 애니메이션
const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// 스피너 컨테이너 스타일
const SpinnerContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;

// 스피너 스타일
const Spinner = styled.div`
	width: 50px;
	height: 50px;
	border: 5px solid #e0e0e0;
	border-top-color: #ff9332;
	border-radius: 50%;
	animation: ${spinAnimation} 1s linear infinite;
`;

// 로딩 화면 컴포넌트
function Loading() {
	return (
		<SpinnerContainer>
			<Spinner />
		</SpinnerContainer>
	);
}

export default Loading;
