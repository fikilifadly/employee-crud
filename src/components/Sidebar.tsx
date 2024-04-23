"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
	const path = usePathname();

	const activeLink = (link: string) => {
		if (path == link) return "text-green-500";
	};

	return (
		<header className="sticky top-0 left-0 h-screen bg-white p-10 flex flex-col gap-7 w-full">
			<h2 className="font-bold text-2xl">Users CMS</h2>
			<nav className="flex flex-col h-full justify-between">
				<ul className="flex flex-col gap-4">
					<li>
						<Link href="/home" className={activeLink("/home")}>
							Home
						</Link>
					</li>
					<li>
						<Link href="/add" className={activeLink("/add")}>
							Add User
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Sidebar;
