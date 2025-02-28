import { Stack, Typography, Link, Divider } from "@mui/material";
import Layout from "./components/Layout";
import DorkForm from "./components/DorkForm";
import { InfoOutlined } from "@mui/icons-material";
import Examples from "./components/Examples";

function App() {
  return (
    <Layout>
      <Stack spacing={2} mb={2} alignItems="center">
        <Typography component="h1" variant="h3">
          Google Dork Generator
        </Typography>
        <Typography color="text.secondary" maxWidth="sm">
          {`Find exactly what you're looking for on Google in a sea of
          AI-generated garbage... with AI! `}
        </Typography>

        <Stack direction="row" justifyContent="center" spacing={1}>
          <InfoOutlined color="primary" />
          <Link
            href="https://www.imperva.com/learn/application-security/google-dorking-hacking/"
            target="_blank"
          >
            What's a Google Dork?
          </Link>
        </Stack>
      </Stack>
      <DorkForm />
      <Divider />
      <Examples />
    </Layout>
  );
}

export default App;
