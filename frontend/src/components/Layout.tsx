import { Container, Box } from "@mui/material";
import { ReactNode } from "react";
import Footer from "./Footer";
import Disclaimer from "./Disclaimer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        textAlign: "center",
      }}
    >
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        {children}
        <Disclaimer />
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
