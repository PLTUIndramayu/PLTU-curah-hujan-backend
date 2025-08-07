const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const { v4: uuidv4 } = require("uuid");

exports.register = async (req, res) => {
  try {
    const { nama, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      id: uuidv4(),
      nama,
      email,
      password: hashedPassword,
      role,
      kode_user: `USR-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    });

    res.status(201).json({ message: "User berhasil dibuat", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal membuat user" });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Email tidak ditemukan" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Password salah" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login berhasil", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
