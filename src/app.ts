import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
const petRoutes = require('./routes/pets')

dotenv.config();
const port = process.env.PORT || 3000
const app = express();

app.use(express.json())

app.use('/pets', petRoutes);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({success: true, message: "Welcome to the official pet homepage"})
});

app.listen(port, () => console.log(`Server running on port ${port}`))

module.exports = app;