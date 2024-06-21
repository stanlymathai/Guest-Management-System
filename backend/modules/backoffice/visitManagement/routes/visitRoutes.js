const express = require("express");
const router = express.Router();

const visitorController = require("../controller/visitorController");
const visitController = require("../controller/visitController");

const verifyAuthentication =
  require("../../common/helper").verifyAuthentication;

router.post("/edit-visit", verifyAuthentication, visitController.editVisit);
router.post("/add-visit", verifyAuthentication, visitController.addVisit);

router.post("/visit-by-token", visitController.visitByToken);
router.get("/visit-by-id/:id", verifyAuthentication, visitController.visitById);
router.get(
  "/visit-by-registration-code",
  verifyAuthentication,
  visitController.visitByregistrationCode
);

router.get(
  "/upcoming-visits",
  verifyAuthentication,
  visitController.upcomingVisits
);

router.get("/visits-today", verifyAuthentication, visitController.visitsToday);
router.get("/visit-report", verifyAuthentication, visitController.visitReport);
router.get("/csv-report", verifyAuthentication, visitController.csvReport);

router.get(
  "/calendar-events",
  verifyAuthentication,
  visitController.calendarEvents
);
router.get(
  "/roll-call-list",
  verifyAuthentication,
  visitController.rollCallList
);

//visit actions
router.post("/bolo-passed", verifyAuthentication, visitorController.boloPassed);
router.post("/bolo-failed", verifyAuthentication, visitorController.boloFailed);
router.post("/notify-host", verifyAuthentication, visitorController.notifyHost);
router.post("/confirm-visit", visitorController.confirmVisit);
router.post("/deny-visit", visitorController.denyVisit);

router.post(
  "/self-register",
  verifyAuthentication,
  visitorController.selfRegister
);
router.post(
  "/check-in-visitor",
  verifyAuthentication,
  visitorController.checkInVisitor
);
router.post(
  "/check-out-visitor",
  verifyAuthentication,
  visitorController.checkOutVisitor
);
router.post(
  "/collect-visitor",
  verifyAuthentication,
  visitorController.collectVisit
);
router.post(
  "/remove-visit",
  verifyAuthentication,
  visitorController.removeVisit
);

module.exports = router;
