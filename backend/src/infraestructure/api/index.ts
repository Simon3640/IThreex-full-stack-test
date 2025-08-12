import * as express from "express";
import { apiV1Router } from "./v1/router";
import { initializeInfrastructure } from "../..";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
//Cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});


initializeInfrastructure();

app.use("/api/v1", apiV1Router);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

