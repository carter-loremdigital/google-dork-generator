import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import DorkSuccess from "./DorkSuccess";
import DorkError from "./DorkError";
// import { testDork } from "../data";

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
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset dork data & state
    setDorkData(null);
    setError(null);
    setLoading(true);

    // Hit backend API to generate Google dork with user's query
    try {
      const response = await fetch(
        // `${import.meta.env.VITE_API_BASE_URL}/api/dork`,
        "/api/dork",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: query.trim() }), // Trim leading & trailing whitespace
        }
      );

      // Handle HTTP errors with custom error message
      if (!response.ok) {
        let message = "";
        switch (response.status) {
          case 400:
            message = "Invalid query. Please adjust your query and try again.";
            break;
          case 429:
            message = "Too many requests. Please try again later.";
            break;
          case 500:
            message = "Internal server error. Please try again later.";
            break;
          default:
            message = "An unexpected error occurred.";
        }
        setError(message);
        return;
      }

      // Parse JSON response
      const data = await response.json();

      // Check if the returned dork object indicates an error from the model
      if (data.error) {
        setError(
          "Unable to process your request. Please adjust your query and try again."
        );
      } else {
        // Set dorkData if there is no error from model
        setDorkData(data);
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "A network error occurred.";
      setError(errorMsg);
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
      {error && <DorkError message={error} />}
      {dorkData && <DorkSuccess dork={dorkData} />}
    </Stack>
  );
};

export default DorkForm;
