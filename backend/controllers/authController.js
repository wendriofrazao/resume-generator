import { registerService } from "../services/userServices.js";
import { loginService } from "../services/userServices.js";

export const Register = async (req, res) => {
    const {fullname, email, password} = req.body;
    try{
     const user = await registerService(fullname, email, password);

     res.status(201).json({success: true,
        message: "Usuário criado com sucesso",
        id: user._id,
        email: user.email
     })

    req.session.userId = user.id;
    req.session.save();

    } catch(error){
     res.status(500).json({success: false, message:`${error}`})
    }
}

export const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        
        const user = await loginService(email, password);

        req.session.userId = user.id;

        req.session.save();

        return res.status(200).json({ 
            success: true, 
            user: { id: user._id, fullname: user.fullname, email: user.email } 
        });

    } catch (error) {
     res.status(500).json({success: false, message:`${error}`})
    }

}

export const Logout = async (req, res) => {

    try {

        req.session.destroy();

        res.status(200).json({ success: true, message: "Usuário deslogado com sucesso!" });

    } catch (error) {

     res.status(500).json({success: false, message:`${error}`});
     
    }
}