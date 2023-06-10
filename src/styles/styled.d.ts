import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		black: string;
		white: string;
		orange: string;
		gray: {
			darker: string;
			normal: string;
			lighter: string;
		};
	}
}
