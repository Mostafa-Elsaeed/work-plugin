import { MailerModule } from './mailer/mailer.module';
import { MailModule } from './mail/mail.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [MailerModule, MailModule],
})
export class AppModule {}
