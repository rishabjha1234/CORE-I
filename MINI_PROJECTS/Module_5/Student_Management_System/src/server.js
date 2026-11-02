import "dotenv/config";
import app from "./app.js";
import { connectToDatabase } from "./config/db.js";

const port = process.env.PORT || 5000;

try {
  await connectToDatabase();
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
} catch (error) {
  console.error("Could not start the server:", error.message);
  process.exit(1);
}
