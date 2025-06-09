const router = require("express").Router();

const userRouter = require("./user.routes");
const roleRouter = require("./role.routes");
const userRoleRouter = require("./user_role.routes");
const authRouter = require("./auth.routes");
const busRouter = require("./bus.routes");
const driverRouter = require("./driver.routes");
const busDriverRouter = require("./bus_driver.routes");
const regionRouter = require("./region.routes");
const districtRouter = require("./district.routes");


router.use("/user", userRouter);
router.use("/role", roleRouter);
router.use("/user_role", userRoleRouter);
router.use("/auth", authRouter);
router.use("/bus", busRouter);
router.use("/driver", driverRouter);
router.use("/bus_driver", busDriverRouter);
router.use("/region", regionRouter);
router.use("/district", districtRouter);

module.exports = router;
