const { User, CurahHujan } = require("../models");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

require("dotenv").config();

const { v4: uuidv4 } = require("uuid");
const baseUrl = process.env.BASE_URL || "http://localhost:3001";

exports.register = async (req, res) => {
  try {
    const { nama, email, password, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const kodeUser = `USR-${Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase()}`;

    const user = await User.create({
      id: uuidv4(),
      nama,
      email,
      password: hashedPassword,
      role: role || "user",
      kode_user: kodeUser,
    });

    res.status(201).json({
      message: "User berhasil dibuat",
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role,
        kode_user: user.kode_user,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res
      .status(500)
      .json({ message: "Gagal membuat user", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(401).json({ message: "Email tidak ditemukan" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Password salah" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login berhasil", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.update = async (req, res) => {
  try {
    const userId = req.params.id;

    const {
      nama,
      email,
      tanggal_lahir,
      alamat,
      nomor_telepon,
      jabatan,
      kode_user,
      kode_stasiun,
      tgl_mulai_bekerja,
    } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    let foto_profil = user.foto_profil;
    if (req.file) {
      foto_profil = `${baseUrl}/uploads/${req.file.filename}`;
    }

    await user.update({
      nama,
      foto_profil,
      email,
      tanggal_lahir,
      alamat,
      nomor_telepon,
      jabatan,
      kode_user,
      kode_stasiun,
      tgl_mulai_bekerja,
    });

    return res.status(200).json({
      message: "Profil berhasil diperbarui",
      data: user,
    });
  } catch (error) {
    console.error("Gagal update profile:", error);
    return res.status(500).json({
      message: "Terjadi kesalahan saat memperbarui profil",
      error: error.message,
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await User.findByPk(id, {
      include: [
        {
          model: CurahHujan,
          as: "CurahHujans",
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.json({ data: user });
  } catch (err) {
    res.status(500).json({
      message: "Gagal mengambil data",
      error: err.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: CurahHujan,
          as: "CurahHujans",
        },
      ],
    });

    if (!users) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.json({ data: users });
  } catch (err) {
    res.status(500).json({
      message: "Gagal mengambil data",
      error: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    await user.destroy();
    res.json({ message: "User berhasil dihapus" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal menghapus user", error: err.message });
  }
};

// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//       return res.status(404).json({ message: "Email tidak ditemukan" });
//     }

//     const resetToken = crypto.randomBytes(32).toString("hex");
//     const resetTokenExpiry = Date.now() + 1000 * 60 * 60;

//     user.resetToken = resetToken;
//     user.resetTokenExpiry = resetTokenExpiry;
//     await user.save();

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password/${resetToken}`;

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Reset Password - Sistem Monitoring Curah Hujan",
//       html: `
//         <p>Anda meminta reset password.</p>
//         <p>Klik link berikut untuk reset password Anda:</p>
//         <a href="${resetUrl}">${resetUrl}</a>
//         <p>Link ini hanya berlaku 1 jam.</p>
//       `,
//     });

//     res.json({
//       message: "Link reset password telah dikirim ke email Anda",
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       message: "Gagal memproses permintaan",
//       error: err.message,
//     });
//   }
// };
