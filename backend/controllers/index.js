import { getUser, registerData,verificarCredenciales } from '../model/index.js'
import jwt from "jsonwebtoken"
import { JWT_SECRETA } from '../config/index.js';

export const notFound = (req, res) => {
    
  res.status(404).send("Not found");
}

export const home = (req, res) => {
res.send("Hello World desde controller");
};


export const getUsuarios = async (req, res) => {
  try {
      const usuarios = await getUser()
      res.status(200).json({ usuarios })
  } catch (error) {
      res.status(500).json({
          message: 'Error al obtener los usuarios',
          error: error.message,
      })
  }
}

    
  



    
  
  
  export const registroUsuarios=async (req, res) => {
    const usuario = {
      email: req.body.email,
      password: req.body.password,
      rol: req.body.rol,
      lenguage: req.body.lenguage
    };

    
   
    try {
    
    if (usuario.email === undefined || usuario.password === undefined || usuario.rol === undefined|| usuario.lenguage === undefined) return res.status(400).json({ message: 'Datos incorrectos' })
    const response = await registerData(usuario)
    res.json({ data: response })
    
      
    } catch (error) {
      res.status(500).send(error.message);
    }
  
  }

  
  export const login=async (req, res) => {
    try {
      const { email, password } = req.body
      if (!email || !password) {
          return res.status(400).json({
              message: 'Campos requeridos faltantes',
              error: 'Por favor, incluya email y password.',
          })
      }
      const { user, token } = await verificarCredenciales(email, password)
      res.status(200).json({ user, token })
  } catch (error) {
      console.error('Error al iniciar sesión:', error.message)
      res.status(401).json({
          message: 'Error al iniciar sesión',
          error: error.message,
      })
  }
  
  }

  /*export const login=async (req, res) => {
    try {
      const {id } = req.params
      
      const response = await editPost(id);
      res.status(200).send('Product edited');
    } catch (error) {
      res.status(500).send(error.message);
    } 
  }*/

  /*export const deletePostcontrollers= async (req, res) => {
    try {
      const id = req.params.id;
      const response = await deletePost(id);
      res.status(200).send('Product deleted successfully'); 
    } catch (error) {
      res.status(500).send(error.message);
    }
  

  }*/


   