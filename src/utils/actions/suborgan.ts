"use server";
import { revalidatePath } from "next/cache";
import { createSuborgan, updateSuborgan } from "../database/suborgan.query";
export const handleCreateSuborgan = async (formData: FormData) => {
	const name = formData.get("name") as string;
	const logo = formData.get("logo") as string;

	await createSuborgan({ name, logo });
	revalidatePath("/", "layout");
};

export const handleUpdateSuborgan = async (id: string, formData: FormData) => {
	const name = formData.get("name") as string;
	const logo = formData.get("logo") as string;

	await updateSuborgan({ id }, { name, logo });
	revalidatePath("/", "layout");
};
