"use client"; // This marks the component as a Client Component

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getVoteSession } from "@/utils/database/vote.query";
import { findAllCandidates } from "@/utils/database/candidates.query";
import { handleCreateCandidate } from "@/utils/actions/candidates";

interface CandidateFormProps {
	onSubmit: (voteId: string, formData: FormData) => Promise<void>;
	initialData?: {
		img: string;
		name: string;
		kelas: string;
		visi: string;
		misi: string;
		motto: string;
		progja: string;
		video_profil: string;
		suborgan_id: string;
	};
	voteId?: string;
}

const CandidateForm = ({
	onSubmit,
	initialData,
	voteId,
}: CandidateFormProps) => {
	const [img, setImg] = useState(initialData?.img || "");
	const [name, setName] = useState(initialData?.name || "");
	const [kelas, setKelas] = useState(initialData?.kelas || "");
	const [visi, setVisi] = useState(initialData?.visi || "");
	const [misi, setMisi] = useState(initialData?.misi || "");
	const [motto, setMotto] = useState(initialData?.motto || "");
	const [progja, setProgja] = useState(initialData?.progja || "");
	const [videoProfil, setVideoProfil] = useState(
		initialData?.video_profil || ""
	);
	const [number, setNumber] = useState("1");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("img", img);
		formData.append("name", name);
		formData.append("kelas", kelas);
		formData.append("visi", visi);
		formData.append("misi", misi);
		formData.append("motto", motto);
		formData.append("progja", progja);
		formData.append("video_profil", videoProfil);
		formData.append("candidate_number", number);

		await onSubmit(voteId || "", formData);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-md mx-auto p-4 bg-white shadow-md rounded"
		>
			<div className="mb-4">
				<label
					htmlFor="img"
					className="block text-sm font-medium text-gray-700"
				>
					Image URL
				</label>
				<input
					type="text"
					id="img"
					value={img}
					onChange={(e) => setImg(e.target.value)}
					className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					required
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="name"
					className="block text-sm font-medium text-gray-700"
				>
					Name
				</label>
				<input
					type="text"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					required
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="kelas"
					className="block text-sm font-medium text-gray-700"
				>
					Kelas
				</label>
				<input
					type="text"
					id="kelas"
					value={kelas}
					onChange={(e) => setKelas(e.target.value)}
					className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					required
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="visi"
					className="block text-sm font-medium text-gray-700"
				>
					Visi
				</label>
				<textarea
					id="visi"
					value={visi}
					onChange={(e) => setVisi(e.target.value)}
					className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					required
				></textarea>
			</div>
			<div className="mb-4">
				<label
					htmlFor="misi"
					className="block text-sm font-medium text-gray-700"
				>
					Misi
				</label>
				<textarea
					id="misi"
					value={misi}
					onChange={(e) => setMisi(e.target.value)}
					className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					required
				></textarea>
			</div>
			<div className="mb-4">
				<label
					htmlFor="motto"
					className="block text-sm font-medium text-gray-700"
				>
					motto
				</label>
				<input
					type="text"
					id="motto"
					value={motto}
					onChange={(e) => setMotto(e.target.value)}
					className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					required
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="progja"
					className="block text-sm font-medium text-gray-700"
				>
					Progja
				</label>
				<textarea
					id="progja"
					value={progja}
					onChange={(e) => setProgja(e.target.value)}
					className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					required
				></textarea>
			</div>
			<div className="mb-4">
				<label
					htmlFor="video_profil"
					className="block text-sm font-medium text-gray-700"
				>
					Video Profil URL
				</label>
				<input
					type="text"
					id="video_profil"
					value={videoProfil}
					onChange={(e) => setVideoProfil(e.target.value)}
					className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					required
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="video_profil"
					className="block text-sm font-medium text-gray-700"
				>
					candidate number
				</label>
				<input
					type="text"
					id="video_profil"
					value={number}
					onChange={(e) => setNumber(e.target.value)}
					className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					required
				/>
			</div>

			<button
				type="submit"
				className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none"
			>
				Submit
			</button>
		</form>
	);
};

export default function VoteSessionDetails() {
	const params = useParams();
	const voteId = params.id as string;

	const [voteSession, setVoteSession] = useState<any>(null);
	const [candidates, setCandidates] = useState<any[]>([]);

	useEffect(() => {
		if (voteId) {
			getVoteSession({ id: voteId as string }).then((data) =>
				setVoteSession(data)
			);
		}
		async function fetchCandidates() {
			const data = await findAllCandidates();
			setCandidates(data);
		}
		fetchCandidates();
	}, [voteId]);

	if (!voteSession) {
		return <div>Loading...</div>;
	}

	return (
		<div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
			<h2 className="text-3xl font-semibold mb-4">{voteSession.title}</h2>
			<p>
				<strong>Opened At:</strong>{" "}
				{new Date(voteSession.openedAt).toLocaleString()}
			</p>
			<p>
				<strong>Closed At:</strong>{" "}
				{new Date(voteSession.closedAt).toLocaleString()}
			</p>
			<p>
				<strong>Max Votes:</strong> {voteSession.max_vote}
			</p>
			<p>
				<strong>Is Public:</strong> {voteSession.isPublic ? "Yes" : "No"}
			</p>
			<p>
				<strong>Suborgan ID:</strong> {voteSession.suborgan_id}
			</p>
			{voteSession.suborgan && (
				<p>
					<strong>Suborgan Name:</strong> {voteSession.suborgan.name}
				</p>
			)}
			<div className="max-w-lg w-full mb-8">
				<h1 className="text-2xl font-bold text-center mb-4">
					Create Candidate
				</h1>
				<CandidateForm onSubmit={handleCreateCandidate} voteId={voteId} />
			</div>
		</div>
	);
}
