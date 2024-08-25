import { Outlet } from "react-router-dom";
import ComplexNavbar from "./Navbar";

export default function Layout() {
  return (
    <main>
      <ComplexNavbar />
      <Outlet />
    </main>
  );
}
