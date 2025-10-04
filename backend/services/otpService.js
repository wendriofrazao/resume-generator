import bcrypt from "bcrypt";
import transport, { mailSender } from "../configs/mailtrap.js";
import { generateOtp } from "../utils/helpers/generateOtp.js"


const OTP_TTL_MS = 5 * 60 * 1000;
const otps = new Map();

export async function createAndSendOtp(email) {
  const otp = generateOtp();
  const hash = await bcrypt.hash(otp, 10);
  const expiresAt = Date.now() + OTP_TTL_MS;

  otps.set(email, { hash, expiresAt, attempts: 0 });

  const text = `Seu código OTP é: ${otp}\nExpira em 5 minutos.`;
  const html = `<p>Seu código OTP é: <b>${otp}</b></p><p>Expira em 5 minutos.</p>`;

  await transport.sendMail({
    from: mailSender,
    to: email,
    subject: "Código de Verificação (OTP)",
    text,
    html,
  });

  return true;
}