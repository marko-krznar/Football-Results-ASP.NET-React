import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from "@mui/material";

interface ModalDeleteExpenseProps {
	open: boolean;
	handleClose: () => void;
	handleConfirm: () => Promise<void> | void;
}

export default function ModalDeleteExpense({
	open,
	handleClose,
	handleConfirm,
}: ModalDeleteExpenseProps) {
	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Potvrda brisanja</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Jeste li sigurni da želite obrisati ovaj trošak?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Odustani</Button>
				<Button onClick={handleConfirm} color="error" variant="contained">
					Obriši
				</Button>
			</DialogActions>
		</Dialog>
	);
}
