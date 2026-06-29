import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux-toolkit/store.ts";
import { router } from "./routes.tsx";
import { ClerkProvider } from "@clerk/react";
import "./index.scss";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ClerkProvider
			publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
		>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</ClerkProvider>
	</StrictMode>
);
