import { Router } from "express";
import { __dirname, __filename } from "../utils";
import { getProductsList, saveProduct } from "../services/productUtils";

const realtimeRouter = Router();

realtimeRouter.get("/", (req, res) => {
  const products = getProductsList();
  res.render("realtimeproducts", { products });
});

export default realtimeRouter;
