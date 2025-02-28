import { IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import { Check } from "@mui/icons-material";

const CopyButton = ({ data }: { data: string | "" }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data);
      // Show notification that text was copied
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <Tooltip
      color="inherit"
      title={copied ? "Dork copied to clipboard" : "Copy to clipboard"}
      sx={{}}
    >
      <IconButton onClick={handleCopy}>
        {copied ? <Check /> : <ContentCopyIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default CopyButton;
