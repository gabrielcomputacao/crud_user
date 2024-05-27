import { Box, CircularProgress } from "@mui/material";

export function Loading() {
  return (
    <Box
      position={"absolute"}
      data-testid="circle"
      zIndex="99999"
      top="15%"
      left="48%"
    >
      <CircularProgress size={70} color="secondary" />
    </Box>
  );
}
