import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Confirmation code for ToolBox',
        template: './ActivateAccount',
        context: {
          name: user.username,
          email: user.email,
          code: token,
        },
      });
    } catch (error) {
      console.log('Error sending user confirmation email');
    }
  }

  async sendPasswordReset(user: User, token: string) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Password reset for ToolBox',
        template: './ResetPassword',
        context: {
          name: user.username,
          email: user.email,
          code: token,
        },
      });
    } catch (error) {
      console.log('Error sending password reset email', error);
    }
  }
}
