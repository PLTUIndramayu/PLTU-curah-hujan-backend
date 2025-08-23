const { CurahHujan, User } = require("../models");
const { Op } = require("sequelize");

function hitungSifatHujan(mm) {
  if (mm <= 5) return "Ringan";
  if (mm <= 20) return "Sedang";
  return "Lebat";
}

exports.createCurahHujan = async (req, res) => {
  try {
    const {
      tanggal,
      jam,
      umur_hss,
      umur_tanaman,
      curah_hujan,
      varietas,
      sumber_air,
      opt,
    } = req.body;
    const user_id = req.user.id;
    const sifat_hujan = hitungSifatHujan(curah_hujan);

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
      user_id,
    });

    res
      .status(201)
      .json({ message: "Data curah hujan berhasil disimpan", data: dataBaru });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal menyimpan data", error: err.message });
  }
};

exports.updateCurahHujan = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      tanggal,
      jam,
      umur_hss,
      umur_tanaman,
      curah_hujan,
      varietas,
      sumber_air,
      opt,
      keterangan,
    } = req.body;
    const sifat_hujan = hitungSifatHujan(curah_hujan);
    const data = await CurahHujan.findByPk(id);

    if (!data) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    await data.update({
      tanggal,
      jam,
      umur_hss,
      umur_tanaman,
      curah_hujan,
      sifat_hujan,
      varietas,
      sumber_air,
      opt,
      keterangan,
    });

    return res.status(200).json({
      message: "Data berhasil diperbarui",
      data: data,
    });
  } catch (error) {
    console.error("Gagal update data:", error);
    return res.status(500).json({
      message: "Terjadi kesalahan saat memperbarui data",
      error: error.message,
    });
  }
};

exports.getDataByMonth = async (req, res) => {
  try {
    const { bulan, tahun } = req.query;
    // const user_id = req.user.id;

    if (!bulan || !tahun) {
      return res.status(400).json({
        message:
          "Parameter 'bulan' dan 'tahun' diperlukan (format: bulan=MM&tahun=YYYY)",
      });
    }

    const month = parseInt(bulan, 10);
    const year = parseInt(tahun, 10);

    const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
    const endDate = new Date(Date.UTC(year, month, 1, 0, 0, 0));

    const data = await CurahHujan.findAll({
      where: {
        // user_id,
        tanggal: {
          [Op.gte]: startDate,
          [Op.lt]: endDate,
        },
      },
      order: [["tanggal", "ASC"]],
    });

    res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getAllData = async (req, res) => {
  try {
    const data = await CurahHujan.findAll({ include: User });

    res.json({ data });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal mengambil semua data", error: err.message });
  }
};

exports.getDataById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await CurahHujan.findByPk(id, { include: User });

    if (!data) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.json({ data });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal mengambil data", error: err.message });
  }
};

exports.deleteData = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await CurahHujan.findByPk(id);

    if (!data) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    await data.destroy();
    res.json({ message: "Data berhasil dihapus" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal menghapus data", error: err.message });
  }
};
