import Users from "../models/Users.js";

// Get user by ID
export const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await Users.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get All Users
export const getUsers = async (_req, res) => {
  try {
    const users = await Users.find().select("-password");

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    const newUser = new Users(req.body);
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update user by ID
export const updateUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const updatedUser = await Users.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "No user found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete user by ID
export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const deletedUser = await Users.findByIdAndDelete(userId).select(
      "-password"
    );

    if (!deletedUser) {
      return res.status(404).json({ message: "No user found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
