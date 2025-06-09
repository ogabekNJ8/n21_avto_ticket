const BusDriver = require("../models/bus_driver.model");
const Bus = require("../models/bus.model");
const Driver = require("../models/bus_driver.model");
const { sendErrorresponse } = require("../helpers/send_error_response");

const addBusDriver = async (req, res) => {
  try {
    const { bus_id, driver_id } = req.body;

    const candidate = await BusDriver.findOne({ where: { bus_id, driver_id } });
    if (candidate) {
      return sendErrorresponse(
        { message: "Bunday bog'lanish mavjud" },
        res,
        400
      );
    }

    const newBusDriver = await BusDriver.create({
      bus_id,
      driver_id,
    });

    res.status(201).json({
      message: "Bus-Driver created successfully",
      busDriver: newBusDriver,
    });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

const getAllBusDrivers = async (req, res) => {
  try {
    const busDrivers = await BusDriver.findAll({
      include: [
        {
          model: Bus,
          attributes: ["number_plate", "model"],
        },
        {
          model: Driver,
          attributes: ["name", "phone_number"],
        },
      ],
      attributes: ["id", "bus_id", "driver_id"],
    });
    res.status(200).json(busDrivers);
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const getBusDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const busDriver = await BusDriver.findByPk(id, {
      include: [
        {
          model: Bus,
          attributes: ["number_plate", "model"],
        },
        {
          model: Driver,
          attributes: ["name", "phone_number"],
        },
      ],
    });

    if (!busDriver) {
      return res.status(404).json({ message: "Bus-Driver not found" });
    }

    res.status(200).json(busDriver);
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const updateBusDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const { bus_id, driver_id } = req.body;

    const busDriver = await BusDriver.findByPk(id);
    if (!busDriver) {
      return res.status(404).json({ message: "Bus-Driver not found" });
    }

    await busDriver.update({ bus_id, driver_id });

    res
      .status(200)
      .json({ message: "Bus-Driver updated successfully", busDriver });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const deleteBusDriver = async (req, res) => {
  try {
    const { id } = req.params;

    const busDriver = await BusDriver.findByPk(id);
    if (!busDriver) {
      return res.status(404).json({ message: "Bus-Driver not found" });
    }

    await busDriver.destroy();
    res.status(200).json({ message: "Bus-Driver deleted successfully" });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

module.exports = {
  addBusDriver,
  getAllBusDrivers,
  getBusDriver,
  updateBusDriver,
  deleteBusDriver,
};
