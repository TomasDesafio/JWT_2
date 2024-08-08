import pg from 'pg';
import  'dotenv/config';



//dotenv.config();
const { Pool } = pg

const {PORT,HOST,USER,PASSWORD,DATABASE,JWT_SECRET}=process.env


const config = {
  host: HOST,
  port: PORT,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  allowExitOnIdle: true,
}

export const pool=new Pool(config)
export const JWT_SECRETA=JWT_SECRET


const conexionTest = async () => {
  try {
      await pool.query('SELECT NOW()')
      console.log('Conectado a la base de datos desde config🔥🔥')
  } catch (error) {
      console.log(
          'Error en la conexion a la base de datos desde config ❌',
          error.message
      )
  }
}

conexionTest()

/*const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
})



export default pool*/