import express from "express";
import { requireSignIn } from "../midlewares/authMidlewares.js";
import { createPlaceController, getPlaceController, updatePlaceController } from "../controllers/placeController.js";
import { verifyToken } from "../midlewares/jwtMidleware.js";

// rest object
const router = express.Router();


// create place
router.post('/create-place', requireSignIn, createPlaceController)


// update place
router.put('/update-place', requireSignIn, updatePlaceController)


// get-place
router.get('/get-place', requireSignIn, getPlaceController)


export default router;
