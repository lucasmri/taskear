import express from "express";
import { usuariosRouter } from "./routes/usuariosRoutes";

const app = express();
const porta = 3000;
app.use(express.json());
app.use("/usuarios", usuariosRouter);

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});