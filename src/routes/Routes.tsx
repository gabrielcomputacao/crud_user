import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Home } from "../pages/Home";
import { RegisterUser } from "../pages/RegisterUser";
import { Search } from "../pages/Search";
import { Profile } from "../pages/Profile";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <ProtectedRoutes>
              <Login />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoutes>
              <RegisterUser />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoutes>
              <Search />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
