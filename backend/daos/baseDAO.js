import { pool } from "../config/database.js";

export class baseDAO {
  constructor(nomeTabela) {
    this.nomeTabela = nomeTabela;
  }
}