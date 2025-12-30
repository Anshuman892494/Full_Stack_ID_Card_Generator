const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = 5050;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

app.use("/api/auth", require("./routes/authRoutes"));

// Connect and start
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed:", error);
    process.exit(1);
  });