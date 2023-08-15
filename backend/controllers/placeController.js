import placeModel from "../model/placeModel.js";


export const createPlaceController = async (req, res) => {
    try {
        const { title, address, photos, description, price, perks, extrainfo, checkin, checkout, maxguest } = req.body;

        const newPlace = new placeModel({
            owner: req.user._id, title, address, photos, description, perks, price, extrainfo, checkin, checkout, maxguest
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



// get All place added by particullar user 
export const getPlaceController = async (req, res) => {
    try {
        const userId = req.user._id;
        const places = await placeModel.find({ owner: userId }).sort({ createdAt: -1 });
        res.status(200).json({ places });
    } catch (error) {
        console.error('Error fetching user places:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

// get single place using id added by particullar user 
export const getSinPlaceController = async (req, res) => {
    try {
        const { id } = req.params;
        const place = await placeModel.findById(id);
        res.status(200).json({ place });
    } catch (error) {
        console.error('Error fetching user places:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}



// get all place anyone can see

export const getAnyPlacecontroller = async (req, res) => {
    try {
        const allPlaces = await placeModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "All places fetched successfully",
            places: allPlaces,
        });
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
            message: "something went wrong",
            error
        })
    }
}


// update controller
export const updatePlaceController = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            address,
            photos,
            description,
            perks,
            price,
            extrainfo,
            checkin,
            checkout,
            maxguest
        } = req.body;

        const updatedPlace = await placeModel.findByIdAndUpdate(
            id,
            {
                title,
                address,
                photos,
                description,
                perks,
                extrainfo,
                price,
                checkin,
                checkout,
                maxguest
            },
            { new: true }
        );

        if (!updatedPlace) {
            return res.status(404).json({
                success: false,
                message: "No Place found with the given ID"
            });
        }

        return res.json({
            success: true,
            message: "Place updated successfully",
            place: updatedPlace
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the place",
            error
        });
    }
}


// get single place controller
export const getSinglePlaceController = async (req, res) => {
    try {
        const { id } = req.params;
        res.json(await placeModel.findById(id))
    } catch (error) {
        res.status(400).send({
            success: false,
            message: `No Place found with the given ID`,
            error
        })
    }
}



// for delete place

export const deletePlaceController = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedPlace = await placeModel.findByIdAndDelete(id);

        if (!deletedPlace) {
            return res.status(404).json({
                success: false,
                message: "No Place found with the given ID",
            });
        }

        return res.json({
            success: true,
            message: "Place deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the place",
            error,
        });
    }
};