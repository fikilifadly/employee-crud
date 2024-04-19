"use client";
import { Axios } from "@/app/helper";
import { Input } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";

const CustomForm = ({ fields, url, method, type, successpath, title }: { title: string; fields: Input[]; url: string; method: string; successpath: string; type: string }) => {
	const [inputs, setInputs] = useState({});
	const [loading, setLoading] = useState(false);
	const [capVal, setCapVal] = useState(null);

	const wrapper = `flex flex-col gap-3 p-5`;
	const router = useRouter();

	const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(inputs);

		setLoading(true);
		Axios({
			method,
			url,
			data: JSON.stringify(inputs),
		})
			.then((res) => {
				toast.success(res.data.message);
				router.push(successpath);
			})
			.catch((error) => toast.error(error.response.data.message))
			.finally(() => setLoading(false));
	};

	const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.name);
		setInputs((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	return (
		<>
			<h1 className="text-center text-2xl  font-bold">{title}</h1>
			<form className={wrapper} onSubmit={submitHandler}>
				{fields.map((field, index) => (
					<div key={index} className="flex flex-col gap-2 w-full">
						<label htmlFor={field.type}>{field.placeholder}</label>
						<input
							type={field.type}
							name={field.placeholder}
							id={field.type}
							onChange={inputHandler}
							className="w-full p-2 rounded-md shadow-md border border-slate-200"
							defaultValue={field.value && field.value}
						/>
					</div>
				))}
				{/* <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_R_SITE_KEY as string} onChange={(val) => setCapVal(val)} /> */}
				<button className="btn bg-green-500 mt-5 text-white shadow-md transition-all duration-100 hover:text-green-500 hover:bg-white " disabled={loading ? true : false}>
					{loading ? <span className="loading loading-spinner loading-sm"></span> : "Submit"}
				</button>
				{type === "logres" && successpath == "/login" && (
					<p className="text-center">
						Already have an account?{" "}
						<Link href="/login" className="text-green-500">
							Login
						</Link>
					</p>
				)}
				{type === "logres" && successpath != "/login" && (
					<p className="text-center">
						Doesnt have an account?{" "}
						<Link href="/register" className="text-green-500">
							Register
						</Link>
					</p>
				)}
			</form>
		</>
	);
};

export default CustomForm;
