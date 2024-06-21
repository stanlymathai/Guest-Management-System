const express = require("express");
const router = express.Router();

const verifyAuthentication =
  require("../../common/helper").verifyAuthentication;

const locationController = require("../controller/locationController");

router.get(
  "/get-locations/",
  verifyAuthentication,
  locationController.getUserLocations
);
router.post("/add-location", [
  verifyAuthentication,
  locationController.addLocation,
]);
router.put(
  "/edit-location",
  verifyAuthentication,
  locationController.editLocation
);
router.delete(
  "/remove-location/:id",
  verifyAuthentication,
  locationController.removeLocation
);
module.exports = router;
