import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  parentId?: number;
}
