// import db from '../database/database';
import {writeFile, readFile} from 'fs/promises'

// // async function writeData(filename: string, data: any): Promise<void> {
// //     try {
// //       const newData = JSON.stringify(data);
// //       await writeFileAsync(filename, newData);
// //     } catch (error) {
// //       throw error;
// //     }
// //   }
  
// // function writeFileAsync(filename: string, data: string): Promise<void> {
// //     return new Promise((resolve, reject) => {
// //         writeFile(filename, data, (err) => {
// //         if (err) reject(err);
// //         else resolve();
// //         });
// //     });
// // };

// // async function readData(filename: string): Promise<[{
//     // id: number;
//     // name: string;
//     // type: string;
//     // age: number;
//     // breed: string;
// // }]> {
// //     try {
// //       const data = await readFileAsync(filename);
// //       const parsedData = JSON.parse(data);
// //       return parsedData;
// //     } catch (error) {
// //       throw error;
// //     }
// // }

// // function readFileAsync(filename: string): Promise<string> {
// //     return new Promise((resolve, reject) => {
// //       readFile(filename, 'utf8', (err, data) => {
// //         if (err) reject(err);
// //         else resolve(data);
// //       });
// //     });
// //   }

interface PetInterface {
    id?: number,
    name: string,
    type: string,
    age: number,
    breed: number
}

// function readData (filename: string): {
//     readFile(filename, 'utf8', (error, data) => {
//         if (error) throw error

//         const petData = JSON.parse(data);
//         console.log(petData)
//         return petData
//     })
// }

// function writeData (filename: string, data: PetInterface) {
//     const newPet = JSON.stringify(data)
//     writeFile(filename, newPet, (error) => {
//         if (error) throw error;
//     })
// }

// // export async function addItem (data: PetInterface) {
// //     try {
// //         const db: any = readData('./src/pets.txt')
// //         if (!db) {
// //             const arrayObj: PetInterface[] = []
// //             arrayObj.push({ id: 1, ...data })
// //             console.log(arrayObj)
// //             writeData('./src/pets.txt', arrayObj)
// //             return arrayObj;
// //         } else {
// //             // const newPet = { id: db.length + 1, ...data }
// //             db.push({ id: db.length + 1, ...data })
// //             writeData('./src/pets.txt', db)
// //             return db;
// //         }
// //     } catch (error: any) {
// //         throw new Error(`An error occurred, ${error.message}`)
// //     }
// // };
// export async function addItem(data: PetInterface) {
//     try {
//         const db = await readData('./src/pets.txt');
//         if (db !== null && db !== undefined) {
//             db.push({ id: db.length + 1, ...data });
//             writeData('./src/pets.txt', db);
//             return db;
//         } else {
//             const arrayObj: PetInterface[] = [{ id: 1, ...data }];
//             writeData('./src/pets.txt', arrayObj);
//             return arrayObj;
//         }
//     } catch (error: any) {
//         throw new Error(`An error occurred, ${error.message}`);
//     }
// };


// export async function getItem (id: number) {
//     try {
//         const db = readData('./src/pets.txt')
//         if (!db) {
//             return("Database or pets array does not exist.")
//         }
//         const pet = db.filter(pet => pet?.id === id)[0]
//         if (!pet) {
//             return("Pet with given ID does not exist.")
//         }
//         return pet
//     } catch (error: any) {
//         throw new Error(`An error occurred, ${error.message}`)
//     }
// };

// export async function listItems () {
//     try {
//         const db = readData('./src/pets.txt')
//         if (!db) {
//             return("Database or pets array does not exist.")
//         }
//         return db
//     } catch (error: any) {
//         throw new Error(`An error occurred, ${error.message}`)
//     }
// };

// export async function deleteItem (id: number) {
//     try {
//         const db = readData('./src/pets.txt')
//         if (!db) {
//             return("Database or pets array does not exist.")
//         }
//         const index = db.findIndex(pet => pet.id === id)
//         if (index === -1) {
//             return('Pet not found')
//         } else {
//             db.splice(index, 1)
//             writeData('./src/pets.text', db)
//             console.log(db)
//             return db
//         }
//     } catch (error: any) {
//         throw new Error(`An error occurred, ${error.message}`)
//     }
// };

// export async function updateItem (id: number, data: {
//     name: string;
//     type: string;
//     age: number;
//     breed: string;
// }) {
//     try {
//         const db = readData('./src/pets.txt')
//         const index = db.findIndex(pet => pet.id === id)
//         if (index === -1) {
//             return('Pet not found')
//         } else {
//             const dataWithId = { id: index, ...data }
//             db[index] = dataWithId
//             writeData('./pets.text', db)
//             console.log(db)
//             return db
//         }
//     } catch (error: any) {
//         throw new Error(`An error occurred, ${error.message}`)
//     }
// }



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
            await writeData('./src/pets.text', db)
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
            const dataWithId = { id: index, ...data }
            db[index] = dataWithId
            await writeData('./pets.text', db)
            return db
        }
    } catch (error: any) {
        throw new Error(`An error occurred, ${error.message}`)
    }
}

