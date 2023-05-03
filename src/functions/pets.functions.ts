// import db from '../database/database';
import {writeFile, readFile} from 'fs'

async function writeData(filename: string, obj: any): Promise<void> {
    try {
      const newObj = JSON.stringify(obj);
      await writeFileAsync(filename, newObj);
    } catch (error) {
      throw error;
    }
  }
  
function writeFileAsync(filename: string, data: string): Promise<void> {
    return new Promise((resolve, reject) => {
        writeFile(filename, data, (err) => {
        if (err) reject(err);
        else resolve();
        });
    });
}


async function readData(filename: string): Promise<[{
    id: number;
    name: string;
    type: string;
    age: number;
    breed: string;
}]> {
    try {
      const data = await readFileAsync(filename);
      const parsedData = JSON.parse(data);
      return parsedData;
    } catch (error) {
      throw error;
    }
}

function readFileAsync(filename: string): Promise<string> {
    return new Promise((resolve, reject) => {
      readFile(filename, 'utf8', (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

export async function getItem (id: number) {
    try {
        const db = await readData('./pets.txt')
        if (!db) {
            return("Database or pets array does not exist.")
        }
        const pet = db.filter(pet => pet?.id === id)[0]
        if (!pet) {
            return("Pet with given ID does not exist.")
        }
        return pet
    } catch (error: any) {
        throw new Error(`An error occurred, ${error.message}`)
    }
};

export async function addItem (data: {
    name: string;
    type: string;
    age: number;
    breed: string;
}) {
    try {
        const db = await readData('./pets.txt')
        if (!db) {
            return("Database or pets array does not exist.")
        }
        const newPet = { id: db.length + 1, ...data }
        db.push(newPet)
        await writeData('./pets.txt', newPet)
        return newPet
    } catch (error: any) {
        throw new Error(`An error occurred, ${error.message}`)
    }
};

export async function listItems () {
    try {
        const db = await readData('./pets.txt')
        if (!db) {
            return("Database or pets array does not exist.")
        }
        return db
    } catch (error: any) {
        throw new Error(`An error occurred, ${error.message}`)
    }
};

export async function deleteItem (id: number) {
    try {
        const db = await readData('./pets.txt')
        if (!db) {
            return("Database or pets array does not exist.")
        }
        const index = db.findIndex(pet => pet.id === id)
        if (index === -1) {
            return('Pet not found')
        } else {
            db.splice(index, 1)
            await writeData('./pets.text', db)
            console.log(db)
            return db
        }
    } catch (error: any) {
        throw new Error(`An error occurred, ${error.message}`)
    }
};

export async function updateItem (id: number, data: {
    name: string;
    type: string;
    age: number;
    breed: string;
}) {
    try {
        const db = await readData('./pets.txt')
        const index = db.findIndex(pet => pet.id === id)
        if (index === -1) {
            return('Pet not found')
        } else {
            const dataWithId = { id: index, ...data }
            db[index] = dataWithId
            writeData('./pets.text', db)
            console.log(db)
            return db
        }
    } catch (error: any) {
        throw new Error(`An error occurred, ${error.message}`)
    }
}