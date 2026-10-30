export interface NavLinkItem {
	label: string;
	to: string;
}

export const MAIN_NAV_LINKS: NavLinkItem[] = [
	{ label: "Naslovna", to: "/" },
	{ label: "Termini", to: "/matches" },
	{ label: "Momčadi", to: "/teams" },
	{ label: "Sezone", to: "/seasons" },
];
