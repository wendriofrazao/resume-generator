import { createAndSendOtp, verifyOtp, resetPasswordService } from "../services/otpService.js";
import { checkEmailExists } from "../services/userServices.js";

export async function sendOtp(req, res) {
  try {
    const { email, otpType = 'verify' } = req.body;

    await createAndSendOtp(email, otpType);

    return res.json({ ok: true, message: "OTP enviado com sucesso." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function verifyOtpController(req, res) {
  try {
    const { email, otp, otpType = 'verify' } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ 
        error: 'Email e OTP são obrigatórios.' 
      });
    }

    await verifyOtp(email, otp, otpType);
    const user = await checkEmailExists(email);

    return res.json({ 
      ok: true,
      message: 'Conta verificada com sucesso!',
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        isAccountVerified: user.isAccountVerified
      }
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

export async function resetPassword(req, res) {
    
    try {
      
      const { email, otp, newPassword } = req.body;

      if (!email || !otp || !newPassword) {
        return res.status(400).json({success: false, message: 'campos não preenchidos ou não correspondidos'});
      }

      await resetPasswordService(email, otp, newPassword);

      return res.json({ ok: true, message: "Senha redefinida com sucesso." });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

}