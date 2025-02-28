import { app, port } from "./server";

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export server instance for testing
export default server;
