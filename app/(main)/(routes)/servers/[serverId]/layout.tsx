import ServerSidebar from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { prisma } from "@/lib/prisma";

import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ServerIdLayout {
	children: React.ReactNode;
	params: { serverId: string };
}

const ServerIdLayout = async ({ params, children }: ServerIdLayout) => {
	const profile = await currentProfile();

	if (!profile) {
		return redirectToSignIn();
	}

	const server = await prisma.server.findUnique({
		where: {
			id: params.serverId,
			Member: {
				some: {
					profileId: profile.id
				}
			}
		}
	});

	if (!server) {
		return redirect("/");
	}

	return (
		<div className="h-full">
			<div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
				<ServerSidebar serverId={params.serverId} />
			</div>
			<main className="h-full md:pl-60">

				{children}
			</main>
		</div>
	);
};

export default ServerIdLayout;