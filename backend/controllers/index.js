import { getData, registerData,verificarCredenciales } from '../model/index.js'
import jwt from "jsonwebtoken"

export const notFound = (req, res) => {
    
  res.status(404).send("Not found");
}

export const home = (req, res) => {
res.send("Hello World desde controller");
};






export const getUsuarios=async (req, res) => {
  try {
  
    const Authorization = req.header("Authorization")
    const token = Authorization.split("Bearer ")[1]
    console.log(Authorization)
    jwt.verify(token, "az_AZ")
    const { email, id } = jwt.decode(token)
    //await deleteEvento(id)
    res.send(`El usuario ${email} ha eliminado el evento de id ${id}`)
    //const result = await getData()
    //res.json({result})
    
    
  } catch (error) {
    res.status(500).send(error.message)
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
    const usuario = {
      email: req.body.email,
      password: req.body.password,
      
    };

    console.log(usuario)
   
    try {
    console.log(usuario)
    if (usuario.email === undefined || usuario.password === undefined) return res.status(400).json({ message: 'Datos incorrectos' })
    console.log("paso1")
    await verificarCredenciales(usuario)
    console.log("paso2")
    const token = jwt.sign( usuario.email , "az_AZ")
    console.log(token)
    res.send(token)
    
      
    } catch (error) {
      res.status(500).send(error.message);
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


   