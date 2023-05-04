// import db from '../database/database';
import {writeFile, readFile} from 'fs/promises'

interface PetInterface {
    id?: number,
    name: string,
    type: string,
    age: number,
    breed: number
}

async function readData(filename: string): Promise<PetInterface[]> {
    try {
        const data = await readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw error;
    }
}

async function writeData(filename: string, data: PetInterface[]): Promise<void> {
    try {
        const newData = JSON.stringify(data);
        await writeFile(filename, newData);
    } catch (error) {
        throw error;
    }
}

export async function addItem(data: PetInterface): Promise<PetInterface[]> {
    try {
        const db = await readData('./src/pets.txt');
        if (db !== null && db !== undefined) {
            db.push({ id: db.length + 1, ...data });
            await writeData('./src/pets.txt', db);
            return db;
        } else {
            const arrayObj: PetInterface[] = [{ id: 1, ...data }];
            await writeData('./src/pets.txt', arrayObj);
            return arrayObj;
        }
    } catch (error: any) {
        throw new Error(`An error occurred, ${error.message}`);
    }
};

export async function getItem(id: number): Promise<PetInterface | string> {
    try {
        const db = await readData('./src/pets.txt');
        if (db === null || db === undefined) {
            throw new Error("Database or pets array does not exist.");
        }
        const pet = db.filter(pet => pet?.id === id)[0];
        if (!pet) {
            throw new Error("Pet with given ID does not exist.");
        }
        return pet;
    } catch (error: any) {
        throw new Error(`An error occurred, ${error.message}`);
    }
};

export async function listItems(): Promise<PetInterface[] | string> {
    try {
        const db = await readData('./src/pets.txt');
        if (db === null || db === undefined) {
            throw new Error("Database or pets array does not exist.");
        }
        return db;
    } catch (error: any) {
        throw new Error(`An error occurred, ${error.message}`);
    }
};

export async function deleteItem(id: number): Promise<PetInterface[] | string> {
    try {
        const db = await readData('./src/pets.txt');
        if (db === null || db === undefined) {
            throw new Error("Database or pets array does not exist.");
        }
        const index = db.findIndex(pet => pet.id === id);
        if (index === -1) {
            throw new Error('Pet not found')
        } else {
            db.splice(index, 1)
            await writeData('./src/pets.txt', db)
            return db
        }
    } catch (error: any) {
        throw new Error(`An error occurred, ${error.message}`)
    }
};

export async function updateItem (id: number, data: PetInterface): Promise<PetInterface[] | string> {
    try {
        const db = await readData('./src/pets.txt');
        if (db === null || db === undefined) {
            throw new Error("Database or pets array does not exist.");
        }
        const index = db.findIndex(pet => pet.id === id)
        if (index === -1) {
            throw new Error('Pet not found')
        } else {
            const dataWithId = { id, ...data }
            db[index] = dataWithId
            await writeData('./src/pets.txt', db)
            return db
        }
    } catch (error: any) {
        throw new Error(`An error occurred, ${error.message}`)
    }
}

