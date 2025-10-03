import  User from '../models/User.js'
import bcrypt from 'bcrypt'

export const checkEmailExists = async (email) => {
    const user = await User.findOne({ email });
    return !!user;
  };

export const FindUserById = async (id) => {
  return await User.findById(id)
}


export const registerService  = async (fullname, email, password, confirmpass) => {

    const EmailExists = await Promise(checkEmailExists(email))

    if (EmailExists) throw new Error('Email já existe');

    const passwordHash = bcrypt.hash(password, 12)

    const newUser = new User({
     fullname, 
     email,
     password: passwordHash
    })

    await newUser.save()
    return newUser
}

export const loginService = async (req, res) => {

    const userVerify = await Promise(checkEmailExists(email));

    if (!userVerify) {
      throw new Error('Email não existente');
    }

}