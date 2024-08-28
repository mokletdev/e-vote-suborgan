"use server";

import { findAllCandidatesByVoteSession } from "@/utils/database/candidates.query";
import SectionsGap from "@/app/components/general/SectionsGap";
import VotePage from "../_component/VotePage";
import Navbar from "../../../components/general/Navbar";
import Footer from "../../../components/general/Footer";

interface PageProps {
	params: { id: string };
}

const Page = async ({ params }: PageProps) => {
	const voteSessionId = params.id;
	const candidates = await findAllCandidatesByVoteSession(voteSessionId);

	return (
		<div>
			<Navbar />
			<SectionsGap>
				<VotePage candidates={candidates} voteId={voteSessionId} />
			</SectionsGap>
			<Footer />
		</div>
	);
};

export default Page;
