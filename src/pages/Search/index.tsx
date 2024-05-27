/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";

import { getUsers } from "../../../presenter/getUsers";
import { getSpecificUsers } from "../../../presenter/getSpecificUsers";
import { deleteUser } from "../../../presenter/deleteUser";
import { editUser } from "../../../presenter/editUser";

import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { User } from "../../models";
import { useUsers } from "../../context/userContext";
import { Message } from "../../components/Message";
import { useForm } from "react-hook-form";
import { compareSimilarUsersWithExcessInLocalStorage } from "../../utils/functions";
import { Loading } from "../../components/Loading";

interface IHandleUser {
  profileHandle: string;
  userHandle: string;
  statusHandle: boolean;
  sobrenomeHandle: string;
  emailHandle: string;
}

export function Search() {
  const [users, setUsers] = useState<Array<User>>([] as User[]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userHandled, setUserHandled] = useState({} as User);
  const [searchUser, setSearchUser] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm<IHandleUser>();

  const {
    handleSetObjectMessage,
    objectMessage,
    user,
    isLoading,
    handleSetIsLoading,
  } = useUsers();

  function handleClickDeleteToggle() {
    setOpenDeleteDialog((prev) => !prev);
  }

  function handleClickViewToggle() {
    setOpenViewDialog((prev) => !prev);
    setIsEditing(false);
    clearErrors("userHandle");
  }

  function handleSearchUser(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchUser(e.target.value);
  }

  function onSubmitEditUser(data: IHandleUser) {
    handleSetIsLoading(true);

    const userEdited: User = {
      ...userHandled,
      tipoUsuario: data.profileHandle,
      nome: data.userHandle,
      email: data.emailHandle,
      sobrenome: data.sobrenomeHandle,
    };

    editUser(userEdited, userHandled.nome)
      .then(() => {
        setUsers((prev) =>
          prev.map((value) => (value.id === userEdited.id ? userEdited : value))
        );
        handleSetObjectMessage({
          status: "success",
          text: "Usuário editado com sucesso!",
          page: "search",
        });
        handleClickViewToggle();
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
                    userEdited,
                    userHandled.nome
                  );

                if (isUserInValid) {
                  handleSetObjectMessage({
                    status: "error",
                    text: "Já existe um usuário com esse nome.",
                    page: "search",
                  });
                  return;
                }

                const editDataArrayUsers = dataArray.map(
                  (userElement: User) => {
                    return userElement.id === userEdited.id
                      ? userEdited
                      : userElement;
                  }
                );

                localStorage.setItem(
                  "usersLocalStorage",
                  JSON.stringify({ users: editDataArrayUsers })
                );

                setUsers((prev) =>
                  prev.map((value) =>
                    value.id === userEdited.id ? userEdited : value
                  )
                );

                handleSetObjectMessage({
                  status: "success",
                  text: "Perfil editado com sucesso!",
                  page: "search",
                });

                handleClickViewToggle();
              }
            } else {
              handleSetObjectMessage({
                status: "error",
                text: error.message,
                page: "search",
              });
            }
          }
        }
      })
      .finally(() => {
        handleSetIsLoading(false);
      });
  }

  function handleDeleteUser(data: User) {
    handleSetIsLoading(true);
    deleteUser(data)
      .then(() => {
        setUsers((prev) => prev.filter((value) => value.id !== userHandled.id));

        handleSetObjectMessage({
          status: "success",
          text: "Usuário deletado com sucesso!",
          page: "search",
        });

        handleClickDeleteToggle();
      })
      .catch((error) => {
        const usersLocal = localStorage.getItem("usersLocalStorage");

        if (usersLocal) {
          const dataUsers = JSON.parse(usersLocal);

          if (dataUsers && Array.isArray(dataUsers.users)) {
            const dataArray: Array<User> = dataUsers.users;

            if (dataArray.length > 0) {
              const newDataArray = dataArray.filter(
                (value) => value.id !== userHandled.id
              );

              localStorage.setItem(
                "usersLocalStorage",
                JSON.stringify({ users: newDataArray })
              );

              setUsers((prev) =>
                prev.filter((value) => value.id !== userHandled.id)
              );

              handleSetObjectMessage({
                status: "success",
                text: "Usuário deletado com sucesso!",
                page: "search",
              });

              handleClickDeleteToggle();
            } else {
              handleSetObjectMessage({
                status: "error",
                text: error.message,
                page: "search",
              });
            }
          }
        }
      })
      .finally(() => {
        handleSetIsLoading(false);
      });
  }

  useEffect(() => {
    handleSetIsLoading(true);
    getUsers()
      .then((dataUsers) => {
        const arrayWithoutUserActive = dataUsers.filter(
          (value) => value.id !== user.id
        );
        setUsers(arrayWithoutUserActive);
      })
      .catch((error) => {
        const usersLocal = localStorage.getItem("usersLocalStorage");

        if (usersLocal) {
          const dataUsers = JSON.parse(usersLocal);

          if (dataUsers && Array.isArray(dataUsers.users)) {
            const dataArray: Array<User> = dataUsers.users;
            if (dataArray) {
              if (dataArray.length > 0) {
                const arrayWithoutUserActiveInLocalStorage: Array<User> =
                  dataArray.filter((value) => value.id !== user.id);
                setUsers(arrayWithoutUserActiveInLocalStorage);
              }
            } else {
              handleSetObjectMessage({
                status: "error",
                text: error.message,
                page: "search",
              });
            }
          }
        }
      })
      .finally(() => {
        handleSetIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchUser !== null) {
      handleSetIsLoading(true);
      getSpecificUsers(searchUser)
        .then((dataUsers) => {
          setUsers(dataUsers);
        })
        .catch((error) => {
          const usersLocal = localStorage.getItem("usersLocalStorage");

          if (usersLocal) {
            const dataUsers = JSON.parse(usersLocal);

            if (dataUsers && Array.isArray(dataUsers.users)) {
              const dataArray: Array<User> = dataUsers.users;

              if (dataArray) {
                const results = dataArray.filter((dataFiltered) => {
                  const regex = new RegExp(`^${searchUser}`);
                  return regex.test(dataFiltered.nome);
                });

                const arrayWithoutUserActiveInLocalStorage: Array<User> =
                  results.filter((value) => value.id !== user.id);

                setUsers(arrayWithoutUserActiveInLocalStorage);
              } else {
                handleSetObjectMessage({
                  status: "error",
                  text: error.message,
                  page: "search",
                });
              }
            }
          }
        })
        .finally(() => {
          handleSetIsLoading(false);
        });
    }
  }, [searchUser]);

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
        {objectMessage?.page === "search" && <Message />}
        {isLoading && <Loading />}
        <Box
          display="flex"
          flexDirection="column"
          gap="60px"
          width="100%"
          marginTop="20px"
        >
          <TextField
            label="Pesquisar"
            placeholder="Digite aqui o nome do usuário que deseja procurar"
            variant="outlined"
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
            onChange={handleSearchUser}
            sx={{
              paddingLeft: "5px",
              paddingRight: "5px",
            }}
          />

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      "@media (max-width: 450px)": {
                        fontSize: "14px",
                      },
                    }}
                  >
                    Nome
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      textAlign: "center",
                      "@media (max-width: 450px)": {
                        fontSize: "14px",
                      },
                    }}
                  >
                    Perfil
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      textAlign: "center",
                      "@media (max-width: 450px)": {
                        fontSize: "14px",
                      },
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      textAlign: "center",
                      "@media (max-width: 450px)": {
                        fontSize: "14px",
                      },
                    }}
                  >
                    Visualizar / Editar
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      textAlign: "center",
                      "@media (max-width: 450px)": {
                        fontSize: "14px",
                      },
                    }}
                  >
                    Excluir
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody data-testid="table">
                {users.map((row, index) => (
                  <TableRow
                    key={`${index}-${row.id}`}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.nome}
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: "center" }}
                      component="th"
                      scope="row"
                    >
                      {row.tipoUsuario.toLocaleUpperCase()}
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: "center" }}
                      component="th"
                      scope="row"
                    >
                      {row.ativo ? "Ativo" : "Inativo"}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <IconButton
                        data-testid="editbutton"
                        aria-label="view"
                        onClick={() => {
                          setUserHandled(row);
                          handleClickViewToggle();
                          setValue("profileHandle", row.tipoUsuario);
                          setValue("userHandle", row.nome);
                          setValue("emailHandle", row.email);
                          setValue("sobrenomeHandle", row.sobrenome);
                          setValue("statusHandle", row.ativo);
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <IconButton
                        data-testid="deletebutton"
                        disabled={
                          user.tipoUsuario === "Administrador" ? false : true
                        }
                        onClick={() => {
                          setUserHandled(row);
                          handleClickDeleteToggle();
                        }}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Dialog
          open={openDeleteDialog}
          onClose={handleClickDeleteToggle}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          data-testid="dialogexclude"
        >
          <DialogTitle
            data-testid="titleexclude"
            id="alert-dialog-title-delete"
          >
            Confirmar Exclusão
          </DialogTitle>
          <IconButton
            data-testid="closebutton"
            aria-label="close"
            onClick={handleClickDeleteToggle}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <DialogContentText id="alert-dialog-description-delete">
              Deseja realmente excluir esse registro?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              data-testid="closeconfirmation"
              variant="contained"
              onClick={() => handleDeleteUser(userHandled)}
            >
              Sim
            </Button>
            <Button variant="contained" onClick={handleClickDeleteToggle}>
              Não
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openViewDialog}
          onClose={handleClickViewToggle}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          data-testid="dialogedit"
        >
          <DialogTitle id="alert-dialog-title-view">
            Visualizar Dados
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClickViewToggle}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent
            sx={{
              minWidth: "400px",
              "@media (max-width: 500px)": {
                width: "350px",
                minWidth: "auto",
              },
            }}
          >
            <DialogContentText
              id="alert-dialog-description-view"
              component={"div"}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap="20px"
                marginBottom="10px"
                component={"div"}
                sx={{
                  "@media (max-width: 500px)": {
                    alignItems: "start",
                    width: "auto",
                  },
                }}
              >
                <Box width="100%">
                  <InputLabel
                    sx={{
                      "@media (max-width: 500px)": {
                        width: "auto",
                      },
                    }}
                  >
                    Nome:
                  </InputLabel>
                  <TextField
                    data-testid="inputuser"
                    disabled={isEditing ? false : true}
                    defaultValue={userHandled.nome}
                    variant="outlined"
                    {...register("userHandle", { required: true })}
                    sx={{
                      width: "100%",
                      "@media (max-width: 500px)": {
                        width: "auto",
                      },
                    }}
                    error={errors.userHandle ? true : false}
                    helperText={
                      errors.userHandle
                        ? "Esse campo não pode estar vazio."
                        : ""
                    }
                  />
                </Box>
                <Box width="100%">
                  <InputLabel
                    sx={{
                      "@media (max-width: 500px)": {
                        width: "auto",
                      },
                    }}
                  >
                    Sobronome:
                  </InputLabel>
                  <TextField
                    data-testid="inputuser"
                    disabled={isEditing ? false : true}
                    defaultValue={userHandled.sobrenome}
                    variant="outlined"
                    {...register("sobrenomeHandle", { required: true })}
                    sx={{
                      width: "100%",
                      "@media (max-width: 500px)": {
                        width: "auto",
                      },
                    }}
                    error={errors.sobrenomeHandle ? true : false}
                    helperText={
                      errors.sobrenomeHandle
                        ? "Esse campo não pode estar vazio."
                        : ""
                    }
                  />
                </Box>
                <Box width="100%">
                  <InputLabel
                    sx={{
                      "@media (max-width: 500px)": {
                        width: "auto",
                      },
                    }}
                  >
                    Email:
                  </InputLabel>
                  <TextField
                    data-testid="inputuser"
                    disabled={isEditing ? false : true}
                    defaultValue={userHandled.email}
                    variant="outlined"
                    {...register("emailHandle", { required: true })}
                    sx={{
                      width: "100%",
                      "@media (max-width: 500px)": {
                        width: "auto",
                      },
                    }}
                    error={errors.emailHandle ? true : false}
                    helperText={
                      errors.emailHandle
                        ? "Esse campo não pode estar vazio."
                        : ""
                    }
                  />
                </Box>
                <Box
                  width="100%"
                  sx={{
                    "@media (max-width: 500px)": {
                      width: "auto",
                    },
                  }}
                >
                  <InputLabel>Perfil</InputLabel>
                  <FormControl fullWidth>
                    <Select
                      {...register("profileHandle", { required: true })}
                      defaultValue={userHandled.tipoUsuario}
                      disabled={isEditing ? false : true}
                      sx={{
                        "@media (max-width: 500px)": {
                          width: "auto%",
                        },
                      }}
                    >
                      <MenuItem value={"Administrador"}>ADMINISTRADOR</MenuItem>
                      <MenuItem value={"Usuário padrão"}>PADRÃO</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              gap="20px"
              marginBottom="10px"
            >
              <Box>
                {isEditing ? (
                  <Button
                    sx={{ width: "85px" }}
                    variant="contained"
                    onClick={handleSubmit(onSubmitEditUser)}
                  >
                    Salvar
                  </Button>
                ) : (
                  <Button
                    sx={{ width: "85px" }}
                    variant="contained"
                    onClick={handleClickViewToggle}
                  >
                    Ok
                  </Button>
                )}
              </Box>

              <Button
                sx={{ width: "85px" }}
                variant="contained"
                onClick={() => {
                  setIsEditing(true);
                }}
                disabled={
                  user.tipoUsuario !== "Administrador"
                    ? true
                    : isEditing
                    ? true
                    : false
                }
              >
                Editar
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
