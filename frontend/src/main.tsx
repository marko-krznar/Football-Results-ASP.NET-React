import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { store } from "./redux/store.ts";
import { router } from "./routes.tsx";
import "./index.scss";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<RouterProvider router={router} />
			</LocalizationProvider>
		</Provider>
	</StrictMode>
);
