import { Box, Button, Container, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { userAuthentication } from "../../../presenter/userAuthentication";
import { useUsers } from "../../context/userContext";
import { objectLengthVerification } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import { Message } from "../../components/Message";
import PeopleIcon from "@mui/icons-material/People";
import { User } from "../../models";
import { Loading } from "../../components/Loading";

export type InputsForm = {
  user: string;
  password: string;
};

export function Login() {
  const {
    handleSetIsUserActive,
    handleSetObjectMessage,
    handleSetUserActive,
    handleSetIsLoading,
    objectMessage,
    isLoading,
  } = useUsers();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsForm>();

  const onSubmit = (data: InputsForm) => {
    handleSetIsLoading(true);
    userAuthentication(data)
      .then((valueUserActive) => {
        const isValueUserActive = objectLengthVerification(valueUserActive);

        handleSetIsUserActive(isValueUserActive);

        if (isValueUserActive) {
          handleSetUserActive(valueUserActive);
          localStorage.setItem(
            "userActive",
            JSON.stringify({
              ...valueUserActive,
            })
          );
          navigate("/home");
        } else {
          handleSetObjectMessage({
            status: "error",
            text: "Usuário ou senha incorretos.",
            page: "login",
          });
        }
      })
      .catch((error) => {
        const usersLocal = localStorage.getItem("usersLocalStorage");

        if (usersLocal) {
          const dataUsers = JSON.parse(usersLocal);

          if (dataUsers && Array.isArray(dataUsers.users)) {
            const dataArray: Array<User> = dataUsers.users;

            if (dataArray.length > 0) {
              const userVerification = dataArray.find(
                (value: User) =>
                  value.senha === data.password && value.nome === data.user
              );

              if (userVerification) {
                const newUserActive = {
                  ...userVerification,
                };

                localStorage.setItem(
                  "userActive",
                  JSON.stringify(newUserActive)
                );

                const newDataArray = dataArray.map((value) => {
                  return value === userVerification ? newUserActive : value;
                });

                localStorage.setItem(
                  "usersLocalStorage",
                  JSON.stringify({ users: newDataArray })
                );

                handleSetIsUserActive(true);
                handleSetUserActive(newUserActive);
                navigate("/home");
              } else {
                handleSetObjectMessage({
                  status: "error",
                  text: "Usuário ou senha incorretos.",
                  page: "login",
                });
              }
            }
          }
        } else {
          handleSetObjectMessage({
            status: "error",
            text: error.message,
            page: "login",
          });
        }
      })
      .finally(() => {
        handleSetIsLoading(false);
      });
  };

  return (
    <div style={{ backgroundColor: "#f58056" }}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {isLoading && <Loading />}
        {objectMessage?.page === "login" && <Message />}
        <Box
          width={400}
          height={400}
          display="flex"
          flexDirection="column"
          border="1px solid #333"
          borderRadius={2}
          gap={5}
          padding={5}
          bgcolor="white"
          sx={{
            "@media (max-width: 450px)": {
              width: "auto",
            },
          }}
        >
          <Box>
            <Box
              width="100%"
              sx={{
                "@media (max-width: 450px)": {
                  width: "auto",
                },
                display: "flex",
                justifyContent: "center",
              }}
            >
              <PeopleIcon sx={{ width: "100px", height: "100px" }} />
            </Box>
          </Box>
          <TextField
            data-testid="usuario"
            id="usuario"
            error={errors.user ? true : false}
            variant="outlined"
            {...register("user", { required: true })}
            label="Nome"
            helperText={errors.user ? "Esse campo não pode estar vazio." : ""}
          />

          <TextField
            data-testid="password"
            id="password"
            variant="outlined"
            {...register("password", { required: true })}
            label="Senha"
            type="password"
            error={errors.password ? true : false}
            helperText={
              errors.password
                ? "Esse campo não pode ter menor que 8 caracteres."
                : ""
            }
          />
          <Button
            variant="contained"
            sx={{ bgcolor: "#f58056" }}
            onClick={handleSubmit(onSubmit)}
          >
            Entrar
          </Button>
        </Box>
      </Container>
    </div>
  );
}
