import Nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: "5b5675f37950b8ec8c255c70c9baaf67"
  })
);

export const mailSender = {
  address: "hello@demomailtrap.com",
  name: "MyApp OTP",
};

export default transport;