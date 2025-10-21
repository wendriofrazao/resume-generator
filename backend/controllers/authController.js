import { googleLoginRegisterService, registerService } from "../services/userServices.js";
import { loginService } from "../services/userServices.js";
import { FindUserById } from '../services/userServices.js'

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

        req.session.userId = user._id;
        await req.session.save();

        return res.status(200).json({ 
            success: true, 
            user: { id: user._id, fullname: user.fullname, email: user.email, isAccountVerified: user.isAccountVerified } 
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

export const GoogleLoginNRegister = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ success: false, message: "Token Google não fornecido" });
    }

    const user = await googleLoginRegisterService(token);

    req.session.userId = user._id;
    await req.session.save();

    const { password: _, ...userWithoutPassword } = user._doc || user;

    return res.status(200).json({
      success: true,
      message: "Login com Google realizado com sucesso",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Erro no GoogleLoginNRegister:", error);
    return res.status(401).json({
      success: false,
      message: `Falha na autenticação com o Google: ${error.message}`,
    });
  }
};


export const Me = async (req, res) => {
  if (req.session.userId) {
    const user = await FindUserById(req.session.userId); 
    return res.json({ user });
  } else {
    return res.json({ user: null });
  }
}