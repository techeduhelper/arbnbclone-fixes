import express from 'express'
import { requireSignIn } from '../midlewares/authMidlewares.js';
import { cancilBookingController, getBookingController, newBookingController } from '../controllers/bookingController.js';


const router = express.Router();
// create booking
router.post('/new-booking', requireSignIn, newBookingController)

// get booking
router.get('/get-booking', requireSignIn, getBookingController)

// cancil booking
router.delete('/cancil-booking/:id', requireSignIn, cancilBookingController)


export default router;