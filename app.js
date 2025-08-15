require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "https://pltu-curah-hujan-frontend.vercel.app",
  "https://pltu-curah-hujan-frontend-git-staging-pltu-indramayus-projects.vercel.app",
  "https://pltu-curah-hujan-backend-staging.up.railway.app",
  "https://api-curah-hujan.pltu.web.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Backend berjalan 🚀");
});

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("✅ Database connected & synchronized");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
  });

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const adminRoutes = require("./routes/admin");
app.use("/", adminRoutes);

const protectedRoutes = require("./routes/protectedRoutes");
app.use("/protected", protectedRoutes);

const curahHujanRoutes = require("./routes/curahHujanRoutes");
app.use("/curah-hujan", curahHujanRoutes);

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});
