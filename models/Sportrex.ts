import mongoose from "mongoose";




const schema = new mongoose.Schema<{email: string}>({
    email: {
    type: String,
    required: true
  }
})

export default mongoose.model<{email: string}>('sportrex-subscribers', schema)