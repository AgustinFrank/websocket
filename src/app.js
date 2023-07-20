import express from "express";
import Engine from "express-handlebars/types";
import { __dirname, __filename } from "./utils";
import productRouter from "./routes/views.router";
import { Server } from "socket.io";
import realtimeRouter from "./routes/realTimeProduct.router";
import { saveProduct } from "./services/productUtils";
const app = Express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.use("/", productRouter);
app.use("/realtime", realtimeRouter);
const httpServer = app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

httpServer.on("error", (error) => {
  console.log(`Error: ${error}`);
});

const ioServer = new Server(httpServer);

ioServer.on("connection", (socket) => {
  console.log("un cliente se ha conectado");
});

ioServer.on("agregarProducto", (newProduct) => {
  saveProduct(newProduct);
  ioServer.emit("nuevoProductoAgregado", newProduct);
});
