import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { AddCategoryDto } from './create-category.dto';
import { IsOptional } from 'class-validator';

export class UpdateCategoryDto extends PartialType(AddCategoryDto) {
  @ApiPropertyOptional()
  @IsOptional()
  label?: string;

  @ApiPropertyOptional()
  @IsOptional()
  parentId?: number;
}
