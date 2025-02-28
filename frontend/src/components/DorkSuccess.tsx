import { Box, Link, Stack, Typography } from "@mui/material";
import { Dork } from "./DorkForm";
import CopyButton from "./CopyButton";
import { OpenInNew } from "@mui/icons-material";

const DorkSuccess = ({ dork }: { dork: Dork }) => {
  return (
    <Box
      sx={{
        border: `1px solid black`,
        p: 2,
      }}
    >
      <Stack alignItems="center">
        <Typography component="h2" variant="h6">
          Generated Dork
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            borderRadius: 2,
            width: "100%",
          }}
          spacing={1}
        >
          <Stack direction="row" alignItems="center" color="primary.main">
            <OpenInNew fontSize="small" />
            <Link
              href={`https://www.google.com/search?q=${encodeURIComponent(
                dork.dork
              )}`}
              target="_blank"
            >
              {dork.dork}
            </Link>
          </Stack>
          <CopyButton data={dork.dork} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default DorkSuccess;
