import { Inject, Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class ResendService {
  constructor(
    @Inject('RESEND_INSTANCE') private readonly resend: Resend,
  ) {}

  async sendWelcomeEmail(to: string, name: string) {
    try {
      const { data, error } = await this.resend.emails.send({
        from: process.env.FROM_EMAIL?? "MuhammadYousaf@resend.dev",
        to,
        subject: 'Welcome to Our App 🎉',
        html: `
          <h1>Hello ${name},</h1>
          <p>Welcome! Your account has been created successfully.</p>
        `,
      });

      if (error) {
        console.error('Email error:', error);
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Resend Exception:', error);
      throw error;
    }
  }
}
