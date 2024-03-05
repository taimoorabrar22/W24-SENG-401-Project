import {Request, Response} from "express";
import { Recipe  } from "../models";

export const getAllRecipes = async ( req: Request, res: Response) => {
    try {
        const recipes = await Recipe.find({})
        .populate("user", "email")
        .sort({_id:-1})
        .exec();

        return res.status(200).json(recipes);
    } catch (error) {
        console.log(error);
        res
        .status(500)
        .json({error: "An error occurred while processing your request"});
    }
}

export const getUserRecipes = async (req: Request, res: Response) => {
    const {userId} = req.params;
    try {
        const recipes = await Recipe.find({ user: userId})
        .populate("user", "email")
        .sort({_id:-1})
        .exec();

        if(!recipes?.length){
            return res.status(404).json({error: "recipes not found"})
        }
        
        res.status(200).json(recipes);
    } catch (error) {
        console.log(error);
        res
        .status(500)
        .json({error: "An error occurred while processing your request"});
    }
}