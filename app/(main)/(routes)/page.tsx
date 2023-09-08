import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
	return (
		<main>
			<UserButton afterSignOutUrl="/" />
			<ModeToggle />
		</main>
	);
}
