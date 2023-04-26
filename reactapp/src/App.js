import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import ChatGPT from "./components/Chatgpt";
import ChatCompletion from "./components/ChatCompletion";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index path="Chatgpt" element={<ChatGPT />} />
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
      <Navbar />
      <Outlet />
      {/* indicates where <Home/> should be rendered within <Root> */}
    </>
  );
}
