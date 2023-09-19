const setupConnection = require("./helpers/setupMongoConnection");
const app = require("./app");
require("colors");
const PORT = 3000;

setupConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`.cyan);
      console.log(`http://localhost:${PORT}`.yellow);
    });
  })
  .catch((error) => {
    console.error(`${error.message}`.red);
    process.exit(1);
  });
