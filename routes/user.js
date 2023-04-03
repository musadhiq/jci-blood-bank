const express = require("express");
const router = express.Router();
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {
  createDoner,
  searchBlood,
  searchPlace,
  login,
  createapproval,
  searchPresident,
} = require("../controller/cont");
const { presidentAuthMiddleWare } = require("../Auth/presidentAuth");
router.post("/register", createDoner); //create doner
router.post("/login", login); //login president
router.post("/searchBlood", presidentAuthMiddleWare, searchBlood);
router.post("/searchPlace", presidentAuthMiddleWare, searchPlace);
router.post("/president-signup", createapproval); //president
router.post("/contact/search", searchPresident);
// router.get("/", (req, res) => {
//   res.sendFile("../uploads/Screenshot 2023-03-06 105933.png");
// });

mongoose.connect(process.env.CONNECTION_URI).then(() => {
  console.log("server started");
});

module.exports = router;
