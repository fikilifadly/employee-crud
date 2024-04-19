import User from "@/db/models/User";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
	try {
		const data = await User.getUsers();

		console.log(data, "=========");

		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json(
			{
				message: `Internal Server Error`,
			},
			{ status: 500 }
		);
	}
};
