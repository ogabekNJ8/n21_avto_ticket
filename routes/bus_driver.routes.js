const router = require("express").Router();
const {
  addBusDriver,
  getAllBusDrivers,
  getBusDriver,
  updateBusDriver,
  deleteBusDriver,
} = require("../controllers/bus_driver.controller");

router.post("/", addBusDriver);
router.get("/", getAllBusDrivers);
router.get("/:id", getBusDriver);
router.patch("/:id", updateBusDriver);
router.delete("/:id", deleteBusDriver);

module.exports = router;
