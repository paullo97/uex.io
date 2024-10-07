import { Stack } from "@mui/material";

const Row = ({ children }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
    >
      {children}
    </Stack>
  );
};

export default Row;
