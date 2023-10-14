"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { closeMangeMember } from "@/redux/slices/modalSlice";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "@/components/user-avatar";


export const MemberModal = () => {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const { isManageMemberOpen: open, manageMemberData: data } = useSelector((state: RootState) => state.modal);

	const handleClose = () => {
		dispatch(closeMangeMember());
	};


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
								</div>
							</div>
						</div>
					)}
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};
