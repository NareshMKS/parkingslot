const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');
const { validateParkInput, validateExitInput } = require('../middleware/validation');

router.get('/slots', parkingController.getSlots);
router.get('/parked', parkingController.getParkedVehicles);
router.post('/park', validateParkInput, parkingController.parkVehicle);
router.post('/exit', validateExitInput, parkingController.exitVehicle);

module.exports = router;
