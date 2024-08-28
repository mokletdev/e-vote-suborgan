"use client";

import { useState } from "react";
import { handleCreateVoteSession } from "@/utils/actions/vote";
export default function CreateVoteSessionForm() {
	const [title, setTitle] = useState("");
	const [openedAt, setOpenedAt] = useState("");
	const [closedAt, setClosedAt] = useState("");
	const [isPublic, setIsPublic] = useState(false);
	const [maxVote, setMaxVote] = useState(1);
	const [suborganId, setSuborganId] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Convert to ISO-8601 format by adding the timezone offset
		const openedAtISO = new Date(openedAt).toISOString();
		const closedAtISO = new Date(closedAt).toISOString();

		const formData = new FormData();
		formData.append("title", title);
		formData.append("openedAt", openedAtISO);
		formData.append("closedAt", closedAtISO);
		formData.append("isPublic", isPublic.toString());
		formData.append("max_vote", maxVote.toString());
		formData.append("suborgan_id", suborganId);
		console.log(formData);

		await handleCreateVoteSession(formData);

		// Reset the form or provide feedback
		setTitle("");
		setOpenedAt("");
		setClosedAt("");
		setIsPublic(false);
		setMaxVote(1);
		setSuborganId("");
	};

	return (
		<div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
			<h2 className="text-2xl font-semibold mb-4">Create Vote Session</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label
						htmlFor="title"
						className="block text-sm font-medium text-gray-700"
					>
						Title
					</label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>

				<div>
					<label
						htmlFor="openedAt"
						className="block text-sm font-medium text-gray-700"
					>
						Opened At
					</label>
					<input
						type="datetime-local"
						id="openedAt"
						value={openedAt}
						onChange={(e) => setOpenedAt(e.target.value)}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>

				<div>
					<label
						htmlFor="closedAt"
						className="block text-sm font-medium text-gray-700"
					>
						Closed At
					</label>
					<input
						type="datetime-local"
						id="closedAt"
						value={closedAt}
						onChange={(e) => setClosedAt(e.target.value)}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>

				<div>
					<label
						htmlFor="isPublic"
						className="block text-sm font-medium text-gray-700"
					>
						Is Public
					</label>
					<select
						id="isPublic"
						value={isPublic.toString()}
						onChange={(e) => setIsPublic(e.target.value === "true")}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					>
						<option value="true">Yes</option>
						<option value="false">No</option>
					</select>
				</div>

				<div>
					<label
						htmlFor="maxVote"
						className="block text-sm font-medium text-gray-700"
					>
						Max Vote
					</label>
					<input
						type="number"
						id="maxVote"
						value={maxVote}
						onChange={(e) => setMaxVote(Number(e.target.value))}
						min={1}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>

				<div>
					<label
						htmlFor="suborganId"
						className="block text-sm font-medium text-gray-700"
					>
						Suborgan ID
					</label>
					<input
						type="text"
						id="suborganId"
						value={suborganId}
						onChange={(e) => setSuborganId(e.target.value)}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>

				<div>
					<button
						type="submit"
						className="w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						Create Vote Session
					</button>
				</div>
			</form>
		</div>
	);
}
