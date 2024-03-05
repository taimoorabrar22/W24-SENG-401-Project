import {Request, Response} from "express";
import { Recipe  } from "../models";
import { SEARCH_RECIPES, SEARCH_RECIPES_RESPONSE } from "src/@types";

export const searchRecipe = async (req: Request, res: Response) => {
    const {q} = req.query;
    const pipeline = [
        {
          $search: {
                index: "recipe",
                text: {
                query: q,
                path: {
                    wildcard: "*"
                },
                fuzzy: {}
            }
          }
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $project: {
                user: 1,
                note: 1,
                description: 1,
                title: 1,
                ingredients: 1,
                image: 1
            }
        }
    ];

    const recipes: SEARCH_RECIPES[] = await Recipe.aggregate(pipeline);

    let response: SEARCH_RECIPES_RESPONSE[] = [];

    if(!!recipes?.length){
        response = recipes.map((recipe: SEARCH_RECIPES) => {
            const {user, ...rest} = recipe;
            const email = user[0].email
            return {
                user: email,
                ...rest
            }
        })
    }

    res.status(200).json(response);
};

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

export const getRecipe = async (req: Request, res: Response) => {
    const { id } = req.params;

    try{
        const recipe = await Recipe.findById(id).populate('user', 'email').exec();
        if(!recipe){
            return res.status(404).json({error: "recipe not found"});
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({error: "An error occured while processing your request"});
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