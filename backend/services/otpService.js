import bcrypt from "bcrypt";
import { generateOtp } from "../utils/helpers/generateOtp.js"
import { checkEmailExists } from "./userServices.js";
import {Resend} from "resend"
import dotenv from 'dotenv'

dotenv.config()


const OTP_TTL_MS = 5 * 60 * 1000;

const resend = new Resend(process.env.RESEND_TOKEN);

export async function createAndSendOtp(email, otpType = 'verify') {
  try {
    const user = await checkEmailExists(email);
    if (!user) throw new Error('Usuário não encontrado');

    const otp = generateOtp();
    const hash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + OTP_TTL_MS);

    if(otpType === 'verify' && user.isAccountVerified == true){
      throw new Error('Usuário já está verificado');
    }

    if (otpType === 'verify') {
      user.verifyOtp = hash;
      user.verifyOtpExpireAt = expiresAt.getTime();
    } else if (otpType === 'reset') {
      user.resetOtp = hash;
      user.resetOtpExpireAt = expiresAt.getTime();
    } else {
      throw new Error('Tipo de OTP inválido');
    }

    await user.save();

    const text = `Seu código OTP é: ${otp}\nExpira em 5 minutos.`;
    const html = `<p>Seu código OTP é: <b>${otp}</b></p><p>Expira em 5 minutos.</p>`;

   await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: otpType === 'verify'
        ? 'Código de Verificação (OTP)'
        : 'Redefinição de Senha (OTP)',
      text,
      html,
    });

    return true;
  } catch (error) {
    throw error;
  }
}

export async function verifyOtp(email, otp, otpType = 'verify') {
  try {
    const user = await checkEmailExists(email)
    if (!user) {throw new Error('Usuário não encontrado');}

    const storedOtp = user.verifyOtp;
    const storedOtpExpireAt = user.verifyOtpExpireAt;
    const currentTime = Date.now();

    if (!storedOtp) {throw new Error('OTP não encontrado. Solicite um novo código.');}

    if (currentTime > storedOtpExpireAt) {
       user.verifyOtp = '';
       user.verifyOtpExpireAt = 0;
       await user.save()

       throw new Error('OTP expirado. Solicite um novo código.')
    }

    const isOtpValid = await bcrypt.compare(otp, storedOtp);
    if (!isOtpValid) {
      throw new Error('OTP inválido.');
    }

    if (otpType === 'verify') {
      user.verifyOtp = '';
      user.verifyOtpExpireAt = 0;
      user.isAccountVerified = true;
    }

    await user.save();

    return true

  } catch(error) {
    throw error;
  }
}

export async function resetPasswordService(email, otp, newPassword) {

    try {
      
      const user = await checkEmailExists(email);

      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      if (!user.resetOtp) {
        throw new Error('OTP inválido');
      }

       const isOtpValid = await bcrypt.compare(otp, user.resetOtp);
       
      if (!isOtpValid) {
        throw new Error('OTP inválido.');
      }

      if (Date.now() > user.resetOtpExpireAt) {
        throw new Error('OTP expirado.');
      }
      
      if (user.resetOtpExpireAt < Date.now()) {
        throw new Error('OTP expirado');
      }

      const newHashPassword = await bcrypt.hash(newPassword, 12);

      user.password = newHashPassword;
      user.resetOtp = '';
      user.resetOtpExpireAt = 0;

      await user.save();

      return true;

    } catch (error) {
      throw error;
    }

}