const { CurahHujan, User } = require('../models');

function hitungSifatHujan(mm) {
  if (mm < 5) return "Rendah";
  if (mm < 20) return "Sedang";
  return "Lebat";
}

// POST 
const sifat_hujan = hitungSifatHujan(sumber_air);

exports.createCurahHujan = async (req, res) => {
  try {
    const { tanggal, jam, umur_hss, umur_tanaman, curah_hujan, varietas, sumber_air, opt } = req.body;
    const user_id = req.user.id;

    const dataBaru = await CurahHujan.create({
      tanggal,
      jam,
      umur_hss,
      umur_tanaman, 
      curah_hujan, 
      sifat_hujan,
      varietas,
      sumber_air,
      opt,
      user_id
    });

    res.status(201).json({ message: "Data curah hujan berhasil disimpan", data: dataBaru });
  } catch (err) {
    res.status(500).json({ message: "Gagal menyimpan data", error: err.message });
  }
};

// 
exports.getByUser = async (req, res) => {
  try {
    const user_id = req.user.id;
    const bulan = req.query.bulan; // format: '2025-07'

    const data = await CurahHujan.findAll({
      where: {
        user_id,
        tanggal: {
          [Op.like]: `${bulan}%`,
        }
      }
    });

    res.json({ data });
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data", error: err.message });
  }
};

// 
exports.getAllData = async (req, res) => {
  try {
    const data = await CurahHujan.findAll({ include: User });

    res.json({ data });
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil semua data", error: err.message });
  }
};
