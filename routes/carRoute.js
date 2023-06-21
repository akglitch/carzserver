const express = require('express');
const router = express.Router();
const carcon = require('../controllers/carController')



router.get('/cars', carcon.getCars);


router.get('/cars/:id', carcon.getCarById);


router.post('/cars', carcon.createCar);


router.put('/cars/:id', carcon.updateCar);


router.delete('/cars/:id', carcon.deleteCar);


router.route('/car')
  .post(carcon.createCar)
  .get(carcon.getCars);

router.route('/car/:id')
  .get(carcon.getCarById)
  .patch(carcon.updateCar)
  .delete(carcon.deleteCar);


module.exports = router;
