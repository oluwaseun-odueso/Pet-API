import {Request, Response} from "express";
import {
    addItem,
    getItem,
    listItems,
    updateItem,
    deleteItem
} from '../functions/pets.functions'

export const addPet = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const response = addItem(req.body)
        res
        .status(201)
        .json({success: true, message: "New pet added"})
    } catch (error: any) {
        res
        .status(500)
        .json({success: false, message: `Error adding new pet ${error.message}`})
    }
}

export const getPet = async(req: Request, res: Response) => {
    try {
        const pet = getItem(parseInt(req.params.id));
        res
        .status(200)
        .json({success: true, pet})
    } catch (error: any) {
        res
        .status(500)
        .json({success: false, message: `Error getting pet ${error.message}`})
    }
};

export const getAllPets = async(req: Request, res: Response) => {
    try {
        const pets = listItems();
        res
        .status(200)
        .json({success: true, pets})
    } catch (error: any) {
        res
        .status(500)
        .json({success: false, message: `Error getting all pets ${error.message}`})
    }
};

export const updatePet = async(req: Request, res: Response) => {
    try {
        const pet = updateItem(parseInt(req.params.id), req.body)
        res
        .status(200)
        .json({success: true, message: "Pet details successfully updated"})
    } catch (error: any) {
        res
        .status(500)
        .json({success: false, message: `Error updating pet details ${error.message}`})
    }
};

export const deletePet = async(req: Request, res: Response) => {
    try {
        const pet = deleteItem(parseInt(req.params.id))
        res
        .status(200)
        .json({success: true, message: "Pet details successfully deleted"})
    } catch (error: any) {
        res
        .status(500)
        .json({success: false, message: `Error deleting pet details ${error.message}`})
    }
};