import { Container, Box } from "@mui/material";
import { ReactNode } from "react";
import Footer from "./Footer";
import Disclaimer from "./Disclaimer";
// import Examples from "./Examples";

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
        p: 4,
      }}
    >
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        {children}
        {/* <Examples /> */}
        <Disclaimer />
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
