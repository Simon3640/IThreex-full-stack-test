import { Router } from "express"
import { employeeRouter } from "./routes/employee";

const router = Router();

//prefix for version 1 of the API
router.use("/employee", employeeRouter);

export { router as apiV1Router };