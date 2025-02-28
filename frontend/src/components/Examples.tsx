import { Alert, AlertTitle, List, ListItem } from "@mui/material";
import { examples } from "../data";

const Examples = () => {
  return (
    <Alert
      severity="info"
      sx={{
        textAlign: "initial",
        my: 4,
      }}
    >
      <AlertTitle>Examples</AlertTitle>
      This tool works best with specific search queries. Try these examples or
      use them to help construct your own query:
      <List sx={{ fontStyle: "italic" }}>
        {examples.map((item, index) => (
          <ListItem key={index}>{item}</ListItem>
        ))}
      </List>
    </Alert>
  );
};

export default Examples;
