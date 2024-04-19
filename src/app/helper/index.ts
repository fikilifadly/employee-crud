import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as jose from "jose";
import axios from "axios";
import { cookies } from "next/headers";

export const hashPass = (password: string) => {
	const salt = bcrypt.genSaltSync(20);
	let hash = bcrypt.hashSync(password, salt).replace("$2a$20$", "");
	return hash;
};

export const comparePass = (password: string, hashPassword: string) => {
	return bcrypt.compareSync(password, hashPassword);
};

export const signToken = (payload: JwtPayload) => {
	return jwt.sign(payload, process.env.NEXT_PUBLIC_SECRET as string);
};

export const verifyToken = (token: string) => {
	return jwt.verify(token, process.env.NEXT_PUBLIC_SECRET as string);
};

export const dateFormat = (date: string) => {
	return new Date(date).toLocaleDateString("en-GB");
};

export const Axios = axios.create({
	baseURL: "http://localhost:3000",
	headers: {
		"content-type": "application/json",
	},
});
