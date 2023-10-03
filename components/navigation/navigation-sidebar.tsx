import { currentProfile } from "@/lib/current-profile";
import { Separator } from "@/components/ui/separator";
import NavigationAction from "@/components/navigation/navigation-action";
import NavigationItem from "@/components/navigation/navigation-item";
import { ScrollArea } from "@/components/ui/scroll-area";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

const NavigationSidebar = async () => {
	const profile = await currentProfile();

	if (!profile) return redirect("/");

	const servers = await prisma.server.findMany({
		where: {
			Member: {
				some: {
					profileId: profile.id
				}
			}
		}
	});

	const x = 5;

	return (
		<div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
			<NavigationAction />
			<Separator
				className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
			<ScrollArea className="flex-1 w-full">
				{servers.map(server => (
					<div key={server.id} className="mb-4">
						<NavigationItem
							id={server.id}
							name={server.name}
							imageUrl={server.imageUrl}
						/>
					</div>
				))}
			</ScrollArea>
		</div>
	);
};

export default NavigationSidebar;
