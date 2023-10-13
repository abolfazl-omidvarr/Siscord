import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
// import toast from "react-hot-toast";

interface InviteCodePageProps {
	params: {
		inviteCode: string
	};
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
	const profile = await currentProfile();

	if (!profile) {
		return redirectToSignIn();
	}

	if (!params.inviteCode) {
		return redirect("/");
	}

	const existingServer = await prisma.server.findFirst({
		where: {
			inviteCode: params.inviteCode,
			Member: {
				some: {
					profileId: profile.id
				}
			}
		}
	});

	if (existingServer) {
		return redirect(`/servers/${existingServer.id}`);
	}

	try {
		const server = await prisma.server.update({
			where: {
				inviteCode: params.inviteCode
			},
			data: {
				Member: {
					create: [{
						profileId: profile.id
					}]
				}
			}
		});

		return redirect(`/server/${server.id}`);
	} catch (e) {
		redirect("/");
	}


};

export default InviteCodePage;
