import PropTypes from "prop-types";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Login from "./pages/login/login";
import UserRegister from "./pages/Register";
import DashHome from "./pages/DashHome/index";
import isValidToken from "./functions/isValidToken";

function ProtectedRoutes({ redirectTo }) {
  const token = localStorage.getItem("token");
  const isAuthenticated = token && isValidToken(token);

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}

ProtectedRoutes.propTypes = {
  redirectTo: PropTypes.string.isRequired,
};

function HomeRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<Navigate to={"/login"} />} />
      <Route path="/register" element={<UserRegister />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoutes redirectTo="/login" />}>
        <Route path="/home" element={<DashHome />} />
      </Route>
    </Routes>
  );
}

export default HomeRoutes;
