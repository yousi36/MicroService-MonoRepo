// mail.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendWelcomeEmail(email: string, name: string) {
    return this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to MyApp!',
      template: 'welcome', // file: templates/welcome.hbs
      context: { name },
    });
  }
}
