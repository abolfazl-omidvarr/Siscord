import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function uploadToCloadinary(file: File | undefined, imageFor: "serverImage" | "message"): Promise<string> {
	if (!file) throw new Error("no server image is provided");
	if (imageFor === "serverImage") {
		if (file.size > 4200000)
			throw new Error("File size must be lower than 4MB");
	}
	if (imageFor === "message") {
		if (file.size > 10000000)
			throw new Error("File size must be lower than 10MB",{cause:'fileSize'});
	}

	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

	const { data: uploadResponse } = await axios.post(
		`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_CODE!}/image/upload`,
		formData
	);

	return uploadResponse.secure_url;
}
