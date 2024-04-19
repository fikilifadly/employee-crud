"use client";

import { Axios } from "@/app/helper";
import CustomTable from "@/components/CustomTable";
import React, { useEffect, useState } from "react";

const Page = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		Axios({
			method: "get",
			url: "/api/user",
		})
			.then((res) => setData(res.data))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, []);

	console.log(data, "<<<<<<<");
	return (
		<div>
			<h1 className="text-3xl font-bold mb-5">Home</h1>
			<CustomTable data={data} loading={loading} />
		</div>
	);
};

export default Page;
