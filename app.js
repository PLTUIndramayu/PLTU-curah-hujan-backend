const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const { User } = require("./models");

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);


const adminRoutes = require('./routes/admin');
app.use('/', adminRoutes);

const protectedRoutes = require("./routes/protectedRoutes");
app.use("/protected", protectedRoutes);


app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});


