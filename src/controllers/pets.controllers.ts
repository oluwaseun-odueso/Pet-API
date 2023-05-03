import {Request, Response} from "express";
import {
    addNewPet,
    getAPet,
    getPets
} from '../functions/pets.functions'

export const addPet = async (req: Request, res: Response) => {
    try {
        const response = addNewPet(req.body)
        res
        .status(201)
        .json({success: true, message: "New pet added"})
    } catch (error: any) {
        res
        .status(500)
        .json({success: false, message: `Error adding new pet ${error.message}`})
    }
}

export const getPet = async (req: Request, res: Response) => {
    try {
        const pet = getAPet(parseInt(req.params.id));
        res
        .status(200)
        .json({success: true, pet})
    } catch (error: any) {
        res
        .status(500)
        .json({success: false, message: `Error getting pet ${error.message}`})
    }
};
