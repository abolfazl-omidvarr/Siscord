import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/db";

export const currentProfile = async () => {
	const { userId } = auth();

	if (!userId) {
		return null;
	}

	return await prisma.profile.findUnique({
		where: {
			userId
		}
	});
};