import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsOptional } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiPropertyOptional()
  @IsOptional()
  label?: string;

  @ApiPropertyOptional()
  @IsOptional()
  parentId?: string;
}
