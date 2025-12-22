import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "taskear",
  connectionLimit: 10,
};

export const pool = mysql.createPool(config);