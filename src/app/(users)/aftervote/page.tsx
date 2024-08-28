"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import DoubleVote from "@/../public/images/DoubleVoteIcon.png";
import NotFoundIcon from "@/../public/images/NotFoundIcon.png";
import { H1, Large_Text } from "@/app/components/general/Text";

export default function RejectedDoubleVote() {
	useEffect(() => {
		const timer = setTimeout(() => {
			signOut({ callbackUrl: "/login", redirect: false });
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="bg-red-light-6 w-full h-screen flex items-center justify-center py-10">
			<div className="bg-white w-full max-w-[1050px] mx-4 h-auto rounded-[15px] flex flex-col items-center text-center shadow-md p-4">
				<div className="w-full mt-10 md:mx-[85px]">
					<H1>
						Terima Kasih
						<br />
						Telah Melakukan Voting
					</H1>
					<Large_Text
						variant="REGULAR"
						className="text-secondary-text-color mt-[18px]"
					>
						Setelah selesai melakukan voting, akan dilakukan auto log out
					</Large_Text>
				</div>
			</div>
		</div>
	);
}

// "use client";

// import React, { useEffect } from 'react';
// import { H1, Medium_Text } from "@/app/components/general/Text";

// export default function ThankYouPage() {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       console.log("Auto log out dilakukan");
//       // window.location.href = "/login";
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#FDF7F7] px-4 py-8">
//       <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-sm sm:max-w-md w-full text-center space-y-4 sm:space-y-6">
//         <H1 className="text-[#C1121F] text-xl sm:text-3xl md:text-3xl lg:text-4xl">
//           Terima Kasih
//         </H1>
//         <H1 className="text-[#C1121F] text-xl sm:text-2xl md:text-3xl lg:text-3xl">
//           Telah Melakukan Voting
//         </H1>
//         <Medium_Text variant="REGULAR" className="text-gray-600 text-sm sm:text-base lg:text-1xl">
//           Setelah selesai melakukan voting, akan dilakukan auto log out
//         </Medium_Text>
//       </div>
//     </div>
//   );
// }
