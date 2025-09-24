require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
// cloudinary
require("./config/cloudinary");
// Connect to MongoDB
connectDB();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
