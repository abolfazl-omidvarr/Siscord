import { Server, Member, Profile } from "@prisma/client";

export type ServerWithMemberAndProfile = Server & {
	Member: (Member & { profile: Profile })[];
}