
import userModel from "../model/userModel.js";
import { hassPassword, comparePassword } from '../helpers/authHelper.js'
import JWT from 'jsonwebtoken';
import twilio from 'twilio';




const registerController = async (req, res) => {
    try {
        const { firstname, lastname, email, mobno, password } = req.body
        // for validations use
        if (!firstname) {
            return res.send({ message: 'Firstname is required' })
        }
        if (!lastname) {
            return res.send({ message: 'Lastname is required' })
        }
        if (!email) {
            return res.send({ message: 'Email is required' })
        }
        if (!mobno) {
            return res.send({ message: 'Phone is required' })
        }
        if (!password) {
            return res.send({ message: 'Password is required' })
        }
        // check user
        const existingUser = await userModel.findOne({ email })
        // existing user
        if (existingUser) {
            return res.status(200).send({
                status: 'false',
                message: 'Already register please login'
            })
        }
        console.log("register checking", req.body)
        // resgister user
        const hashedPassword = await hassPassword(password)
        //save
        const user = await new userModel({ firstname, lastname, email, mobno, password: hashedPassword, }).save()
        res.status(201).send({
            success: true,
            message: 'User registered succesfully',
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Internal server error",
            error
        })
    }
};

export default registerController;


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // validation 
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email and password"
            })
        }
        // checking user
        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error("Email not found")
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            res.status(200).send({
                success: false,
                message: "Incorrect Password!"
            })
        }
        // token creating
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '15d' });
        res.status(200).send({
            success: true,
            message: "Loged in Successfully",
            user: {
                name: user.firstname + " " + user.lastname,
                email: user.email,
                phone: user.mobno,
            },
            token,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Login in error",
            error
        })
    }
}

export const forgetPasswordController = async (req, res) => {
    try {
        const { email, mobno, newPassword } = req.body;
        if (!email) {
            return res.status(401).json({ "message": "Email is required" })
        }
        if (!mobno) {
            return res.status(401).json({ "message": "answer is required" })
        }
        if (!newPassword) {
            return res.status(401).json({ "message": "New Password is required" })
        }

        // check user
        const user = await userModel.findOne({ email, mobno })

        // validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found!"
            })
        }

        const hashed = await hassPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: "Password reset successfully",
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Forget password failed!",
            error
        })
    }
}

// test controller
export const testController = (req, res) => {
    res.send("test controller working fine!!!")
}





// using otp login controller


const AC_twilio = "AC08b8b1b2a69da9c53c0bfa4e5d2fd22f";
const twilio_token = "589b8e79a5b00d12bb44cde7a21e17ba";
const twilio_mobno = "+18787887222";

const twilioClient = twilio(AC_twilio, twilio_token);

export const otpLoginController = async (req, res) => {
    try {
        const { mobno } = req.body;
        const user = await userModel.findOne({ mobno });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Mobile number doesnot exist"
            });
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        await twilioClient.messages.create({
            body: `Your OTP is ${otp}`,
            from: twilio_mobno,
            to: user.mobno,
        });
        res.status(200).send({
            success: true,
            message: 'OTP sent successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({
            success: false,
            message: 'OTP Login Failed!',
            error
        })
    }
}