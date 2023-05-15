import "./Navbar.css";
import {
	CDBSidebar,
	CDBSidebarContent,
	CDBSidebarFooter,
	CDBSidebarHeader,
	CDBSidebarMenu,
	CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
export default function Navbar() {
	return (
		<div
			style={{
				position: "absolute",
				height: "100vh",
				overflow: "scroll initial",
			}}
		>
			<CDBSidebar textColor="#fff" backgroundColor="var(--bs-body-color)">
				<CDBSidebarHeader>
					<a
						href="/"
						className="text-decoration-none"
						style={{ color: "inherit" }}
					>
						OpenAI App
					</a>
				</CDBSidebarHeader>

				<CDBSidebarContent className="sidebar-content">
					<CDBSidebarMenu>
						<NavLink
							to="/"
							className={(navData) =>
								navData.isActive ? "activeClicked" : "none"
							}
						>
							<CDBSidebarMenuItem>ChatGPT</CDBSidebarMenuItem>
						</NavLink>
						<NavLink
							to="/createImg"
							className={(navData) =>
								navData.isActive ? "activeClicked" : "none"
							}
						>
							<CDBSidebarMenuItem>
								Create Image
							</CDBSidebarMenuItem>
						</NavLink>
						<NavLink
							to="/moderation"
							className={(navData) =>
								navData.isActive ? "activeClicked" : "none"
							}
						>
							<CDBSidebarMenuItem>
								Moderation AI
							</CDBSidebarMenuItem>
						</NavLink>
					</CDBSidebarMenu>
				</CDBSidebarContent>

				<CDBSidebarFooter style={{ textAlign: "center" }}>
					<div
						style={{
							padding: "20px 5px",
						}}
					>
						Made By Darren Chan
					</div>
				</CDBSidebarFooter>
			</CDBSidebar>
		</div>
	);
}
