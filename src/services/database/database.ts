const { MongoClient, ServerApiVersion } = require('mongodb');
import mongoose from "mongoose"
import dotenv from "dotenv";
import connectionParams from "./connection";

dotenv.config();

const {
    ENV,
    password,
    name
} = process.env;

const uri = `mongodb+srv://${name}:${password}@gallery-one-app.h2qyv.mongodb.net/?retryWrites=true&w=majority`;
const connectParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const client = new MongoClient(uri, { useNewUrlParser: true, connectTimeoutMS: 90000, keepAlive: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

if (ENV === 'dev') {
    console.log('I am in dev mode');
  }
  if (ENV === 'prod') {
    console.log('I am in production mode');
  }
  export { client,uri };