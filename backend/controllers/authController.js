const User = require("../models/usersModel");
const generateToken = require("../utils/jwtToken")

exports.createUser = async (req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname, !email, !password) {
        res.status(400).json({ message: "all fields are required" });
    }

    try {

        const existingUser = await User.findOne({email});

        if (existingUser) {
            res.status(400).json({ message: "the email is taken!" });
        }

        const user = await User.create({
            fullname,
            email,
            password
        });

        res.status(200).json({
            id:user._id,
            user,
            token: generateToken(user._id)
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "password" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            res.status(400).json({ message: "Invalid password or email" })
        }

        res.status(200).json({
            id:user._id,
            user,
            token:generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.findByIdAndDelete(id);
        if (!deleted) {
            res.status(404).json({ message: "user not found" });
        }

        res.status(200).json({
            message: "User deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: "Error fetching user info", error: error.message });
    }
};