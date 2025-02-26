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
      Try these examples to see what you can find with this tool:
      <List sx={{ fontStyle: "italic" }}>
        {examples.map((item, index) => (
          <ListItem key={index}>{item}</ListItem>
        ))}
      </List>
    </Alert>
  );
};

export default Examples;
