import  User from '../models/User.js'
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt'

export const checkEmailExists = async (email) => {
    const user = await User.findOne({ email });
    return !!user;
  };

export const FindUserById = async (id) => {
  return await User.findById(id)
}


export const registerService  = async (fullname, email, password) => {

    const EmailExists = await checkEmailExists(email);

    if (EmailExists) throw new Error('Email já existe');

    const passwordHash = await bcrypt.hash(password, 12)

    const newUser = new User({
     fullname, 
     email,
     password: passwordHash
    })

    await newUser.save()
    return newUser
}

export const loginService = async (email, password) => {

    const userVerify = await checkEmailExists(email);

    if (!userVerify) {
      throw new Error('Email não encontrado');
    }

    const comparePass = await bcrypt.compare(password, userVerify.password);

    if (!comparePass) {
      throw new Error('As senha não confere');
    } 

    const { password: _, userWithinfPassword } = userVerify;

    return userWithinfPassword;

}