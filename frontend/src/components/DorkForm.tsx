import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import DorkSuccess from "./DorkSuccess";
type Props = {};

export interface Dork {
  dork: string;
  error: boolean;
  errorMessage: string;
  explanation: string;
}

const DorkForm = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [dorkData, setDorkData] = useState<Dork | null>(null);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset dork data & loading state
    setDorkData(null);
    // TODO: setError(false)
    setLoading(true);

    // TODO: Hit backend API to generate Google dork with user's query
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/dork`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: query.trim() }), // Trim leading & trailing whitespace
        }
      );

      const data = await response.json();
      setDorkData(data);
    } catch (error) {
      setError(true);
      console.error("Error generating dork:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit}>
      <TextField
        label="Search Query"
        placeholder="Describe what you're looking for..."
        multiline
        rows={3}
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={loading}
        required
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <Button
        type="submit"
        variant="outlined"
        loading={loading}
        disabled={loading}
      >
        Get Dork
      </Button>

      {/* TODO: Handle error states & provide user feedback */}

      {dorkData && <DorkSuccess dork={dorkData} />}
    </Stack>
  );
};

export default DorkForm;
