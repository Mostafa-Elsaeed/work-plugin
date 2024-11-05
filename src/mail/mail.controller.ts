import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendVacationEmailDto } from './dto/vacation.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('vacation')
  async sendVacationEmail(@Body() body: SendVacationEmailDto) {
    return this.mailService.sendVacationEmail(body);
  }
}
