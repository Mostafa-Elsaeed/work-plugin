import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from '../config/env.validation';
import { MailerService } from './mailer.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
