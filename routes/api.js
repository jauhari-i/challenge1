const express = require("express");
const app = express();
const Keranjang = require("../models/Keranjang");
const { v4: uuidv4 } = require("uuid");

app.get("/", (req, res) => {
  res.json("APi ");
});

app.get("/keranjang", async (req, res) => {
  try {
    const data = await Keranjang.find({});
    res.status(200).json({
      success: true,
      message: "Get Keranjang Success!",
      data: data.map((d) => ({
        uuid: d.uuid,
        barang: d.barang,
        createdAt: d.createdAt,
        editedAt: d.editedAt,
      })),
    });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

app.get("/keranjang/:uuid", async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const data = await Keranjang.findOne({ uuid: uuid });
    if (!data)
      throw {
        success: false,
        message: "Data tidak ditemukan",
      };
    res.status(200).json({
      success: true,
      message: "Get Barang " + data.barang + " Success!",
      data: {
        uuid: data.uuid,
        barang: data.barang,
        createdAt: data.createdAt,
        editedAt: data.editedAt,
      },
    });
  } catch (error) {
    if (error.message === "Data tidak ditemukan") {
      res.status(404).json(error);
    } else {
      res.status(500).send("Internal server error");
    }
  }
});

app.post("/keranjang", async (req, res) => {
  try {
    const data = {
      barang: req.body.barang,
    };
    if (!data.barang)
      throw {
        success: false,
        message: "Barang tidak boleh kosong",
      };
    const uuid = uuidv4();
    const keranjang = await Keranjang.create({
      uuid: uuid,
      barang: data.barang,
    });
    res.status(201).json({
      success: true,
      message: "Barang telah ditambahkan",
      data: {
        uuid: keranjang.uuid,
        barang: keranjang.barang,
        createdAt: keranjang.createdAt,
        editedAt: keranjang.editedAt,
      },
    });
  } catch (error) {
    if (error.message === "Barang tidak boleh kosong") {
      res.status(400).json(error);
    } else {
      res.status(500).send("Internal server error");
    }
  }
});

app.put("/keranjang/:uuid", async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const data = {
      barang: req.body.barang,
    };
    if (!data.barang)
      throw {
        success: false,
        message: "Barang tidak boleh kosong",
      };
    const keranjang = await Keranjang.updateOne(
      { uuid: uuid },
      { barang: data.barang, editedAt: Date.now() }
    );
    const k = await Keranjang.findOne({ uuid: uuid });
    res.status(201).json({
      success: true,
      message: "Barang telah diperbarui!",
      data: {
        uuid: k.uuid,
        barang: k.barang,
        createdAt: k.createdAt,
        editedAt: k.editedAt,
      },
    });
  } catch (error) {
    if (error.message === "Barang tidak boleh kosong") {
      res.status(400).json(error);
    } else {
      res.status(500).send("Internal server error");
    }
  }
});

app.delete("/keranjang/:uuid", async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const keranjang = await Keranjang.findOneAndRemove({ uuid: uuid });
    res.status(201).json({
      success: true,
      message: "Barang telah dihapus!",
      data: {
        uuid: keranjang.uuid,
        barang: keranjang.barang,
        createdAt: keranjang.createdAt,
        editedAt: keranjang.editedAt,
      },
    });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

module.exports = app;
