import { Login } from "../pages/Login";

interface IProtectedRoutes {
  children: React.ReactNode;
}

export function ProtectedRoutes({ children }: IProtectedRoutes) {
  const isUserActive = localStorage.getItem("userActive");

  return isUserActive ? children : <Login />;
}
