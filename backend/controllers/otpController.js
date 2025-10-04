import { createAndSendOtp } from "../services/otpService.js";

export async function sendOtp(req, res) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email é obrigatório." });

    await createAndSendOtp(email);
    return res.json({ ok: true, message: "OTP enviado com sucesso." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}