import ServerHeader from "@/components/server/server-header";
import { prisma } from "@/lib/prisma";

import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ChannelType } from "@prisma/client";


interface ServerSideBarProps {
	serverId: string;
}

const ServerSidebar = async ({ serverId }: ServerSideBarProps) => {
	const profile = await currentProfile();

	if (!profile) {
		return redirectToSignIn();
	}

	const server = await prisma.server.findUnique({
		where: {
			id: serverId
			// Member: {
			// 	some: {
			// 		profileId: profile.id
			// 	}
			// }
		},
		include: {
			Channel: {
				orderBy: {
					createdAt: "asc"
				}
			},
			Member: {
				include: {
					profile: true
				},
				orderBy: {
					role: "asc"
				}
			}
		}
	});

	if (!server) {
		return redirect("/");
	}

	const textChannels = server.Channel.filter(channel => channel.type === ChannelType.TEXT);
	const audioChannels = server.Channel.filter(channel => channel.type === ChannelType.AUDIO);
	const videoChannels = server.Channel.filter(channel => channel.type === ChannelType.Video);
	const members = server.Member.filter(member => member.profileId !== profile.id);

	const role = server.Member.find(member => member.profileId === profile.id)?.role;


	return (
		<div className="flex flex-col text-primary w-full h-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
			<ServerHeader
				server={server}
				role={role}
			/>
		</div>
	);
};

export default ServerSidebar;