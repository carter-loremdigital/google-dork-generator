import { Alert, AlertTitle, List, ListItem, Link } from "@mui/material";

// type Props = {};

const Disclaimer = () => {
  return (
    <Alert
      severity="warning"
      sx={{
        textAlign: "initial",
        my: 4,
      }}
    >
      <AlertTitle>Disclaimer</AlertTitle>
      This tool is intended solely for ethical, legal, and non-malicious
      purposes. It is designed to help users refine search queries for research,
      academic, open data discovery, and general information retrieval. Results
      from this tool are AI-generated and may be inaccurate, incomplete, or
      misleading. Always verify results before use.
      <List
        sx={{
          listStyleType: "disc",
          listStylePosition: "inside",
          "& .MuiListItem-root": {
            display: "list-item",
          },
        }}
      >
        <span style={{ textDecoration: "underline" }}>Prohibited Uses:</span>
        <ListItem>
          This tool must not be used for hacking, unauthorized access, or any
          activity that violates{" "}
          <Link
            href="https://policies.google.com/terms?hl=en-US"
            target="_blank"
            color="warning.main"
          >
            Google's Terms of Service
          </Link>
          , applicable laws, or ethical guidelines.
        </ListItem>
        <ListItem>
          Any attempt to use this tool to find sensitive, private, or
          unauthorized information is strictly prohibited.
        </ListItem>
        <ListItem>
          The developers and maintainers of this tool assume no responsibility
          for any misuse or unlawful activity conducted using this tool.
        </ListItem>
      </List>
      By using this tool, you acknowledge and agree to use it responsibly and in
      compliance with all relevant laws and regulations. Misuse may result in
      consequences as per the laws governing your jurisdiction.
    </Alert>
  );
};

export default Disclaimer;
