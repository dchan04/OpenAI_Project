import "./Navbar.css";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { Link } from "react-router-dom";
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
            <Link exact to="/Chatgpt" activeClassName="activeClicked">
              <CDBSidebarMenuItem>OpenGPT</CDBSidebarMenuItem>
            </Link>
            <Link exact to="/tables" activeClassName="activeClicked">
              <CDBSidebarMenuItem>Chat Completition</CDBSidebarMenuItem>
            </Link>
            <Link exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem>Moderation</CDBSidebarMenuItem>
            </Link>
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
