import { useMediaQuery } from "react-responsive";

export const PC = ({ children }: any) => {
	const isPc = useMediaQuery({ minWidth: 768 });
	return <>{isPc && children}</>;
};
export const Mobile = ({ children }: any) => {
	const isMobile = useMediaQuery({ maxWidth: 767 });
	return <>{isMobile && children}</>;
};
