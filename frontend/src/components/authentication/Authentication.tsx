import { Show, SignInButton, UserButton } from "@clerk/react";

export default function Authentication() {
	return (
		<>
			<Show when="signed-out">
				<SignInButton />
			</Show>
			<Show when="signed-in">
				<UserButton />
			</Show>
		</>
	);
}
