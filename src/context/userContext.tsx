import { useContext } from "react";
import { IUserContext, UserContext } from ".";

export function useUsers(): IUserContext {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUsers não pode ser usado nesse contexto");
  }

  return context;
}
