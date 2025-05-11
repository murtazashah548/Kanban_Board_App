const express = require("express");
const router = express.Router();
const { createSection, getAllSections } = require("../controllers/sectionController");

router.post("/", createSection);
router.get("/", getAllSections);

module.exports = router;
