const express = require("express");
const router = express.Router();
const jobDetailController = require("../controller/jobDetailController");

router.post('/register',jobDetailController.createJob);
router.get('/',jobDetailController.getallJob);
router.get('/:id',jobDetailController.findById);
module.exports = router;