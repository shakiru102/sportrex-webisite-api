import mongoose from "mongoose";
import { WaitlistProps } from "../types";

const schema = new mongoose.Schema<WaitlistProps>({
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    referrals: {
        type: Number,
        default: 0
    },
    referralCode: {
        type: String,
        required: true
    }
})

export default mongoose.model<WaitlistProps>("waitlist", schema);