import { Injectable } from '@nestjs/common';
import { MailerService } from '../mailer/mailer.service';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { SendVacationEmailDto, VacationDataDto } from './dto/vacation.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  private calculateDays(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // Include both start and end dates
  }

  private async renderTemplate(
    templateName: string,
    data: any,
  ): Promise<string> {
    const templatePath = path.join(
      __dirname,
      `../templates/${templateName}.hbs`,
    );
    const template = fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = handlebars.compile(template);
    return compiledTemplate({
      ...data,
      name: process.env.SENDER_NAME,
    });
  }

  async sendVacationEmail(requestBody: SendVacationEmailDto) {
    try {
      const { to, data } = requestBody;

      // Handle default dates if not provided
      if (!data.startDate) {
        data.startDate = new Date().toISOString().split('T')[0];
      }
      if (!data.endDate) {
        data.endDate = data.startDate;
      }

      // Calculate total days if not provided or dates have changed
      if (!data.totalDays || data.startDate || data.endDate) {
        data.totalDays = this.calculateDays(data.startDate, data.endDate);
      }

      const html = await this.renderTemplate('vacation', data);
      const subject =
        data.endDate !== data.startDate
          ? `Vacation Request - ${data.startDate} to ${data.endDate}`
          : `Vacation Request - ${data.startDate}`;

      return await this.mailerService.sendMail({
        to,
        subject,
        html,
      });
    } catch (error) {
      throw error;
    }
  }
}
