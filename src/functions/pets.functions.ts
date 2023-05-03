import db from '../database/database';

export const getItem = (id: number) => {
    try {
        if (!db || !db.pets) {
            throw new Error("Database or pets array does not exist.")
        }
        const pet = db.pets.filter(pet => pet?.id === id)[0]
        if (!pet) {
            throw new Error("Pet with given ID does not exist.")
        }
        return pet
    } catch (error: any) {
        console.log("An error occurred, ", error.message)
        return null;
    }
};

export const addItem = (data: {
    name: string;
    type: string;
    age: number;
    breed: string;
}) => {
    try {
        if (!db || !db.pets) {
            throw new Error("Database or pets array does not exist.")
        }
        const newPet = { id: db.pets.length + 1, ...data }
        console.log(newPet)
        db.pets.push(newPet)
        return newPet
    } catch (error: any) {
        console.log("An error occurred, ", error.message)
        return null;
    }
};

export const listItems = () => {
    try {
        if (!db || !db.pets) {
            throw new Error("Database or pets array does not exist.")
        }
        return db.pets[0]
    } catch (error: any) {
        console.log("An error occurred, ", error.message)
        return null;
    }
};

export const deleteItem = (id: number) => {
    try {
        if (!db || !db.pets) {
            throw new Error("Database or pets array does not exist.")
        }
        const index = db.pets.findIndex(pet => pet.id === id)
        if (index === -1) {
            throw new Error('Pet not found')
        } else {
            db.pets.splice(index, 1)
            return db.pets
        }
    } catch (error: any) {
        console.log("An error occurred, ", error.message)
        return null;
    }
};

export const updateItem = (id: number, data: {
    name: string;
    type: string;
    age: number;
    breed: string;
}) => {
    try {
        const index = db.pets.findIndex(pet => pet.id === id)
        if (index === -1) {
            throw new Error('Pet not found')
        } else {
            const dataWithId = { id: index, ...data }
            db.pets[index] = dataWithId
            return db.pets[index]
        }
    } catch (error: any) {
        console.log("An error occurred, ", error.message)
        return null;
    }
}