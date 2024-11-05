import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

interface IMailOptions {
  to: string | string[];
  subject: string;
  html: string;
  attachments?: any[];
}

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendMail(options: IMailOptions) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      ...options,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
