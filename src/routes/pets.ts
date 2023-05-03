import express from 'express';
import {
    addPet,
    getPet,
    getAllPets,
    updatePet,
    deletePet
} from '../controllers/pets.controllers'

const router = express.Router();

// Add a pet
router.post('/add', addPet);

// Get a pet
router.get('/get_pet/:id', getPet);

// Get all pets
router.get('/get_pets', getAllPets);

// update a pet 
router.put('/:id', updatePet);

// Delete pet
router.delete('/:id', deletePet)

module.exports = router;