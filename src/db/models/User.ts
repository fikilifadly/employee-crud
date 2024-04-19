import { comparePass, hashPass, signToken } from "@/app/helper";
import { z } from "zod";
import connection from "../config/mysql";
import { cookies } from "next/headers";
import { UserType } from "@/types";
import Db from "./Db";

const userValidation = z.object({
	Username: z
		.string({
			required_error: "Username Tidak Boleh Kosong",
		})
		.min(1, {
			message: "Nama tidak boleh kosong",
		}),
	Password: z
		.string()
		.min(5, {
			message: "Password minimal 5 karakter",
		})
		.max(8, {
			message: "Password maksimal 8 karakter",
		}),
});

const userLoginValidation = z.object({
	Username: z
		.string({
			required_error: "Tidak Boleh Kosong",
		})
		.min(1, {
			message: "Username Login tidak boleh kosong",
		}),
	Password: z.string().min(1, {
		message: "Password Login tidak boleh kosong",
	}),
});

export default class User {
	static async register(user: UserType) {
		try {
			console.log(user, "====");
			if (!user.Username || !user.Password) throw new Error("Register Gagal");
			const validation = userValidation.safeParse(user);

			if (!validation.success) throw validation.error;

			user = {
				...user,
				Password: hashPass(user.Password),
			};

			const conn: any = await Db.conn();
			const [data] = await conn.query(`SELECT * FROM tbl_user WHERE Username = '${user.Username}'`);

			if (data.length > 0) throw new Error("Username Already Registered");

			await conn.query(`INSERT INTO tbl_user (Username, Password) VALUES ('${user.Username}', '${user.Password}')`);

			return "Register Success";
		} catch (error) {
			throw error;
		}
	}

	static async login(user: UserType) {
		try {
			console.log(user, "====login");
			const validation = userLoginValidation.safeParse(user);

			if (!validation.success) throw validation.error;
			console.log("masuk", new Date());
			const conn: any = await Db.conn();
			console.log("masuk  2", new Date());
			let [data] = await conn.query(`SELECT * FROM tbl_user WHERE Username = '${user.Username}'`);
			console.log("masuk  3", new Date());
			if (data.length == 0) throw new Error("Login Gagal");

			const Password = "$2a$20$" + data[0].Password;

			const isMatch = comparePass(user.Password, Password);
			console.log(isMatch, "=======", data);

			if (!isMatch) throw new Error("Login Gagal");

			const access_token = signToken({ id: data.id });

			cookies().set("Authorization", access_token);

			return "Login Success";
		} catch (error) {
			throw error;
		}
	}

	static async getUsers() {
		try {
			const conn: any = await Db.conn();

			const [data] = await conn.query(`SELECT * FROM tbl_user`);
			console.log(data, "========= get users");

			return data;
		} catch (error) {
			throw error;
		}
	}

	static async getUserById(id: string) {
		try {
			const conn: any = await Db.conn();
			const [data] = await conn.query(`SELECT * FROM tbl_user WHERE id = '${id}'`);

			if (data.length == 0) throw new Error("User not found");

			return data;
		} catch (err) {
			throw err;
		}
	}

	static async updateUser(id: string, user: UserType) {
		try {
			console.log("masuk");
			const conn: any = await Db.conn();

			const user = await this.getUserById(id);

			console.log(user, " ----------");

			if (user.length == 0) throw new Error("User not found");

			console.log("first");

			const validation = userValidation.safeParse(user);

			if (!validation.success) throw validation.error;

			await conn.query(`UPDATE tbl_user SET Username = '${user.Username}', Password = '${user.Password}' WHERE id = '${id}'`);

			return "User updated";
		} catch (err) {
			throw err;
		}
	}

	static async deleteUser(id: string) {
		try {
			const conn: any = await Db.conn();

			const user = await this.getUserById(id);
			if (user.length == 0) throw new Error("User not found");

			await conn.query(`DELETE FROM tbl_user WHERE id = '${id}'`);

			return "User deleted";
		} catch (err) {
			throw err;
		}
	}
}
