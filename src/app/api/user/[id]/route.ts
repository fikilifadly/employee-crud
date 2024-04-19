import User from "@/db/models/User";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
	try {
		const { id } = params;

		const data = await User.getUserById(id);

		return NextResponse.json(data);
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({
				message: error.message,
			});
		}

		return NextResponse.json({
			message: `Internal Server Error`,
		});
	}
};

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
	try {
		const { id } = params;
		const body = await req.json();

		const data = await User.updateUser(id, body);

		return NextResponse.json(data);
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({
				message: error.message,
			});
		}

		return NextResponse.json({
			message: `Internal Server Error`,
		});
	}
};

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
	try {
		const { id } = params;

		const data = await User.deleteUser(id);

		return NextResponse.json(data);
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({
				message: error.message,
			});
		}

		return NextResponse.json({
			message: `Internal Server Error`,
		});
	}
};
