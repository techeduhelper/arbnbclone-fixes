import BookingModel from "../model/BookingModel.js";



export const newBookingController = async (req, res) => {
    try {
        const { place, price, checkIn, checkOut, guest, name, mobno } = req.body;
        const bookingData = await BookingModel.create({ owner: req.user._id, place, price, checkIn, checkOut, guest, name, mobno })
        res.status(200).send({
            success: true,
            message: "Booking Successfully",
            bookingData
        })
    } catch (error) {
        res.status(404).send({
            success: false,
            message: "Error in Booking",
            error
        })
    }

}



// get booking details
export const getBookingController = async (req, res) => {
    try {
        const userId = req.user._id;
        const bookedDetails = await BookingModel.find({ owner: userId }).sort({ createdAt: -1 }).populate('place');
        res.status(200).send({
            success: true,
            message: "See your booking",
            bookedDetails
        });
    } catch (error) {
        console.error('Error fetching user places:', error);
        return res.status(500).send({ message: 'Internal server error' });
    }
}

// cancil booking 
export const cancilBookingController = async (req, res) => {
    try {
        const id = req.params.id;
        const cancilBooking = await BookingModel.findByIdAndDelete(id);

        if (!cancilBooking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Booking cancil successfully',
        });
    } catch (error) {
        console.error('Error in cancil booking:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};