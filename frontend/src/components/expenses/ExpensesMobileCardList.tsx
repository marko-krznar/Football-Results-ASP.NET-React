import { useState, useMemo } from "react";
import {
	Box,
	Card,
	CardContent,
	Typography,
	IconButton,
	Stack,
	Chip,
	Pagination,
	Button,
	Fab,
	useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TuneIcon from "@mui/icons-material/Tune";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import "dayjs/locale/hr";
import type { Expense } from "../../types/expense";

interface ExpensesMobileCardListProps {
	expenses: Array<Expense>;
	onEdit: (expense: Expense) => void;
	onDelete: (id: number) => void;
	onAddNew?: () => void;
	pageSize?: number;
}

export default function ExpensesMobileCardList({
	expenses,
	onEdit,
	onDelete,
	onAddNew,
	pageSize = 5,
}: ExpensesMobileCardListProps) {
	const theme = useTheme();
	const [activeFilter, setActiveFilter] = useState<string>("all");
	const [page, setPage] = useState(1);

	// Extract unique month filters from expenses
	const availableMonths = useMemo(() => {
		const monthsMap = new Map<string, string>();
		expenses.forEach((e) => {
			if (e.date) {
				const d = dayjs(e.date).locale("hr");
				const key = d.format("YYYY-MM");
				const label = d.format("MMMM YYYY");
				const capitalizedLabel = label.charAt(0).toUpperCase() + label.slice(1);
				if (!monthsMap.has(key)) {
					monthsMap.set(key, capitalizedLabel);
				}
			}
		});
		return Array.from(monthsMap.entries()).map(([key, label]) => ({ key, label }));
	}, [expenses]);

	// Filter expenses based on active selection
	const filteredExpenses = useMemo(() => {
		if (activeFilter === "all") return expenses;
		if (activeFilter === "hpd") return expenses.filter((e) => e.option === 0);
		if (activeFilter === "ostalo") return expenses.filter((e) => e.option === 1);
		// check if filter is month key (YYYY-MM)
		return expenses.filter((e) => e.date && dayjs(e.date).format("YYYY-MM") === activeFilter);
	}, [expenses, activeFilter]);

	// Total sum of all expenses
	const totalSum = useMemo(() => {
		return expenses.reduce((acc, curr) => acc + (curr.amount || 0), 0);
	}, [expenses]);

	// Latest payment date for "Zadnja uplata: DD.MM."
	const lastPaymentDate = useMemo(() => {
		const datedExpenses = expenses.filter((e) => e.date);
		if (datedExpenses.length === 0) return null;
		const sorted = [...datedExpenses].sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());
		return dayjs(sorted[0].date).locale("hr").format("DD.MM.");
	}, [expenses]);

	const totalPages = Math.ceil(filteredExpenses.length / pageSize) || 1;
	const currentPage = Math.min(page, totalPages);
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = Math.min(startIndex + pageSize, filteredExpenses.length);
	const paginatedExpenses = filteredExpenses.slice(startIndex, endIndex);

	const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	return (
		<Box sx={{ width: "100%", position: "relative", pb: 8 }}>
			{/* Header: Title, Subtitle and FILTERI button */}
			<Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
				<Box>
					<Typography variant="h3" component="h1">
						Lista troškova
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Pregled evidencije i uplata sezone
					</Typography>
				</Box>

				<Button
					variant="outlined"
					color="primary"
					startIcon={<TuneIcon />}
					sx={{
						borderRadius: "9999px",
					}}
				>
					Filteri
				</Button>
			</Stack>

			{/* Filter Chips Bar (Horizontal Scrollable) */}
			<Box
				sx={{
					display: "flex",
					gap: 1,
					overflowX: "auto",
					pb: 1,
					mb: 2,
					"&::-webkit-scrollbar": { display: "none" },
					scrollbarWidth: "none",
				}}
			>
				<Chip
					label={`Svi troškovi (${expenses.length})`}
					clickable
					color={activeFilter === "all" ? "primary" : "default"}
					variant={activeFilter === "all" ? "filled" : "outlined"}
					onClick={() => {
						setActiveFilter("all");
						setPage(1);
					}}
				/>

				{availableMonths.map((m) => {
					const isActive = activeFilter === m.key;
					return (
						<Chip
							key={m.key}
							label={m.label}
							clickable
							color={isActive ? "primary" : "default"}
							variant={isActive ? "filled" : "outlined"}
							onClick={() => {
								setActiveFilter(m.key);
								setPage(1);
							}}
						/>
					);
				})}

				<Chip
					label="Termini"
					clickable
					color={activeFilter === "ostalo" ? "primary" : "default"}
					variant={activeFilter === "ostalo" ? "filled" : "outlined"}
					onClick={() => {
						setActiveFilter("ostalo");
						setPage(1);
					}}
				/>

				<Chip
					label="HPD Prsten"
					clickable
					color={activeFilter === "hpd" ? "primary" : "default"}
					variant={activeFilter === "hpd" ? "filled" : "outlined"}
					onClick={() => {
						setActiveFilter("hpd");
						setPage(1);
					}}
				/>
			</Box>

			{/* KPI Summary Card: UKUPNO ZABILJEŽENO */}
			<Card variant="outlined" sx={{ mb: 2 }}>
				<CardContent>
					<Stack direction="row" justifyContent="space-between" alignItems="flex-start">
						<Box>
							<Typography
								variant="caption"
								color="text.secondary"
								sx={{
									textTransform: "uppercase",
									fontWeight: "bold",
									display: "block",
								}}
							>
								UKUPNO ZABILJEŽENO
							</Typography>
							<Typography variant="h3" component="div">
								{totalSum.toFixed(2)}{" "}
								<Box component="span" sx={{ color: "primary.main" }}>
									€
								</Box>
							</Typography>
						</Box>

						<Box sx={{ textAlign: "right" }}>
							<Chip
								label="Aktivna sezona"
								size="small"
								color="primary"
								variant="outlined"
								sx={{ mb: 0.5 }}
							/>
							{lastPaymentDate && (
								<Typography variant="caption" color="text.secondary" display="block">
									Zadnja uplata: {lastPaymentDate}
								</Typography>
							)}
						</Box>
					</Stack>
				</CardContent>
			</Card>

			{/* List of Expense Cards */}
			<Stack spacing={2}>
				{paginatedExpenses.length === 0 ? (
					<Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
						Nisu pronađeni troškovi za odabrani filter.
					</Typography>
				) : (
					paginatedExpenses.map((expense) => {
						const isHpdPrsten = expense.option === 0;
						const formattedDate = expense.date
							? isHpdPrsten
								? dayjs(expense.date).locale("hr").format("MMMM YYYY")
								: dayjs(expense.date).locale("hr").format("DD.MM.YYYY. (dddd)")
							: "-";

						const formattedAmount =
							expense.amount !== null && expense.amount !== undefined
								? `${expense.amount.toFixed(2)} €`
								: "0.00 €";

						return (
							<Card key={expense.id} variant="outlined">
								<CardContent>
									{/* Top Row: Tag/Chip + Date & Action Buttons */}
									<Stack direction="row" justifyContent="space-between" alignItems="center">
										<Stack direction="row" spacing={1} alignItems="center">
											<Chip
												label={isHpdPrsten ? "HPD Prsten" : "Ostalo"}
												size="small"
												color={isHpdPrsten ? "primary" : "default"}
												variant={isHpdPrsten ? "filled" : "outlined"}
											/>
											<Typography variant="caption" color="text.secondary">
												{formattedDate}
											</Typography>
										</Stack>

										<Stack direction="row" spacing={1}>
											<IconButton
												size="small"
												aria-label="edit"
												color="primary"
												sx={{ background: theme.palette.divider, borderRadius: "4px" }}
												onClick={() => onEdit(expense)}
											>
												<EditIcon fontSize="small" />
											</IconButton>
											<IconButton
												size="small"
												aria-label="delete"
												color="error"
												sx={{ background: theme.palette.divider, borderRadius: "4px" }}
												onClick={() => expense.id && onDelete(expense.id)}
											>
												<DeleteIcon fontSize="small" />
											</IconButton>
										</Stack>
									</Stack>

									{/* Bottom Row: OPIS on left, IZNOS on right */}
									<Stack direction="row" justifyContent="space-between" alignItems="flex-end">
										<Box sx={{ flex: 1, pr: 2 }}>
											<Typography
												variant="caption"
												color="text.secondary"
												sx={{
													display: "block",
													textTransform: "uppercase",
													fontWeight: "bold",
												}}
											>
												OPIS
											</Typography>
											<Typography variant="body1" color="text.primary">
												{expense.description || "Nema opisa"}
											</Typography>
										</Box>

										<Box sx={{ textAlign: "right", whiteSpace: "nowrap" }}>
											<Typography
												variant="caption"
												color="text.secondary"
												sx={{
													display: "block",
													textTransform: "uppercase",
													fontWeight: "bold",
												}}
											>
												IZNOS
											</Typography>
											<Typography variant="h6" color="text.primary" fontWeight="bold">
												{formattedAmount}
											</Typography>
										</Box>
									</Stack>
								</CardContent>
							</Card>
						);
					})
				)}
			</Stack>

			{/* Pagination Controls */}
			{totalPages > 1 && (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: 1,
						pt: 2,
					}}
				>
					<Pagination
						count={totalPages}
						page={currentPage}
						onChange={handlePageChange}
						color="primary"
						shape="rounded"
						siblingCount={0}
					/>
					<Typography variant="caption" color="text.secondary">
						Prikazano {startIndex + 1}–{endIndex} od {filteredExpenses.length}
					</Typography>
				</Box>
			)}

			{/* Floating Bottom Action Button: + NOVI TROŠAK */}
			{onAddNew && (
				<Box
					sx={{
						position: "fixed",
						bottom: { xs: 76, md: 32 },
						right: { xs: 16, sm: 24, md: 32 },
						zIndex: (t) => t.zIndex.speedDial,
					}}
				>
					<Fab variant="extended" color="primary" onClick={onAddNew} aria-label="Novi trošak">
						<AddIcon sx={{ mr: 1 }} />
						Novi trošak
					</Fab>
				</Box>
			)}
		</Box>
	);
}
