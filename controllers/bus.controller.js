const Bus = require("../models/bus.model");
const Driver = require("../models/bus_driver.model");
const { sendErrorresponse } = require("../helpers/send_error_response");

const addBus = async (req, res) => {
  try {
    const { number_plate, seat_count, model } = req.body;

    const candidate = await Bus.findOne({ where: { number_plate } });
    if (candidate) {
      return sendErrorresponse({ message: "Bunday avtobus mavjud" }, res, 400);
    }

    const newBus = await Bus.create({
      number_plate,
      seat_count,
      model,
    });

    res.status(201).json({
      message: "Bus created successfully",
      bus: newBus,
    });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.findAll({
      include: [
        {
          model: Driver,
          attributes: ["name", "phone_number"],
          through: { attributes: [] },
        },
      ],
      attributes: ["id", "number_plate", "seat_count", "model"],
    });
    res.status(200).json(buses);
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const getBus = async (req, res) => {
  try {
    const { id } = req.params;
    const bus = await Bus.findByPk(id, {
      include: [
        {
          model: Driver,
          attributes: ["name", "phone_number"],
          through: { attributes: [] },
        },
      ],
    });

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.status(200).json(bus);
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const updateBus = async (req, res) => {
  try {
    const { id } = req.params;
    const { number_plate, seat_count, model } = req.body;

    const bus = await Bus.findByPk(id);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    await bus.update({ number_plate, seat_count, model });

    res.status(200).json({ message: "Bus updated successfully", bus });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const deleteBus = async (req, res) => {
  try {
    const { id } = req.params;

    const bus = await Bus.findByPk(id);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    await bus.destroy();
    res.status(200).json({ message: "Bus deleted successfully" });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

module.exports = {
  addBus,
  getAllBuses,
  getBus,
  updateBus,
  deleteBus,
};
