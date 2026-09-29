import { User } from "../models/user.model";

export const createUser = async (user) => {
    const newUser = User.create(user)
    return user
}

export const getUserByEmail = async (email) => {
    const user = await User.find({email})
    return user
}

