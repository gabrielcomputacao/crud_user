import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { Header } from "../../components/Header";
import { useForm } from "react-hook-form";
import { registerUser } from "../../../presenter/registerUser";
import styles from "./register.module.css";
import { User } from "../../models";
import { useUsers } from "../../context/userContext";
import { Message } from "../../components/Message";

import { compareSimilarUsersInLocalStorage } from "../../utils/functions";
import { Loading } from "../../components/Loading";
import { useState } from "react";

export interface IRegisterUser {
  id?: string;
  password: string;
  user: string;
  profile: "Administrador" | "Usuário padrão";
  email: string;
  sobrenome: string;
}

export function RegisterUser() {
  const [status, setStatus] = useState("inativo");

  function handleSetStatus(event: React.ChangeEvent<HTMLInputElement>) {
    setStatus((event.target as HTMLInputElement).value);
  }

  const {
    handleSetObjectMessage,
    objectMessage,
    isLoading,
    handleSetIsLoading,
  } = useUsers();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterUser>({});

  function onSubmit(data: IRegisterUser) {
    handleSetIsLoading(true);

    const dataUser: User = {
      id: crypto.randomUUID(),
      nome: data.user,
      senha: data.password,
      tipoUsuario: data.profile,
      email: data.email,
      sobrenome: data.sobrenome,
      ativo: status === "inativo" ? false : true,
    };

    registerUser(dataUser)
      .then(() => {
        handleSetObjectMessage({
          status: "success",
          text: "Usuário cadastrado com sucesso!",
          page: "register",
        });
      })
      .catch((error) => {
        const usersLocal = localStorage.getItem("usersLocalStorage");

        if (usersLocal) {
          const dataUsers = JSON.parse(usersLocal);

          if (dataUsers && Array.isArray(dataUsers.users)) {
            const dataArray: Array<User> = dataUsers.users;

            if (dataArray.length > 0) {
              const isUserInValid = compareSimilarUsersInLocalStorage(
                dataArray,
                dataUser
              );

              if (isUserInValid) {
                handleSetObjectMessage({
                  status: "error",
                  text: "Já existe um usuário com esse nome.",
                  page: "register",
                });
                return;
              }

              const newDataArrayUsers = [...dataArray, dataUser];

              localStorage.setItem(
                "usersLocalStorage",
                JSON.stringify({ users: newDataArrayUsers })
              );

              handleSetObjectMessage({
                status: "success",
                text: "Usuário cadastrado com sucesso!",
                page: "register",
              });
            }
          }
        } else {
          handleSetObjectMessage({
            status: "error",
            text: error.message,
            page: "register",
          });
        }
      })
      .finally(() => {
        handleSetIsLoading(false);
      });
  }

  return (
    <Box>
      <Header />
      <Container
        sx={{
          padding: "20px 0",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {isLoading && <Loading />}
        {objectMessage?.page === "register" && <Message />}
        <Box
          width={400}
          minHeight={400}
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
          <h2 className={styles.title}>Cadastrar Usuário</h2>
          <form
            className={styles.containerForm}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              {...register("user", { required: true })}
              label="Usuário"
              variant="outlined"
              data-testid="userRegister"
              fullWidth
              error={errors.user ? true : false}
              helperText={errors.user ? "Esse campo não pode estar vazio." : ""}
            />
            <TextField
              {...register("sobrenome", { required: true })}
              label="Sobrenome"
              variant="outlined"
              data-testid="userRegister"
              fullWidth
              error={errors.user ? true : false}
              helperText={errors.user ? "Esse campo não pode estar vazio." : ""}
            />
            <TextField
              {...register("email", { required: true })}
              label="Email"
              variant="outlined"
              data-testid="userRegister"
              fullWidth
              error={errors.user ? true : false}
              helperText={errors.user ? "Esse campo não pode estar vazio." : ""}
            />
            <TextField
              data-testid="passwordRegister"
              {...register("password", { required: true, minLength: 8 })}
              label="Senha"
              variant="outlined"
              fullWidth
              type="password"
              error={errors.password ? true : false}
              helperText={
                errors.password
                  ? "Esse campo não pode ter menos que 8 caracteres."
                  : ""
              }
            />

            <FormControl fullWidth>
              <InputLabel>Perfil</InputLabel>
              <Select
                {...register("profile", { required: true })}
                label="Perfil"
                defaultValue={"Administrador"}
                data-testid="selectRegister"
                error={errors.profile ? true : false}
              >
                <MenuItem value={"Administrador"}>ADMINISTRADOR</MenuItem>
                <MenuItem value={"Usuário padrão"}>PADRÃO</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Status
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={status}
                onChange={handleSetStatus}
              >
                <FormControlLabel
                  value="ativo"
                  control={<Radio />}
                  label="Ativo"
                />
                <FormControlLabel
                  value="inativo"
                  control={<Radio />}
                  label="Inativo"
                />
              </RadioGroup>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: "#f58056" }}
            >
              Cadastrar
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
}
