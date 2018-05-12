const express = require("express");
const router = express.Router();


const GroupController = require('../controllers/groups');


router.post("/", GroupController.groups_create_group); // done
 
router.get("/", GroupController.groups_get_all); // done

router.get("/:productId", GroupController.groups_get_group);  // done

router.patch("/:productId", GroupController.groups_update_group); // done

router.delete("/:productId", GroupController.groups_delete); // done

module.exports = router;