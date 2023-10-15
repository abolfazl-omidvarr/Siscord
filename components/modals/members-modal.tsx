"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { closeMangeMember } from "@/redux/slices/modalSlice";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "@/components/user-avatar";
import { ShieldAlert, ShieldCheck } from "lucide-react";

export const roleIconMap = {
	"GUEST": null,
	"MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
	"ADMIN": <ShieldAlert className="h-4 w-4 text-rose-500" />
};


export const MemberModal = () => {
	const [loadingId, setLoadingId] = useState("");
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const { isManageMemberOpen: open, manageMemberData: data } = useSelector((state: RootState) => state.modal);

	const handleClose = () => {
		dispatch(closeMangeMember());
	};

	console.log(data.serverMember);

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="bg-white text-black overflow-hidden">
				<DialogHeader className="pt-8 px-6">
					<DialogTitle className="text-2xl text-center font-bold">
						Manage members
					</DialogTitle>
					<DialogDescription className="text-center text-zinc-500">
						{data.serverMember.length} Members
					</DialogDescription>
				</DialogHeader>
				<ScrollArea className="mt-8 max-h-[420px] pr-6">
					{data.serverMember.map(member =>
						<div key={member.id} className="flex items-center gap-x-2 mb-6">
							<UserAvatar src={member.profile.imageUrl} />
							<div className="flex flex-col gap-y-1">
								<div className="text-xs font-semibold flex items-center">
									{member.profile.name}
									{roleIconMap[member.role]}
								</div>
								<div>
									<p className="text-xs text-zinc-500">
										{member.profile.email}
									</p>
								</div>
								{data.profileId !== member.profileId && loadingId !== member.id && (
									<div>
										Actions!
									</div>
								)}
							</div>
						</div>
					)}
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};
