"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DialogDescription } from "@radix-ui/react-dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closeCreateServer } from "@/redux/slices/modalSlice";
import { useEffect, useState } from "react";
import { uploadToCloadinary } from "@/lib/utils";
import toast from "react-hot-toast";

const formSchema = z.object({
	name: z
		.string()
		.min(1, { message: "Server name is required" })
		.max(30, { message: "Server name must be less than 30 characters" })
	// imageUrl: z.string().min(1, { message: "Server image is required" })
});

export const CreateServerModal = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const open = useSelector((state: RootState) => state.modal.isCreateServerOpen);
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			file: undefined
		}
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			const imageUrl = await uploadToCloadinary(form.getValues("file"),'serverImage');
			await axios.post("/api/servers", { name: data.name, imageUrl });
			form.reset();
			router.refresh();
			dispatch(closeCreateServer());
		} catch (err:any) {
			console.error(err.message);
			toast.error(err.message);
		}
	};

	const handleClose = () => {
		form.reset();
		dispatch(closeCreateServer());
	};

	useEffect(() => {
		console.log(form.getValues('file'));
	});

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="bg-white text-black p-0 overflow-hidden">
				<DialogHeader className="pt-8 px-6">
					<DialogTitle className="text-2xl text-center font-bold">
						Customize your Server
					</DialogTitle>
					<DialogDescription className="text-center text-zinc-500">
						Give your server a personal touch. Add a name and an image. you can
						always change it in setting
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<div className="space-y-8 px-6">
							<div className="flex items-center justify-center text-center">
								<FormField
									name="file"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FileUpload
												value={field.value}
												onChange={field.onChange}
											/>
										</FormItem>
									)
									} />
							</div>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel
											className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
											Server name
										</FormLabel>
										<FormControl>
											<Input
												disabled={isLoading}
												className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
												placeholder="Enter server name"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter className="bg-gray-100 px-6 py-4">
							<Button type="submit" variant="primary" disabled={isLoading}>
								Create
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
