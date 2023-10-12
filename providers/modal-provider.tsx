"use client";
import { CreateServerModal } from "@/components/modals/create-server-modal";
import { useEffect, useState } from "react";
import { EditServerModal } from "@/components/modals/edit-server-modal";

export function ModalProvider() {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, []);

	if(!isMounted) return null

	return (
		<>
			<CreateServerModal/>
			<EditServerModal/>
		</>
	);
}
