import { Alert, Box } from "@mui/material";
import { useUsers } from "../../context/userContext";
import { useEffect } from "react";

export interface IMessages {
  text: string;
  status: "success" | "error" | "info";
  page: "login" | "home" | "register" | "search" | "profile";
}

export function Message() {
  const { objectMessage, handleSetObjectMessage } = useUsers();

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSetObjectMessage(undefined);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [handleSetObjectMessage]);

  return (
    <Box
      zIndex="9999"
      position="absolute"
      top={170}
      right={20}
      minHeight={70}
      minWidth={250}
      data-testid="message"
    >
      <Alert severity={objectMessage?.status}>{objectMessage?.text}</Alert>
    </Box>
  );
}
