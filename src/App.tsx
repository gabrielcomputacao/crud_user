import { useEffect, useMemo } from "react";
import { UserProvider } from "./context";
import { AppRoutes } from "./routes/Routes";

function App() {
  const dataUsersInLocalStorage = useMemo(() => {
    return {
      users: [
        {
          id: 1,
          nome: "Anderson",
          sobrenome: "Araujo Varejão",
          tipoUsuario: "Administrador",
          email: "usuario1@email.com.br",
          senha: "123445",
          ativo: true,
        },
        {
          id: 2,
          nome: "João",
          sobrenome: "Pedro Silva",
          tipoUsuario: "Administrador",
          email: "usuario2@email.com.br",
          senha: "123445",
          ativo: true,
        },
        {
          id: 3,
          nome: "Diane",
          sobrenome: "Pacheco",
          tipoUsuario: "Usuário padrão",
          email: "usuario3@email.com.br",
          senha: "123445",
          ativo: true,
        },
        {
          id: 4,
          nome: "Andreia",
          sobrenome: "Silveira Souza",
          tipoUsuario: "Usuário padrão",
          email: "usuario4@email.com.br",
          senha: "123445",
          ativo: false,
        },
        {
          id: 5,
          nome: "Camila",
          sobrenome: "Lindoso Cortez",
          tipoUsuario: "Usuário padrão",
          email: "usuario5@email.com.br",
          senha: "123445",
          ativo: true,
        },
        {
          id: 6,
          nome: "Antonio",
          sobrenome: "Neto da Silva Fernandes",
          tipoUsuario: "Administrador",
          email: "usuario6@email.com.br",
          senha: "123445",
          ativo: true,
        },
        {
          id: 7,
          nome: "Cleo",
          sobrenome: "Prado Douglas",
          tipoUsuario: "Usuário padrão",
          email: "usuario7@email.com.br",
          senha: "123445",
          ativo: false,
        },
        {
          id: 8,
          nome: "Maria1",
          sobrenome: "Clara Araujo Martins",
          tipoUsuario: "Usuário padrão",
          email: "usuario8@email.com.br",
          senha: "123445",
          ativo: false,
        },
        {
          id: "b2f19801-1560-4978-8456-785184794ad1",
          nome: "gabriel",
          senha: "12345678",
          tipoUsuario: "Administrador",
          email: "teste@com.tes",
          sobrenome: "bingo",
          ativo: true,
        },
      ],
    };
  }, []);

  useEffect(() => {
    const users = localStorage.getItem("usersLocalStorage");
    if (users === null) {
      localStorage.setItem(
        "usersLocalStorage",
        JSON.stringify(dataUsersInLocalStorage)
      );
    }
  }, [dataUsersInLocalStorage]);

  return (
    <>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </>
  );
}

export default App;
