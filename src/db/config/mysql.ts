import mysql, { ConnectionOptions } from "mysql2/promise";

const access: ConnectionOptions = {
	host: process.env.NEXT_PUBLIC_MYSQL_HOST,
	user: process.env.NEXT_PUBLIC_MYSQL_USER,
	password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
	// port: process.env.NEXT_PUBLIC_MYSQL_PORT,
	database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
};

const connection = async () => {
	try {
		const conn = await mysql.createConnection(access);

		return conn;
	} catch (error) {
		console.log(error, "=====conn====");
	}
};

export default connection;
