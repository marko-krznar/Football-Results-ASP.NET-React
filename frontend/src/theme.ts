import { createTheme, responsiveFontSizes } from "@mui/material";

export const theme = responsiveFontSizes(
	createTheme({
		palette: {
			mode: "dark",
			background: {
				default: "#0E0F0E",
			},
		},
		typography: {
			fontFamily: "Lexend, sans-serif",
			fontSize: 16,
			h1: {
				lineHeight: "1",
			},
			h3: {
				color: "#fff",
				fontWeight: "bold",
			},
			subtitle2: {
				fontSize: "2rem",
			},
			subtitle1: {
				lineHeight: "1",
				fontWeight: "bold",
			},
			body1: {
				color: "#ADAAAA",
			},
		},
		components: {
			MuiStack: {
				defaultProps: {
					useFlexGap: true,
				},
			},
			MuiCard: {
				styleOverrides: {
					root: {
						borderRadius: "1rem",
						padding: "2rem !important",
					},
				},
			},
			MuiCardContent: {
				styleOverrides: {
					root: {
						display: "flex",
						flexDirection: "column",
						gap: "2rem",
						padding: "0 !important",
					},
				},
			},
		},
	})
);
