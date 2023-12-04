
import reward from "../data/rewards.js";

import User from "../models/User.js";

import Reward from "../models/Reward.js";




//get meditations from db
export const getRewards= async (req, res) => {
  try {
   
   const r =  await Reward.find();
      res.json(r)
  
} catch (error) {
  res.json({ error })
}
}

// insert reward
export const addRewards = async (req, res) => {
  try {
    await Reward.insertMany( reward );
    res.json({ msg: "Data Saved Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
};

// add User reward
export const addUserRewards = async (req, res) => {
    try {
     const user = req.body.userId;
     const reward = req.body.selectedRewardId;
     console.log(reward)
      const newUserReward = await Reward.findById(reward)
      if (!newUserReward) {
        return res.status(404).json({ message: 'Reward not found' });
      }
      const existingNewReward = await User.findOne({
        _id: user,
        rewards: { $in: [reward] },
     });
     console.log(existingNewReward)
     if (existingNewReward) {
        console.log('Reward is already saved for the user.');
        throw new Error('Reward is already saved for the user.');
    }

      console.log(newUserReward)
      await User.findByIdAndUpdate(user, {
        $push: { rewards: newUserReward },
    });
      res.json({ msg: "Reward Saved to User!" });
    } catch (error) {
      res.json({ error });
      console.log("ERROR w addUserReward")
    }
  };

  //get User All Rewards
  export const getAllUserRewards = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      //console.log(``)
      const list = await Promise.all(
        user.rewards.map((reward) => {
          return Reward.findById(reward._id);
        })

      );
  
      res.json(list);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };

