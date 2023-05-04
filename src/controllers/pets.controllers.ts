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
        const pet = await addItem(req.body)
        console.log(pet)
        res.status(201).json({success: true, message: "New pet added", pet})
    } catch (error: any) {
        return res.status(500).json({success: false, message: `Error adding new pet ${error.message}`})
    }
}

export const getPet = async(req: Request, res: Response) => {
    try {
        const pet = await getItem(parseInt(req.params.id));
        if (!pet) {
            res.status(400).send({
                success: false,
                message: "Pet does not exist"
            });
            return;
        };
        res.status(200).json({success: true, pet})
    } catch (error: any) {
        res
        .status(500)
        .json({success: false, message: `Error getting pet ${error.message}`})
    }
};

export const getAllPets = async(req: Request, res: Response) => {
    try {
        const pets = await listItems();
        if (!pets) {
            res.status(400).send({
                success: false,
                message: "No pets in database"
            });
            return;
        };
        res.status(200).json({success: true, pets})
    } catch (error: any) {
        res
        .status(500)
        .json({success: false, message: `Error getting all pets ${error.message}`})
    }
};

export const updatePet = async(req: Request, res: Response) => {
    try {
        const pet = await updateItem(parseInt(req.params.id), req.body)
        res
        .status(200)
        .json({success: true, message: "Pet details successfully updated", pet})
    } catch (error: any) {
        return res
        .status(500)
        .json({success: false, message: `Error updating pet details ${error.message}`})
    }
};

export const deletePet = async(req: Request, res: Response) => {
    try {
        const pet = await deleteItem(parseInt(req.params.id))
        res.status(200).json({success: true, message: "Pet details successfully deleted"})
    } catch (error: any) {
        res
        .status(500)
        .json({success: false, message: `Error deleting pet details ${error.message}`})
    }
};