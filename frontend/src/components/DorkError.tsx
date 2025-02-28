import { Box, Stack, Typography } from "@mui/material";

const DorkError = ({ message }: { message: string }) => {
  return (
    <Box
      sx={{
        border: `1px solid black`,
        p: 2,
      }}
      color="error.main"
    >
      <Stack alignItems="center" spacing={1}>
        <Typography component="h2" variant="h6">
          Error
        </Typography>

        <Box textAlign="center">
          <Typography>{message}</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default DorkError;
