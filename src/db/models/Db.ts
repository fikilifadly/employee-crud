import connection from "../config/mysql";

export default class Db {
	static async conn() {
		try {
			return await connection();
		} catch (error) {
			console.log(error, "=====conn====");
		}
	}
}
