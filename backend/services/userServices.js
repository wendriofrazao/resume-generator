import  User from '../models/User.js'
import bcrypt from 'bcrypt'
import { OAuth2Client } from "google-auth-library";

import dotenv from "dotenv";

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const checkEmailExists = async (email) => {
    const user = await User.findOne({ email });
    return user;
  };


export const FindUserById = async (id) => {
  return await User.findById(id)
}

export const findUserByEmail = async (email) => {
  return await User.findOne({ email })
}

export const registerService  = async (fullname, email, password) => {

    const emailExists = await checkEmailExists(email);

    if (emailExists) throw new Error('Email já existe');

    const passwordHash = await bcrypt.hash(password, 12)

    const newUser = new User({
     fullname, 
     email,
     password: passwordHash
    })

    await newUser.save()
    return newUser
}

export const createUserGoogle = async (name, email, sub, picture) => {
  const user = new User({
        fullname: name,
        email,
        provider: "google",
        provider_id: sub,
        profile_picture: picture,
        isAccountVerified: true,
      });
  await user.save();
  return user; 
}

export const loginService = async (email, password) => {

  const userVerify = await checkEmailExists(email);

  if (!userVerify) {
    throw new Error('Email não encontrado');
  }

  const comparePass = await bcrypt.compare(password, userVerify.password);

  if (!comparePass) {
    throw new Error('A senha não confere');
  }

  const { password: _, ...userWithoutPassword } = userVerify._doc || userVerify;

  return userWithoutPassword;

}


export const googleTokenVerification = async (credential) =>{
  const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
  });

  return ticket
}

export const googleLoginRegisterService = async (token) => {
  const ticket = await googleTokenVerification(token);
  const payload = ticket.getPayload();
  const { email, name, picture, sub } = payload;

  let user = await findUserByEmail(email);

  if (!user) {
    user = await createUserGoogle(name, email, sub, picture);
  } else if (!user.provider || user.provider !== "google") {
    user.provider = "google";
    user.provider_id = sub;
    user.profile_picture = picture;
    user.isAccountVerified = true;
    await user.save();
  }

  return user;
};