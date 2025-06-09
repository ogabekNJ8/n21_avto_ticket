const District = require("../models/district.model");
const Region = require("../models/region.model");
const { sendErrorresponse } = require("../helpers/send_error_response");

const addDistrict = async (req, res) => {
  try {
    const { name, region_id } = req.body;

    const candidate = await District.findOne({ where: { name, region_id } });
    if (candidate) {
      return sendErrorresponse({ message: "Bunday tuman mavjud" }, res, 400);
    }

    const newDistrict = await District.create({
      name,
      region_id,
    });

    res.status(201).json({
      message: "District created successfully",
      district: newDistrict,
    });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

const getAllDistricts = async (req, res) => {
  try {
    const districts = await District.findAll({
      include: [
        {
          model: Region,
          attributes: ["name"],
        },
      ],
      attributes: ["id", "name", "region_id"],
    });
    res.status(200).json(districts);
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const getDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const district = await District.findByPk(id, {
      include: [
        {
          model: Region,
          attributes: ["name"],
        },
      ],
    });

    if (!district) {
      return res.status(404).json({ message: "District not found" });
    }

    res.status(200).json(district);
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const updateDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, region_id } = req.body;

    const district = await District.findByPk(id);
    if (!district) {
      return res.status(404).json({ message: "District not found" });
    }

    await district.update({ name, region_id });

    res
      .status(200)
      .json({ message: "District updated successfully", district });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const deleteDistrict = async (req, res) => {
  try {
    const { id } = req.params;

    const district = await District.findByPk(id);
    if (!district) {
      return res.status(404).json({ message: "District not found" });
    }

    await district.destroy();
    res.status(200).json({ message: "District deleted successfully" });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

module.exports = {
  addDistrict,
  getAllDistricts,
  getDistrict,
  updateDistrict,
  deleteDistrict,
};
