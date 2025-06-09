const Region = require("../models/region.model");
const District = require("../models/district.model");
const { sendErrorresponse } = require("../helpers/send_error_response");

const addRegion = async (req, res) => {
  try {
    const { name } = req.body;

    const candidate = await Region.findOne({ where: { name } });
    if (candidate) {
      return sendErrorresponse({ message: "Bunday viloyat mavjud" }, res, 400);
    }

    const newRegion = await Region.create({
      name,
    });

    res.status(201).json({
      message: "Region created successfully",
      region: newRegion,
    });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

const getAllRegions = async (req, res) => {
  try {
    const regions = await Region.findAll({
      include: [
        {
          model: District,
          attributes: ["name"],
        },
      ],
      attributes: ["id", "name"],
    });
    res.status(200).json(regions);
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const getRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const region = await Region.findByPk(id, {
      include: [
        {
          model: District,
          attributes: ["name"],
        },
      ],
    });

    if (!region) {
      return res.status(404).json({ message: "Region not found" });
    }

    res.status(200).json(region);
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const updateRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const region = await Region.findByPk(id);
    if (!region) {
      return res.status(404).json({ message: "Region not found" });
    }

    await region.update({ name });

    res.status(200).json({ message: "Region updated successfully", region });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const deleteRegion = async (req, res) => {
  try {
    const { id } = req.params;

    const region = await Region.findByPk(id);
    if (!region) {
      return res.status(404).json({ message: "Region not found" });
    }

    await region.destroy();
    res.status(200).json({ message: "Region deleted successfully" });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

module.exports = {
  addRegion,
  getAllRegions,
  getRegion,
  updateRegion,
  deleteRegion,
};
