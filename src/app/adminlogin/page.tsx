"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";

import { FormButton } from "../components/general/button";
import { TextField } from "../components/general/Input";
import { H2, Large_Text, Small_Text } from "../components/general/Text";

export default function AdminLoginPage() {
	const [error, setError] = useState<string | null>("");
	const { status } = useSession();
	const [formValues, setFormValues] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	if (status === "authenticated") return redirect("/");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			const res = await signIn("credentials", {
				redirect: false,
				callbackUrl: "/admin",
				...formValues,
			});

			if (res?.error) {
				setError(
					res.error == "CredentialsSignin"
						? "Wrong Username / Password"
						: "Internal server error"
				);
			}
		} catch (error) {
			setError("Something went wrong");
		}
	};

	return (
		<main className="px-4 lg:px-20">
			<div className="w-full h-full my-20 z-20 relative">
				<form onSubmit={handleSubmit}>
					<div className="bg-white max-w-[624px] w-full py-[72px] md:py-[92px] px-[24px] md:px-[88px] flex-col items-center mx-auto shadow-shadow-2">
						<H2 className="text-center text-primary-text-color">
							Yuk Login Untuk Pantau Kegiatan Voting
						</H2>
						<Large_Text
							variant="REGULAR"
							className="text-secondary-text-color text-center mt-2 mb-8"
						>
							Jangan lupa login menggunakan akun yang telah diberikan oleh
							developer ya..
						</Large_Text>
						<TextField
							handleChange={handleChange}
							placeholder="Masukkan Email Anda"
							type="email"
							name="email"
							required
						/>
						<TextField
							handleChange={handleChange}
							placeholder="Masukkan Password Anda"
							type="password"
							name="password"
							required
						/>
						<FormButton
							type="submit"
							variant="PRIMARY"
							className="flex items-center gap-x-4 w-full justify-center group"
						>
							<Large_Text variant="BOLD">Login</Large_Text>
						</FormButton>
						{error && (
							<Small_Text variant="MEDIUM" className="text-red-500 mt-4">
								{error}
							</Small_Text>
						)}
					</div>
				</form>
			</div>
		</main>
	);
}
