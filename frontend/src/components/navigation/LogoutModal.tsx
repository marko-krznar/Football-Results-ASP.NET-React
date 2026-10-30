import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from "@mui/material";

interface LogoutModalProps {
	open: boolean;
	onClose: () => void;
	onConfirm: () => Promise<void> | void;
}

export default function LogoutModal({ open, onClose, onConfirm }: LogoutModalProps) {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			slotProps={{
				paper: {
					sx: {
						borderRadius: "16px",
						p: 1,
						minWidth: { xs: "90%", sm: 380 },
					},
				},
			}}
		>
			<DialogTitle sx={{ fontWeight: 600 }}>Odjava</DialogTitle>
			<DialogContent>
				<DialogContentText sx={{ color: "text.secondary" }}>
					Jeste li sigurni da se želite odjaviti?
				</DialogContentText>
			</DialogContent>
			<DialogActions sx={{ px: 3, pb: 2 }}>
				<Button onClick={onClose} sx={{ color: "text.secondary" }}>
					Odustani
				</Button>
				<Button onClick={onConfirm} color="error" variant="contained">
					Odjavi se
				</Button>
			</DialogActions>
		</Dialog>
	);
}
