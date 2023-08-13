import placeModel from "../model/placeModel.js";


export const createPlaceController = async (req, res) => {
    try {
        const { title, address, photos, description, perks, extrainfo, checkin, checkout, maxguest } = req.body;

        const newPlace = new placeModel({
            owner: req.user._id, title, address, photos, description, perks, extrainfo, checkin, checkout, maxguest
        });
        await newPlace.save();
        res.status(201).json({ message: 'Place listing successfully', data: newPlace });
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Something went wrong",
            error

        })
    }
}



// get All place 

export const getPlaceController = async (req, res) => {
    try {
        const userId = req.user._id;
        const places = await placeModel.find({ owner: userId });
        res.status(200).json({ places });
    } catch (error) {
        console.error('Error fetching user places:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}



export const updatePlaceController = () => {
    try {

    } catch (error) {

    }
}