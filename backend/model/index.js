import pool from "../config/index.js";
import bcrypt from "bcryptjs";
try {
  await pool.query("SELECT NOW()");
  console.log("Database connection successful");
} catch (error) {
  console.error("Database connection error:", error);
}

export const getData = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts");

    return rows;
  } catch (error) {
    return error.message;
  }
};

export const registerData = async (usuario) => {
  let { email, password, rol, lenguage } = usuario;

  try {
    const passwordEncriptada = bcrypt.hashSync(password);
    password = passwordEncriptada;
    const query = `INSERT INTO usuarios (email, password, rol,lenguage)VALUES($1, $2, $3,$4)`;
    const values = [email, password, rol, lenguage];
    const res = await pool.query(query, values);
    //console.log(res)
    console.log("[RESPUESTA DB]: ", res.rowCount);
    if (res.rowCount > 0) return "Usuario agregado correctamente";
  } catch (error) {
    console.log("[EROR]: ", error.message);
    return error.message;
  }
};

export const verificarCredenciales = async (usuarios) => {
  let { email, password} = usuarios;
  const values = [email]
  const consulta = "SELECT * FROM usuarios WHERE email = $1"
  const { rows: [usuario], rowCount } = await pool.query(consulta, values)
  console.log(rowCount)
  const { password: passwordEncriptada } = usuario
  const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada)
  console.log(passwordEsCorrecta)
  if (!passwordEsCorrecta || !rowCount)
  throw { code: 401, message: "Email o contraseña incorrecta" }
  }




/*export const editPost = async (id) => {
  try {
    const query =
      "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *";
    const values = [id];
    const response = await pool.query(query, values);
    if (response.rowCount > 0) {
      return response.rows;
    }
  } catch (error) {
    console.log(error);
  }
};

/*export const deletePost = async (id) => {
  try {
    const query = "DELETE FROM posts WHERE id = $1 RETURNING *";
    const values = [id];
    const response = await pool.query(query, values);
    if (response.rowCount > 0) {
      return response.rows;
    }
  } catch (error) {
    console.log(error);
  }
};
*/
