import mongoose from "mongoose";

const Address = {
    address: ''
}


const schema = new mongoose.Schema<typeof Address>({
  address: {
    type: String,
    required: true
  }
})

export default mongoose.model<typeof Address>('sportrex-subscribers', schema)