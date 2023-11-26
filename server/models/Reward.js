import mongoose from "mongoose";
const RewardSchema = new mongoose.Schema({
  title: String,
    description: String,
    img: String,
  });

  export default mongoose.model('Reward', RewardSchema) 

  // import mongoose from "mongoose";
  // export default mongoose.model('Meditation', UserSchema) 

