import Mood from "../models/Mood.js";
import User from "../models/User.js";

// export const addMoodRecord = ({ userId, date, mood }) => async (dispatch) => {
//   dispatch(setLoading(true));

//   try {
//     // Send the mood data to the server with the userId
//     const response = await axios.post('/api/addMood', { userId, date, mood });

//     if (response.status === 201) {
//       // Optionally, update the local state after a successful record addition
//       dispatch(fetchMoodData());
//       dispatch(setLoading(false));
//       dispatch(setError(null));
//     } else {
//       throw new Error('Failed to add mood record');
//     }
//   } catch (error) {
//     dispatch(setLoading(false));
//     dispatch(setError(error.message));
//   }
// };


export const addMoodRecord = async (req, res) => {
  try {
    
    const {userId, date, mood} = req.body
    const user = await User.findById(userId);
    //const moodModel = await Mood.findById(req.body.userId);
    if (!user) {
      throw new Error('User not found. Meditation not saved.');
  } 
   const newSavedMood = new Mood({
    username: user.username,
    date:date,
    mood: mood,
    userId: user._id,
})
    await newSavedMood.save();
    await User.findByIdAndUpdate(userId, {
      $push: { mood: newSavedMood },
  });
 
  res.json({ msg: 'Data Saved Successfully...!' });
  console.log(newSavedMood);
  } catch (error) {
    console.error('Error in controllers Mood:', error.message);
      res.json({ msg: 'Error in controllers Mood', error: error.message });
  }
};


export const getMoodData = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      //console.log(`Data getmood`)
      const list = await Promise.all(
        user.mood.map((mood) => {
          console.log(mood._id)
          return Mood.findById(mood._id);
        })
      );
      res.json(list);
    // const moodData = await Mood.find();
    // res.status(200).json(moodData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Mood not get');
  }
};

