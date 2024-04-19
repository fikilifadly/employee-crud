import User from "@/db/models/User";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const POST = async (req: Request) => {
	try {
		const body = await req.json();

		const data = await User.register(body);

		if (data !== "Register Success") throw data;

		return NextResponse.json({ message: data }, { status: 201 });
	} catch (error) {
		console.log(error, "=============== error");
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
			if (error.message === "Username Already Registered")
				return NextResponse.json(
					{
						message: error.message,
					},
					{ status: 400 }
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
