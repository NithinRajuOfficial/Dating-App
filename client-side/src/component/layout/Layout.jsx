import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { showSuccess } from "../../utils/toastify";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export default function Layout() {
  const query = useQuery();
  useEffect(() => {
    const user = query.get("user");
    if (user) {
      try {
        const userData = JSON.parse(decodeURIComponent(user));

        localStorage.setItem("user", JSON.stringify(userData));
        showSuccess("Signup Successful")
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [query]);
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
}
