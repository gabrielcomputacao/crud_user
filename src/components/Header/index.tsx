import { NavLink, useNavigate } from "react-router-dom";
import { Box, ButtonBase, IconButton, Menu, MenuItem } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useState } from "react";
import { useUsers } from "../../context/userContext";
import { User } from "../../models";

export function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { user, handleSetIsUserActive, handleSetUserActive } = useUsers();

  const navigate = useNavigate();

  const handleClickAnchorEl = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  function handleOpenMenu() {
    setOpenMenu((prev) => !prev);
  }

  return (
    <header>
      <Box
        height="60px"
        borderBottom="1px solid #f58056"
        display="flex"
        justifyContent="space-between"
        padding="10px 30px"
        alignItems="center"
      >
        <Box
          width="309px"
          sx={{
            "@media (max-width: 450px)": {
              width: "auto",
            },
          }}
        >
          <DashboardIcon
            sx={{ width: "50px", height: "50px", color: "#f58056" }}
          />
        </Box>
        <Box>
          <IconButton
            size="medium"
            onClick={(e) => {
              handleOpenMenu();
              handleClickAnchorEl(e);
            }}
          >
            <AccountBoxIcon
              sx={{ width: "35px", height: "35px", color: "#f58056" }}
            />
          </IconButton>

          <Menu
            id="basic-menu"
            open={openMenu}
            anchorEl={anchorEl}
            onClose={handleOpenMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
              disablePadding: true,
            }}
            anchorOrigin={{
              vertical: 30,
              horizontal: -95,
            }}
          >
            <NavLink
              to="/profile"
              style={{
                textDecoration: "none",
                color: "#f58056",
                width: "100%",
                height: "100%",
              }}
            >
              <MenuItem
                sx={{
                  minWidth: "100%",
                  minHeight: "100%",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                }}
              >
                Meu perfil
              </MenuItem>
            </NavLink>
            <MenuItem
              onClick={() => {
                handleSetIsUserActive(false);
                handleSetUserActive({} as User);
                localStorage.setItem("userActive", JSON.stringify({}));
                navigate("/login");
              }}
              sx={{
                minWidth: "100%",
                minHeight: "100%",
                paddingTop: "12px",
                paddingBottom: "12px",
                color: "#f58056",
              }}
            >
              Sair
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="start"
        padding="15px 40px"
        bgcolor="#f58056"
        height="20px"
        alignItems="center"
        gap="20px"
      >
        <ButtonBase
          sx={{
            fontSize: "16px",
            backgroundColor:
              user.tipoUsuario === "Administrador" ? "#fff" : "#dfdfdf",
            borderRadius: "5px",
            "@media (max-width: 450px)": {
              fontSize: "14px",
            },
          }}
          disabled={user.tipoUsuario === "Administrador" ? false : true}
        >
          <NavLink
            to="/register"
            style={{
              textDecoration: "none",
              color: "#f58056",
              padding: "5px",
            }}
          >
            Cadastrar usuário
          </NavLink>
        </ButtonBase>
        <ButtonBase
          sx={{
            fontSize: "16px",
            backgroundColor: "white",
            "@media (max-width: 450px)": {
              fontSize: "14px",
            },
            borderRadius: "5px",
          }}
        >
          <NavLink
            to="/search"
            style={{
              textDecoration: "none",
              color: "#f58056",
              padding: "5px",
            }}
          >
            Gestão de usuários
          </NavLink>
        </ButtonBase>
      </Box>
    </header>
  );
}
