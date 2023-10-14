"use client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem, DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ServerWithMemberAndProfile } from "@/lib/types";
import { MemberRole } from "@prisma/client";
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react";
import {
	openEditServer,
	openInvite,
	openMangeMember,
	setEditServerInitialData,
	setInviteModalData, setManageMemberData
} from "@/redux/slices/modalSlice";
import { useDispatch } from "react-redux";

interface ServerHeaderProps {
	server: ServerWithMemberAndProfile;
	role?: MemberRole;
}

const ServerHeader = ({ server, role }: ServerHeaderProps) => {
	const dispatch = useDispatch();
	const isAdmin = role === MemberRole.ADMIN;
	const isModerator = isAdmin || role === MemberRole.MODERATOR;

	const onInviteClickHandler = () => {
		dispatch(openInvite());
		dispatch(setInviteModalData({ inviteCode: server.inviteCode, serverId: server.id }));
	};

	const onServerSettingClickHandler = () => {
		dispatch(openEditServer());
		dispatch(setEditServerInitialData({ name: server.name, imageUrl: server.imageUrl, id: server.id }));
	};
	const onManageMemberClickHandler = () => {
		dispatch(openMangeMember());
		dispatch(setManageMemberData({
			name: server.name,
			imageUrl: server.imageUrl,
			id: server.id,
			serverMember: server.Member
		}));
	};


	return (
		<div className="flex flex-col text-primary w-full h-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
			<DropdownMenu>
				<DropdownMenuTrigger className="focus:outline-none" asChild>
					<button
						className="w-full text-md font-semibold px-3 flex items-center
						 h-12 border-neutral-200 dark:border-neutral-800 border-b-2
						 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
					>
						{server.name}
						<ChevronDown className="h-5 w-5 ml-auto" />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]"
				>
					{isModerator && (
						<DropdownMenuItem
							onClick={onInviteClickHandler}
							className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
						>
							Invite People
							<UserPlus className="h-4 w-4 ml-auto" />
						</DropdownMenuItem>)}
					{isAdmin && (
						<DropdownMenuItem
							onClick={onServerSettingClickHandler}
							className="px-3 py-2 text-sm cursor-pointer"
						>
							Server setting
							<Settings className="h-4 w-4 ml-auto" />
						</DropdownMenuItem>)}
					{isAdmin && (
						<DropdownMenuItem
							onClick={onManageMemberClickHandler}
							className="px-3 py-2 text-sm cursor-pointer"
						>
							Manage members
							<Users className="h-4 w-4 ml-auto" />
						</DropdownMenuItem>)}
					{isModerator && (
						<DropdownMenuItem
							className="px-3 py-2 text-sm cursor-pointer"
						>
							Create channel
							<PlusCircle className="h-4 w-4 ml-auto" />
						</DropdownMenuItem>)}
					{isModerator && (
						<DropdownMenuSeparator />
					)}
					{isAdmin && (
						<DropdownMenuItem
							className="text-red-500  px-3 py-2 text-sm cursor-pointer"
						>
							Delete server
							<Trash className="text-red-500 h-4 w-4 ml-auto" />
						</DropdownMenuItem>)}
					{!isAdmin && (
						<DropdownMenuItem
							className="text-red-500  px-3 py-2 text-sm cursor-pointer"
						>
							Leave server
							<LogOut className="text-red-500 h-4 w-4 ml-auto" />
						</DropdownMenuItem>)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default ServerHeader;