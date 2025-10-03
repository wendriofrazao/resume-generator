import { registerService } from "../services/userServices";

export const Register = async (req, res) => {
    const {fullname, email, password} = req.body;
    try{
     const user = await registerService(fullname, email, password)
     res.status(201).json({
        message: "Usuário criado com sucesso",
        id: user._id,
        email: user.email
     })
    } catch(error){
     res.status(500).json({success: false, message:`${error}`})
    }
}