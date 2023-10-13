"use client";
import React, { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";


interface FileUploadProp {
	onChange: (file?: Blob) => void;
	value: Blob | undefined;
	editServer?: { imageUrl: string };
}

export const FileUpload = ({ onChange, value, editServer }: FileUploadProp) => {

	const onFileSelectHandler = async (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		onChange(e.target.files[0]);
	};

	console.log({ editServer, value });

	return (
		<div className="">
			{
				<>
					<input onChange={onFileSelectHandler} id="serverImage" type="file" className="hidden" />
					<label htmlFor="serverImage" className="cursor-pointer">
						{value || editServer
							?
							<div className="w-44 h-44 rounded-full relative">
								<Image className="rounded-full drop-shadow-md" fill
											 src={value ? URL.createObjectURL(value) : editServer!.imageUrl} alt="srevre image" />
							</div>
							:
							<div
								className="border-2 border-dashed border-zinc-600 rounded-md w-72 h-52 flex flex-col justify-center items-center m-auto gap-5">
								<Upload className="w-10 h-10" />
								Choose files or drag and drop
							</div>
						}
					</label>
				</>
			}
		</div>
	);
};