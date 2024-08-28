// app/suborgan/update/[id]/page.tsx
"use client";
import { handleUpdateSuborgan } from "@/utils/actions/suborgan";
import SuborganForm from "../SuborganForm";
import { useParams } from "next/navigation";

export default function UpdateSuborganPage() {
	const params = useParams();
	const suborganId = params.id as string;

	const handleSubmit = async (formData: FormData) => {
		await handleUpdateSuborgan(suborganId, formData);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="max-w-lg w-full">
				<h1 className="text-2xl font-bold text-center mb-4">Update Suborgan</h1>
				<SuborganForm
					onSubmit={handleSubmit}
					initialData={{ name: "", logo: "" }}
				/>
			</div>
		</div>
	);
}
