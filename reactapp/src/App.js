import React from "react";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	Outlet,
	RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import ChatGPT from "./components/Chatgpt";
import Moderation from "./components/Moderation";
import CreateImage from "./components/CreateImg";

export default function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<Root />}>
				<Route index path="/" element={<ChatGPT />} />
				<Route index path="/moderation" element={<Moderation />} />
			</Route>
		)
	);
	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
}

function Root() {
	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
				}}
			>
				<Navbar />
				<Outlet />
				{/* indicates where <Home/> should be rendered within <Root> */}
			</div>
		</>
	);
}
