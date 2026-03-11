require("dotenv").config();
const app = require("./src/app.js");
const connectToDatabase = require("./src/config/databases.js");

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, HOST, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server");
    console.error(error.message);
    process.exit(1);
  }
}

startServer();
