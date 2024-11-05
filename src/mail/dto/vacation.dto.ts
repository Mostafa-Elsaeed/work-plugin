import {
  IsString,
  IsNumber,
  IsEmail,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class VacationDataDto {
  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;

  @IsOptional()
  @IsNumber()
  totalDays?: number;

  @IsString()
  reason: string;
}

export class SendVacationEmailDto {
  @IsEmail()
  to: string;

  @ValidateNested()
  @Type(() => VacationDataDto)
  data: VacationDataDto;
}
