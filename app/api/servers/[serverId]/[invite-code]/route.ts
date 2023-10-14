import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { prisma } from "@/lib/prisma";
import { v4 as uuid } from "uuid";

export async function PATCH(req: Request, { params }: { params: { serverId: string } }) {
	try {
		const profile = await currentProfile();
		if (!profile) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		if (!params.serverId) {
			return new NextResponse("invalid server id", { status: 400 });
		}

		const server = await prisma.server.update({
			where: {
				id: params.serverId,
				profileId: profile.id
			},
			data: {
				inviteCode: uuid()
			}
		});

		return NextResponse.json(server);
	} catch (err) {
		console.log("[INVITE_CODE_PATCH]", err);
		return new NextResponse("Internal error", { status: 500 });
	}
}