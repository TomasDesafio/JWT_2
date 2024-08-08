import {pool} from "../config/index.js";
import jwt from 'jsonwebtoken'
import bcryptjs from "bcryptjs";
import { JWT_SECRETA } from '../config/index.js'





export const getUser = async () => {
  try {
      const SQLQuery = {
          text: 'SELECT * FROM usuarios',
          // text: 'SELECT * FROM usuarios WHERE ID = $1',
          // values: [id],
      }
      const response = await pool.query(SQLQuery)
      return response.rows
  } catch (error) {
      console.log('Error al obtener los usuarios: ', error.message)
      throw error
  }
}


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

/*export const verificarCredenciales = async (usuarios) => {
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
  }*/

  export const verificarCredenciales = async (email, password) => {
    try {
        console.log('Intentando autenticar al usuario:', email)
        const SQLQuery = {
            text: 'SELECT * FROM usuarios WHERE email = $1',
            values: [email],
        }
        const response = await pool.query(SQLQuery)
        const user = response.rows[0]

        if (!user) {
            console.log('Usuario no encontrado:', email)
            throw new Error('Usuario no encontrado')
        }

        const isMatch = await bcryptjs.compare(password, user.password)

        if (!isMatch) {
            console.log('Contraseña incorrecta para el usuario:', email)
            throw new Error('Contraseña incorrecta')
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                rol: user.rol,
            },
            JWT_SECRETA,
            { expiresIn: '1h' }
        )
        return {
            user,
            token,
        }
    } catch (error) {
        console.log('Error en la autenticación: ', error.message)
        throw new Error('Error en la autenticación')
    }
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
