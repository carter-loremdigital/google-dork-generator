import { Stack, Typography, Link } from "@mui/material";
import Layout from "./components/Layout";
import DorkForm from "./components/DorkForm";
import { InfoOutlined } from "@mui/icons-material";
import Examples from "./components/Examples";

function App() {
  return (
    <Layout>
      <Stack spacing={2} mb={2}>
        <Typography component="h1" variant="h3">
          Google Dork Generator
        </Typography>
        <Typography>
          {`Find exactly what you're looking for on Google in a sea of
          AI-generated garbage... with AI! `}
        </Typography>

        <Stack direction="row" justifyContent="center" spacing={1}>
          <InfoOutlined color="primary" />
          <Link href="/">What's a Google Dork?</Link>
        </Stack>
      </Stack>
      <DorkForm />
      <Examples />
    </Layout>
  );
}

export default App;
