
import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//Registration
// Register user
export const register = async (req, res) => {
    try {
        const { email, password, username } = req.body
        console.log(req.body);

        const isUsed = await User.findOne({ username })
        const isUsedEmail = await User.findOne({ email })
        if (isUsed) {
            return res.json({
                message: 'Ten username już jest zajęty.',
            })
        }
        if (isUsedEmail) {
            return res.json({
                message: 'Ten email już jest zajęty.',
            })
        }
        console.log(email, password, username);
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            email,
            password: hash,
            username,
        })

        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        await newUser.save()

        res.json({
            newUser,
            message: 'Regestracja udała się.',
        })
    } catch (error) {
        console.error(error);
        res.json({ message: 'Nie udało się załorzyć konto.' })
    }
}

//Login
export const login =async (req, res) =>{
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.json({
                message: 'Taki użytkownik nie istnieje.',
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.json({
                message: 'Niewlaściwe hasło.',
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        res.json({
            token,
            user,
            message: 'Jesteś w systemie.',
        })
    } catch (error) {
        console.log(error);
        res.json({ message: 'Bląd przy autoryzacji.' })
    }
}

//Get ME
export const getMe =async (req, res) =>{
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.json({
                message: 'Taki użytkownik nie istnieje .',
            })
        }
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        res.json({
            user,
            token,
        })

    } catch (error) {
        // res.json({
        //    // message: 'Nie ma dostępu',
        // }
       // )
    }
}
//add finishedMeditation
export const finishMeditation = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Update the user's finishedMeditations field (you may want to increment it by 1)
      const user = await User.findByIdAndUpdate(
        userId,
        { $inc: { finishedMeditations: 1 } }, // or use $set if you want to set a specific value
        { new: true } // return the updated document
      );
  
      res.json(user);
    } catch (error) {
      console.error('Error finishing meditation:', error);
      res.status(500).json({ error: 'Error finishing meditation' });
    }
  };
//add finishedMeditation
export const finishedDifferentMeditations = async (req, res) => {
    try {
      const userId = req.params.userId;
      const meditationId = req.query.meditationId;

      // Find the user by userId
      const user = await User.findById(userId);

      // Check if the meditation is already finished
      const isAlreadyFinished = user.finishedDifferentMeditations.includes(meditationId);

      if (isAlreadyFinished) {
          return res.json({ message: 'Meditation already finished by the user' });
      }

      // If not finished, update the user document
      const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $push: { finishedDifferentMeditations: meditationId } },
          { new: true }
      );

      res.json(updatedUser);
    } catch (error) {
      console.error('Error finishing meditation:', error);
      res.status(500).json({ error: 'Error finishing meditation' });
    }
  };

  
  //upgrateLevel
  export const upgrateLevel = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const user = await User.findByIdAndUpdate(
        userId,
        { $inc: { level: 1 } }, 
        { new: true } 
      );
  console.log(user.level)
      res.json(user);
    } catch (error) {
      console.error('Error upgrating Level:', error);
      res.status(500).json({ error: 'Error upgrating Level:' });
    }
  };
  
  export const addUserImage = async (req, res) => {
    try {
        const{userId, image} = req.body;
      //const userId = req.params.userId;
        console.log(image);
        
      // Update the user's finishedMeditations field (you may want to increment it by 1)
      const user = await User.findByIdAndUpdate(
        userId,
        {  image: image } , // or use $set if you want to set a specific value
        { new: true } // return the updated document
      );

      res.json(user);
    } catch (error) {
      console.error('Error addUserImage:', error);
      res.status(500).json({ error: 'Error addUserImage:' });
    }
  };
  export const finisheProgramDay = async (req, res) => {
    try {
      const userId = req.body.userId;
      const dayName = req.body.dayName;

      // Find the user by userId
      const user = await User.findById(userId);

      // Check if the meditation is already finished
      const isAlreadyFinished = user?.finishedProgramDays.some(
        (entry) => entry.dayName === dayName
      );
      if (isAlreadyFinished) {
          return res.json({ message: 'Day already finished by the user' });
      }

      // If not finished, update the user document
      const updatedUser = await User.findByIdAndUpdate(
          userId,
          {
            $push: {
              finishedProgramDays: {
                dayName: dayName,
              },
            },
          },
          { new: true }
      );

      res.json(updatedUser);
    } catch (error) {
      console.error('Error finishing meditation:', error);
      res.status(500).json({ error: 'Error finishing meditation' });
    }
  };

  export const changeUserName = async (req, res) => {
    try {
        const{userId, username} = req.body;
      //const userId = req.params.userId;
        console.log(username);
        
      // Update the user's finishedMeditations field (you may want to increment it by 1)
      const user = await User.findByIdAndUpdate(
        userId,
        {  username: username } , // or use $set if you want to set a specific value
        { new: true } // return the updated document
      );
  
      res.json(user);
    } catch (error) {
      console.error('Error changeUserName:', error);
      res.status(500).json({ error: 'Error changeUserName:' });
    }
  };

  export const removeUserImage = async (req, res) => {
    try {
      const userId = req.query.userId;
      
  
      // Find the user by ID
      const user = await User.findById(userId);
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Remove the image from the user's image field
      user.image = '';
  
      // Save the updated user
      await user.save();
  
      res.json({ message: 'Image removed successfully', user });
    } catch (error) {
      console.error('Error removeUserImage:', error);
      res.status(500).json({ error: 'Error removeUserImage' });
    }
  };