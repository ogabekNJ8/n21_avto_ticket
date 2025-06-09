const Driver = require("../models/bus_driver.model");
const Bus = require("../models/bus.model");
const { sendErrorresponse } = require("../helpers/send_error_response");

const addDriver = async (req, res) => {
  try {
    const { name, phone_number } = req.body;

    const candidate = await Driver.findOne({ where: { phone_number } });
    if (candidate) {
      return sendErrorresponse(
        { message: "Bunday haydovchi mavjud" },
        res,
        400
      );
    }

    const newDriver = await Driver.create({
      name,
      phone_number,
    });

    res.status(201).json({
      message: "Driver created successfully",
      driver: newDriver,
    });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.findAll({
      include: [
        {
          model: Bus,
          attributes: ["number_plate", "model"],
          through: { attributes: [] },
        },
      ],
      attributes: ["id", "name", "phone_number"],
    });
    res.status(200).json(drivers);
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const getDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await Driver.findByPk(id, {
      include: [
        {
          model: Bus,
          attributes: ["number_plate", "model"],
          through: { attributes: [] },
        },
      ],
    });

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.status(200).json(driver);
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const updateDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone_number } = req.body;

    const driver = await Driver.findByPk(id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    await driver.update({ name, phone_number });

    res.status(200).json({ message: "Driver updated successfully", driver });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const deleteDriver = async (req, res) => {
  try {
    const { id } = req.params;

    const driver = await Driver.findByPk(id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    await driver.destroy();
    res.status(200).json({ message: "Driver deleted successfully" });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

module.exports = {
  addDriver,
  getAllDrivers,
  getDriver,
  updateDriver,
  deleteDriver,
};
