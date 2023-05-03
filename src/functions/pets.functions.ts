import db from '../database/database';

export const getItem = (id: number) => {
    try {
        const pet = db?.pets?.filter(pet => pet?.id === id)[0]
        return pet
    } catch (error) {
        console.log("An error occurred, ", error)
    }
};

export const addItem = (data: {name: string;
    type: string;
    age: number;
    breed: string;}
    ) => {
    try {
        const newPet = { id: db.pets.length + 1, ...data }
        console.log(newPet)
        db.pets.push(newPet)
        return newPet
    } catch (error) {
        console.log("An error occurred, ", error)
    }
}