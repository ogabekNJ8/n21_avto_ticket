const router = require("express").Router();
const {
  addDriver,
  getAllDrivers,
  getDriver,
  updateDriver,
  deleteDriver,
} = require("../controllers/driver.controller");

router.post("/", addDriver);
router.get("/", getAllDrivers);
router.get("/:id", getDriver);
router.patch("/:id", updateDriver);
router.delete("/:id", deleteDriver);

module.exports = router;
