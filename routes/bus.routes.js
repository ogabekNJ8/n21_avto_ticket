const router = require("express").Router();
const {
  addBus,
  getAllBuses,
  getBus,
  updateBus,
  deleteBus,
} = require("../controllers/bus.controller");

router.post("/", addBus);
router.get("/", getAllBuses);
router.get("/:id", getBus);
router.patch("/:id", updateBus);
router.delete("/:id", deleteBus);

module.exports = router;
