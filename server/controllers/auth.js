
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
        res.json({
            message: 'Nie ma dostępu',
        }
        )
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