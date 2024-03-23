import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from "../models";
import { CONSTANTS } from "../constants";

const signToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRESIN as string,
    });
};

export const register = async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;

    try {
        const _user = await User.findOne({ email }).select("+password").exec();

        if (_user) {
            return res.status(400).json({ error: "User already exists use another email !" });
        }
        const newUser = await User.create({ email, password: await bcrypt.hash(password, CONSTANTS.SALT) })

        return res
            .status(201)
            .json("User has been created !")
    } catch (error) {
        console.log(error);
        return res.status(500)
            .json({ error: "An error occured while processing your request " })
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;

    try {
        const _user = await User.findOne({ email }).select("+password").exec();

        if (_user) {
            if (!(await bcrypt.compare(password, _user?.password))) {
                return res.status(400).json({ error: "Invalid email or password" });
            }

            const token = signToken(_user?._id);
            return res.status(200).json({ token, email, id: _user?._id });
        } else {
            return res.status(400).json({ error: "User not found, try creating a user !" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500)
            .json({ error: "An error occured while processing your request " })
    }
};

export const update = async (req: Request, res: Response) => {
    const { email, newEmail, newPassword }: { email: string;  newEmail: string; newPassword: string } = req.body;

    try {
        const _user = await User.findOne({ email }).select("+password").exec();
    

        if (_user) {
      
            if(newPassword!=null){
                try {
                const hashedPassword =await bcrypt.hash(newPassword, CONSTANTS.SALT) 

                // Update the user's password in the database
                const result = await User.updateOne({ _id: _user?.id }, { password: hashedPassword });
                return res
                .status(201)
                .json("User password has been updated !")
              } catch (error) {
                console.error('Error updating password:', error);
                return res.status(500)
                .json({ error: "An error occured while processing your request " })
              }
            }
            if(newEmail!=null){
                try {    
                    // Update the user's email in the database
                    const result = await User.updateOne({ _id: _user?.id }, { email: newEmail })
                    return res
                    .status(201)
                    .json("User email has been updated !")
                  } catch (error) {
                    console.error('Error updating password:', error);
                    return res.status(500)
                    .json({ error: "An error occured while processing your request " })
                  }
            }
        } else {
            return res.status(400).json({ error: "User not found, try creating a user !" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500)
            .json({ error: "An error occured while processing your request " })
    }
};


