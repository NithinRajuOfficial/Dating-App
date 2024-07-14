import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../component/layout/Layout";
import Signup from "../component/layout/Signup";
import Login from "../component/layout/Login";
import Profile from "../component/layout/Profile";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  )
);
