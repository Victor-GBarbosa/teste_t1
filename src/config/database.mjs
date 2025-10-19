import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "teste_database",
  waitForConnections: true,
});

const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Conexão com MySQL estabelecida");
    console.log(
      `Conectado ao banco: ${process.env.DB_NAME || "teste_database"}`
    );
    console.log(
      `Host: ${process.env.DB_HOST || "localhost"}:${
        process.env.DB_PORT || 3306
      }`
    );
    connection.release();
    return true;
  } catch (error) {
    console.error("Erro ao conectar com MySQL:", error.message);
    return false;
  }
};

testConnection();

export default pool;
