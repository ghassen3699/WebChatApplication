import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import generateWebTokenAndSetCookie from '../utils/generateTokenAcces.js';

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username }); // Added await to the database call

        if (!user || !(await bcrypt.compare(password, user.password))) { // Combined checks to ensure user exists before checking password
            return res.status(400).json({ error: "Invalid username or password" });
        }

        generateWebTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullname,
            username: user.username,
            profilePic: user.profilePic,
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Signup controller
export const signupUser = async (req, res) => {
    try {
        const { fullname, username, password, confirmationPassword, gender } = req.body;

        if (password !== confirmationPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Hash USER PASSWORD 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        });


        if (newUser){
            generateWebTokenAndSetCookie(newUser._id, res)
    
            await newUser.save();
    
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        }else {
            res.status(400).json({error: "Invalid user data"})
        }
        

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};



export const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};