"use client";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Check, Copy, Moon, RefreshCw, Sun } from "lucide-react";
import axios from "axios";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { closeInvite, setInviteModalData } from "@/redux/slices/modalSlice";
import { useOrigin } from "../../hooks/use-origin";
import { cn } from "@/lib/utils";
import { Server } from "@prisma/client";


export const InviteModal = () => {
	const [copied, setCopied] = useState(false);
	const [loading, setLoading] = useState(false);
	const copingRef = useRef<NodeJS.Timeout>();

	const dispatch = useDispatch();
	const origin = useOrigin();

	const { isInviteOpen: open, inviteData: server } = useSelector((state: RootState) => state.modal);

	const handleClose = () => {
		dispatch(closeInvite());
	};
	const inviteUrl = `${origin}/invite/server/${server?.inviteCode}`;

	const onCopy = () => {
		clearTimeout(copingRef.current);

		navigator.clipboard.writeText(inviteUrl);
		setCopied(true);

		copingRef.current = setTimeout(() => {
			setCopied(false);
		}, 1000);
	};

	const onNewLink = async () => {
		try {
			setLoading(true);
			const response = await axios.patch<Server>(`/api/servers/${server?.serverId}/invite-code`);
			dispatch(setInviteModalData({
				inviteCode: response.data.inviteCode,
				serverId: response.data.id
			}));
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);

		}
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="bg-white text-black p-0 overflow-hidden">
				<DialogHeader className="pt-8 px-6">
					<DialogTitle className="text-2xl text-center font-bold">
						Invite your friends
					</DialogTitle>
				</DialogHeader>
				<div className="p-6">
					<Label
						className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
					>
						Server invite link
					</Label>
					<div className="flex items-center mt-2 gap-x-2">
						<Input
							readOnly
							disabled={loading}
							className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
							value={inviteUrl ? inviteUrl : ""}
						/>
						<Button disabled={loading} size="icon" onClick={onCopy}>
							<Copy className={cn("h-4 w-4 rotate-0 scale-100 transition-all ",
								copied && "-rotate-90 scale-0")} />
							<Check color="green" className={cn("absolute h-6 w-6 rotate-90 scale-0 transition-all ",
								copied && "rotate-0 dark:scale-100")} />
							<span className="sr-only">Toggle theme</span>
						</Button>
					</div>
					<Button onClick={onNewLink} disabled={loading} variant="link"
									size="sm"
									className="text-xs text-zinc-500 mt-4">
						Generate a new link
						<RefreshCw className="w-4 h-4 ml-2" />
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
