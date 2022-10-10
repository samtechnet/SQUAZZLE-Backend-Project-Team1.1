import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import bodyParser, { json } from "body-parser";
import cors from "cors";
import AppError from "./services/errorHandlers/errors";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app: express.Application = express();
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());



app.all('*', (req: Request, res: Response, next: NextFunction) => {
    throw new AppError(`Requested URL ${req.path} not found!`, 404);
    
});


app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
});