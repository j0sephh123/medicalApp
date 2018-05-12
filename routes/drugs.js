const express = require("express");
const router = express.Router();


const DrugsController = require('../controllers/drugs');

// Handle incoming GET requests to /orders
router.get("/", DrugsController.drugs_get_all);

router.post("/", DrugsController.drugs_create_drug);

router.get("/:drugId", DrugsController.drugs_get_drug);

router.delete("/:drugId", DrugsController.drugs_delete_drug);

module.exports = router;

