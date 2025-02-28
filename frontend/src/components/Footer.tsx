import { Stack, Typography, Link } from "@mui/material";
import { GitHub, Public, Code } from "@mui/icons-material";

const Footer = () => {
  return (
    <Stack
      component="footer"
      direction={{ xs: "column", sm: "row" }}
      justifyContent="center"
      alignItems="center"
      py={2}
      width="100%"
    >
      <Typography
        variant="body1"
        sx={{
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        Made by
        <Link
          href="https://github.com/carter-loremdigital"
          target="_blank"
          sx={{
            mx: 1,
            display: "inline-flex",
            alignItems: "center",
            textWrap: "nowrap",
          }}
        >
          <GitHub sx={{ mr: 0.5 }} />
          carter-loremdigital
        </Link>
      </Typography>
      |
      <Link
        variant="body1"
        href="https://github.com/carter-loremdigital/google-dork-generator"
        target="_blank"
        sx={{
          mx: 1,
          display: "inline-flex",
          alignItems: "center",
          textWrap: "nowrap",
        }}
      >
        <Code sx={{ mr: 0.5 }} />
        Source Code
      </Link>
      |
      <Link
        variant="body1"
        href="https://www.loremdigital.co/"
        target="_blank"
        sx={{
          mx: 1,
          display: "inline-flex",
          alignItems: "center",
          textWrap: "nowrap",
        }}
      >
        <Public sx={{ mr: 0.5 }} />
        loremdigital.co
      </Link>
    </Stack>
  );
};

export default Footer;
