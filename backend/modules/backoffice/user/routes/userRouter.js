const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ dest: "/temp/uploads/" });

const verifyAuthentication =
  require("../../common/helper").verifyAuthentication;
const userController = require("../controller/userController");

router.get("/get-users/", verifyAuthentication, userController.getUsers);
router.get("/get-user/:id", verifyAuthentication, userController.getUserById);

router.post("/add-user", verifyAuthentication, userController.addUser);

router.put("/edit-user", verifyAuthentication, userController.editUser);

router.get(
  "/current-user/",
  verifyAuthentication,
  userController.getCurrentUser
);

router.delete(
  "/remove-user/:id",
  verifyAuthentication,
  userController.removeUser
);

router.put(
  "/edit-user-password",
  verifyAuthentication,
  userController.changePassword
);

router.post(
  "/send-evac-notice",
  verifyAuthentication,
  userController.sendEvacuationNotice
);

router.get(
  "/get-upload-sheet-url",
  verifyAuthentication,
  userController.getSpreadSheetUrl
);

router.post(
  "/add-hosts",
  [verifyAuthentication, upload.single("bulkUploadFile")],
  userController.addMultipleHosts
);

module.exports = router;
