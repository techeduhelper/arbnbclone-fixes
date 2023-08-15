import express from "express";
import { requireSignIn } from "../midlewares/authMidlewares.js";
import { createPlaceController, deletePlaceController, getAnyPlacecontroller, getPlaceController, getSinPlaceController, getSinglePlaceController, updatePlaceController } from "../controllers/placeController.js";

// rest object
const router = express.Router();

// create place
router.post('/create-place', requireSignIn, createPlaceController)

// update place
router.put('/update-place/:id', requireSignIn, updatePlaceController)

// get-place
router.get('/get-place', requireSignIn, getPlaceController)

// get All place
router.get('/get-place-all', getAnyPlacecontroller)


// get single place without authentication 
router.get('/single-place/:id', getSinPlaceController)

// get single place using id with authentication
router.get('/get-place/:id', requireSignIn, getSinglePlaceController)

// for delete
router.delete('/delete-place/:id', requireSignIn, deletePlaceController)


export default router;
