"use server";
import { revalidatePath } from "next/cache";
import { createCandidate, updateCandidate } from "../database/candidates.query";
import { createVoteSessionCandidate } from "../database/vote.query";
import { findVoteSession } from "../database/vote.query";

export const handleCreateCandidate = async (
	vote_session: string,
	formData: FormData
) => {
	const suborgan = await findVoteSession({ id: vote_session });
	if (suborgan === null) return;
	const candidateData = {
		img: formData.get("img") as string,
		name: formData.get("name") as string,
		kelas: formData.get("kelas") as string,
		visi: formData.get("visi") as string,
		misi: formData.get("misi") as string,
		motto: formData.get("motto") as string,
		progja: formData.get("progja") as string,
		video_profil: formData.get("video_profil") as string,
		suborgan: {
			connect: { id: suborgan.suborgan_id },
		},
	};

	try {
		const response = await createCandidate(candidateData);

		if (response && response.id) {
			await createVoteSessionCandidate({
				vote_session: {
					connect: { id: vote_session },
				},
				candidate: {
					connect: { id: response.id },
				},
				number: Number(formData.get("candidate_number") as string),
			});
		}

		revalidatePath("/", "layout");
	} catch (error) {
		console.error("Error creating candidate or vote session candidate:", error);
	}
	revalidatePath("/", "layout");
};

export const handleUpdateCandidate = async (id: string, formData: FormData) => {
	const candidateData = {
		img: formData.get("img") as string,
		name: formData.get("name") as string,
		kelas: formData.get("kelas") as string,
		visi: formData.get("visi") as string,
		misi: formData.get("misi") as string,
		pengalaman: formData.get("pengalaman") as string,
		motto: formData.get("motto") as string,
		progja: formData.get("progja") as string,
		video_profil: formData.get("video_profil") as string,
		suborgan: {
			connect: { id: formData.get("suborgan_id") as string },
		},
	};

	await updateCandidate({ id }, candidateData);
	revalidatePath("/", "layout");
};
