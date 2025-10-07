import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

const transport = nodemailer.createTransport(
  MailtrapTransport({
    token: "5b5675f37950b8ec8c255c70c9baaf67",
    // token: "1b9341ba9d8c868f80219348d90ab7cd"
  })
);

export const mailSender = {
  address: "hello@demomailtrap.com",
  name: "MyApp OTP",
};

export default transport;