import User from "@/db/models/User";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const POST = async (req: Request) => {
	try {
		const body = await req.json();

		const data = await User.login(body);

		if (data !== "Login Success") throw data;

		return NextResponse.json({ message: "Login Success" }, { status: 200 });
	} catch (error) {
		if (error instanceof ZodError) {
			const errPath = error.issues[0].path[0];
			const { message } = error.issues[0];
			return NextResponse.json(
				{
					message: `${errPath} ${message}`,
				},
				{ status: 400 }
			);
		}

		if (error instanceof Error) {
			if (error.message === "Login Gagal")
				return NextResponse.json(
					{
						message: "Login Gagal",
					},
					{ status: 401 }
				);
		}

		return NextResponse.json(
			{
				message: `Internal Server Error`,
			},
			{ status: 500 }
		);
	}
};
