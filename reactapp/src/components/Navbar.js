import "./Navbar.css";
import {
	CDBIcon,
	CDBSidebar,
	CDBSidebarContent,
	CDBSidebarFooter,
	CDBSidebarHeader,
	CDBSidebarMenu,
	CDBSidebarMenuItem,
} from "cdbreact";
import * as Icon from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";
export default function Navbar() {
	return (
		<div
			style={{
				display: "flex",
				height: "100vh",
				overflow: "scroll initial",
			}}
		>
			<CDBSidebar textColor="#fff" backgroundColor="var(--bs-body-color)">
				<CDBSidebarHeader prefix={<CDBIcon icon="bars" size="lg" />}>
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
							<CDBSidebarMenuItem icon="robot">
								ChatGPT
							</CDBSidebarMenuItem>
						</NavLink>
						<NavLink
							to="/moderation"
							className={(navData) =>
								navData.isActive ? "activeClicked" : "none"
							}
						>
							<CDBSidebarMenuItem icon="user">
								Moderation AI
							</CDBSidebarMenuItem>
						</NavLink>
					</CDBSidebarMenu>
				</CDBSidebarContent>

				<CDBSidebarFooter style={{ textAlign: "center" }}>
					<div
						style={{
							padding: "10px 5px",
						}}
					>
						<div
							style={{
								padding: "5px 5px",
							}}
						>
							Developed By Darren Chan{" "}
						</div>
						<a
							target="_blank"
							rel="noreferrer"
							href="https://github.com/dchan04"
						>
							<Icon.Github width={25} height={25} />
						</a>
					</div>
				</CDBSidebarFooter>
			</CDBSidebar>
		</div>
	);
}
