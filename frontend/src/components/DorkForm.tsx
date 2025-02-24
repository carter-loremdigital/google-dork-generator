import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
type Props = {};

const DorkForm = (props: Props) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    // setLoading(true);
    e.preventDefault();
    console.log("Query:", query);
    // setLoading(false);
  };

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit}>
      <TextField
        multiline
        rows={3}
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        required
      />
      <Button
        type="submit"
        variant="contained"
        loading={loading}
        disabled={loading}
      >
        Get Dork
      </Button>
    </Stack>
  );
};

export default DorkForm;
