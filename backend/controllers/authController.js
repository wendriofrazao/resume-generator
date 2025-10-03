import { registerService } from "../services/userServices.js";

export const Register = async (req, res) => {
    const {fullname, email, password, confirmpass} = req.body;
    try{
     const user = await registerService(fullname, email, password, confirmpass)
     res.status(201).json({success: true,
        message: "Usuário criado com sucesso",
        id: user._id,
        email: user.email
     })
    } catch(error){
     res.status(500).json({success: false, message:`${error}`})
    }
}