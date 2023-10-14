const setupConnection = require("./helpers/setupMongoConnection");
const app = require("./app");
const { PORT } = require("./helpers/env");

setupConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`${error.message}`);
    process.exit(1);
  });
