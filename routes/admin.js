const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {
  bloodCategory,
  totalSignUp,
  login,
  deletePresident,
  deletedoner,
  approvalList,
  approve,
  deletelist,
  searchDoner,
  searchapproval,
  changePassword,
  addAdv,
  addAd,
} = require("../controller/admincont");
const { searchPresident } = require("../controller/cont");
const { adminAuthMiddleWare } = require("../Auth/adminauth");
const path = require("path");
const add = require("../models/add");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// admin login
router.post("/login", login);

router.post("/total/blood", adminAuthMiddleWare, bloodCategory);
router.post("/total-signup", totalSignUp);
router.delete("total-signup/delete/:id", adminAuthMiddleWare, deletePresident);
router.delete("/total/blood/:id", adminAuthMiddleWare, deletedoner);
// approval
router.get("/approval-list", adminAuthMiddleWare, approvalList);
router.post(
  "/approval-list/approve/:id",
  adminAuthMiddleWare,
  approve,
  deletelist
); // approve president
router.delete("/approval-list/delete/:id", adminAuthMiddleWare, deletelist); // delete president approval list

router.post("/search-president", adminAuthMiddleWare, searchPresident); //search president
router.post("/search-doner", searchDoner);
router.post("/approval-list/search", adminAuthMiddleWare, searchapproval);
router.post("/add-ads", adminAuthMiddleWare, upload.single("image"), addAd);
router.post("/add-adv", adminAuthMiddleWare, upload.single("image"), addAdv);
router.post("/change-password", adminAuthMiddleWare, changePassword);

mongoose.connect(process.env.CONNECTION_URI).then(() => {
  console.log("server started");
});

module.exports = router;
