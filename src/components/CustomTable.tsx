import { Axios, dateFormat } from "@/app/helper";
import { UserDb } from "@/types";
import Link from "next/link";
import React, { ButtonHTMLAttributes, MouseEventHandler, useState } from "react";
import CustomModal from "./CustomModal";
import CustomForm from "./CustomForm";
import toast from "react-hot-toast";

const CustomTable = ({ data, loading }: { data: UserDb[]; loading: boolean }) => {
	const [modalData, setModalData] = useState({ title: "", id: "", Username: "", Password: "" });

	const deleteHandler = (id: number) => {
		Axios({
			method: "delete",
			url: `/api/user/${id}`,
		})
			.then(() => toast.success("Delete Success"))
			.catch(() => toast.error("Delete Failed"))
			.finally(() => setModalData({ title: "", id: "", Username: "", Password: "" }));
	};

	return (
		<>
			<div className="overflow-x-auto">
				{loading ? (
					<div className="w-full h-[500px] flex justify-center items-center">
						<span className="loading loading-spinner  w-[200px] h-[200px]"></span>
					</div>
				) : (
					<table className="table table-zebra">
						{/* head */}
						<thead>
							<tr className="text-center">
								<th>No</th>
								<th>Nama</th>
								<th>Password</th>
								<th>Ctime</th>
								<th>Fungsi</th>
							</tr>
						</thead>
						<tbody>
							{data.length == 0 ? (
								<tr className="text-center">
									<td className="font-bold text-2xl">Tidak Ada Data</td>
								</tr>
							) : (
								data.map((user, index) => {
									return (
										<tr key={index} className="text-center">
											<th>{index + 1}</th>
											<td>{user.Username}</td>
											<td>xxxxx</td>
											<td>{dateFormat(user.CreateTime.toString())}</td>
											<td className="flex gap-2 justify-center">
												<button
													className="btn btn-warning"
													data-id={user.Id}
													onClick={(event) => {
														console.log(event);
														const [_, id] = event.target.attributes;
														const modal = document.getElementById("my_modal_1") as HTMLFormElement;
														modal?.showModal();

														Axios({
															method: "get",
															url: `/api/user/${id.value}`,
														})
															.then((res) => setModalData(res.data))
															.catch((err) => toast.error(err.response.data.message));
													}}
												>
													Edit
												</button>
												<button className="btn bg-red-500" onClick={() => deleteHandler(user.Id)}>
													Delete
												</button>
											</td>
										</tr>
									);
								})
							)}
						</tbody>
					</table>
				)}
				<CustomModal>
					<CustomForm
						title="Edit User"
						method="PUT"
						type=""
						successpath="/home"
						url={`/api/user/${modalData.id}`}
						fields={[
							{ type: "text", placeholder: "Username" },
							{ type: "text", placeholder: "Password" },
						]}
					/>
				</CustomModal>
			</div>
		</>
	);
};

export default CustomTable;
