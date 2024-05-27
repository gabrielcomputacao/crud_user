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
import BadgeIcon from "@mui/icons-material/Badge";
import { Header } from "../../components/Header";

import { useForm } from "react-hook-form";
import { editUser } from "../../../presenter/editUser";
import { useUsers } from "../../context/userContext";
import { User } from "../../models";

import styles from "../RegisterUser/register.module.css";
import { Message } from "../../components/Message";
import { useState } from "react";
import { compareSimilarUsersWithExcessInLocalStorage } from "../../utils/functions";
import { Loading } from "../../components/Loading";

export interface IRegisterUserProfile {
  password: string;
  user: string;
  email: string;
  sobrenome: string;
}

export function Profile() {
  const {
    handleSetObjectMessage,
    objectMessage,
    user,
    handleSetUserActive,
    isLoading,
    handleSetIsLoading,
  } = useUsers();

  const [dataProfile, setDataProfile] = useState<string>(user.tipoUsuario);

  const [status, setStatus] = useState("inativo");

  function handleSetStatus(event: React.ChangeEvent<HTMLInputElement>) {
    setStatus((event.target as HTMLInputElement).value);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterUserProfile>({
    defaultValues: {
      password: user.senha,
      user: user.nome,
      email: user.email,
      sobrenome: user.sobrenome,
    },
  });

  function onSubmit(data: IRegisterUserProfile) {
    handleSetIsLoading(true);

    const dataUser: User = {
      id: user.id,
      nome: data.user,
      senha: data.password,
      tipoUsuario: dataProfile,
      ativo: status === "inativo" ? false : true,
      email: data.email,
      sobrenome: data.sobrenome,
    };

    editUser(dataUser, user.nome)
      .then(() => {
        handleSetObjectMessage({
          status: "success",
          text: "Perfil editado com sucesso!",
          page: "profile",
        });
        handleSetUserActive(dataUser);
        localStorage.setItem("userActive", JSON.stringify(dataUser));
      })
      .catch((error) => {
        const usersLocal = localStorage.getItem("usersLocalStorage");

        if (usersLocal) {
          const dataUsers = JSON.parse(usersLocal);

          if (dataUsers && Array.isArray(dataUsers.users)) {
            const dataArray: Array<User> = dataUsers.users;

            if (dataArray) {
              if (dataArray.length > 0) {
                const isUserInValid =
                  compareSimilarUsersWithExcessInLocalStorage(
                    dataArray,
                    dataUser,
                    user.nome
                  );

                if (isUserInValid) {
                  handleSetObjectMessage({
                    status: "error",
                    text: "Já existe um usuário com esse nome.",
                    page: "profile",
                  });
                  return;
                }

                const editDataArrayUsers = dataArray.map(
                  (userElement: User) => {
                    return userElement.id === dataUser.id
                      ? dataUser
                      : userElement;
                  }
                );

                localStorage.setItem(
                  "usersLocalStorage",
                  JSON.stringify({ users: editDataArrayUsers })
                );

                handleSetUserActive(dataUser);

                localStorage.setItem("userActive", JSON.stringify(dataUser));

                handleSetObjectMessage({
                  status: "success",
                  text: "Perfil editado com sucesso!",
                  page: "profile",
                });
              }
            } else {
              handleSetObjectMessage({
                status: "error",
                text: error.message,
                page: "profile",
              });
            }
          }
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
        {objectMessage?.page === "profile" && <Message />}
        <Box
          width={400}
          minHeight={400}
          border="1px solid #333"
          borderRadius={2}
          gap={5}
          padding={5}
          bgcolor="white"
        >
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            justifyContent="center"
            alignItems="center"
            gap="10px"
          >
            <BadgeIcon sx={{ width: "45px", height: "45px" }} />
            <h2 className={styles.title}>Perfil</h2>
          </Box>
          <form
            className={styles.containerForm}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              {...register("user", { required: true })}
              data-testid="userEdit"
              label="Nome"
              variant="outlined"
              defaultValue={user.nome}
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
              {...register("password", { required: true, minLength: 8 })}
              label="Senha"
              data-testid="senhaEdit"
              variant="outlined"
              fullWidth
              defaultValue={user.senha}
              error={errors.password ? true : false}
              helperText={
                errors.password
                  ? "Esse campo não pode ter menor que 8 caracteres."
                  : ""
              }
            />

            <FormControl fullWidth>
              <InputLabel>Perfil</InputLabel>
              <Select
                label="Perfil"
                value={dataProfile}
                onChange={(e) => {
                  if (
                    e.target.value === "Administrador" ||
                    e.target.value === "Usuário padrão"
                  ) {
                    setDataProfile(e?.target.value);
                  }
                }}
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
              Salvar
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
}
