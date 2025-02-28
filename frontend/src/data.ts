export const examples = [
  '"Find scholarly articles about quantum computing in PDF format from Stanford University published between 2021 and 2023"',
  "\"Find Tesla press releases in PDF format from the Tesla website, excluding results containing 'Elon Musk'\"",
  '"Search for legal case studies related to intellectual property law on Harvard Law Review\'s website"',
];

export const testDork = {
  dork: `site:scholar.google.com "bacteria for plastic pollution" after:2022`,
  error: false,
  errorMessage: "",
  explanation: "Explanation",
};
