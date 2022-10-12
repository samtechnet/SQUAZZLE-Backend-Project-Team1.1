import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import bodyParser, { json } from "body-parser";
import cors from "cors";
import AppError from "./services/errorHandlers/errors";
import { client } from './services/database/database';
import { errorController } from "./middleware/errrorController";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app: express.Application = express();
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());



app.all('*', (req: Request, res: Response, next: NextFunction) => {
    throw new AppError(`Requested URL ${req.path} not found!`, 404);
    
});

app.use(errorController);
app.listen(PORT, async () => {
   async function run() {
        try {
            await client.connect();
            const connection = await client.db("admin").command({ ping: 1 })
            console.log(connection)
            console.log(`Server started successfulyy on PORT https://localhost:${PORT}`);
        }
         finally {
            await client.close();
        }
    }

    run().catch(console.dir);
   // console.log(`Server started on port ${PORT}`);
});