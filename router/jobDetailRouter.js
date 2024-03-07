const express = require("express");
const router = express.Router();
const jobDetailController = require("../controller/jobDetailController");

router.post('/register',jobDetailController.createJob);
router.get('/',jobDetailController.getallJob);
router.get('/:id',jobDetailController.findById);
router.get('/search/:search',jobDetailController.searchField);
router.get('/auto/:autocomplete',jobDetailController.autoComplete);
module.exports = router;