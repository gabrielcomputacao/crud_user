import { createContext, useState } from "react";
import { User } from "../models";
import { IMessages } from "../components/Message";

export interface IUserContext {
  user: User;
  isUserActive: boolean;
  objectMessage?: IMessages;
  isLoading: boolean;
  handleSetUserActive: (user: User) => void;
  handleSetObjectMessage: (user: IMessages | undefined) => void;
  handleSetIsUserActive: (value: boolean) => void;
  handleSetIsLoading: (value: boolean) => void;
}

interface IUserProvider {
  children: React.ReactNode;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export function UserProvider({ children }: IUserProvider) {
  const [userActive, setUserActive] = useState<User>(() => {
    const userLocalStorage = localStorage.getItem("userActive");
    if (userLocalStorage) {
      const userActiveLocal: User = JSON.parse(userLocalStorage);
      return userActiveLocal;
    }
    return {} as User;
  });
  const [objectMessage, setObjectMessagee] = useState<IMessages | undefined>(
    undefined
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUserActive, setIsUserActive] = useState<boolean>(false);

  function handleSetUserActive(user: User) {
    setUserActive(user);
  }

  function handleSetIsUserActive(value: boolean) {
    setIsUserActive(value);
  }
  function handleSetIsLoading(value: boolean) {
    setIsLoading(value);
  }
  function handleSetObjectMessage(value: IMessages | undefined) {
    setObjectMessagee(value);
  }

  return (
    <UserContext.Provider
      value={{
        user: userActive,
        objectMessage,
        isUserActive,
        isLoading,
        handleSetUserActive,
        handleSetObjectMessage,
        handleSetIsUserActive,
        handleSetIsLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
