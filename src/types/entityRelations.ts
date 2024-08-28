import { Prisma } from "@prisma/client";

export type CandidateWithPengalaman = Prisma.CandidatesGetPayload<{
	include: { Pengalaman: true };
}>;
