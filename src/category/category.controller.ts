import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  getCategory() {
    return this.categoryService.getCategory();
  }

  @Get(':id')
  getCategoryById(@Param('id') id: string) {
    return this.categoryService.getCategoryById(id);
  }

  @Get('subcategory/:id')
  async getSubCategory(parentId: string) {
    return await this.categoryService.getSubCategory(parentId);
  }

  @Patch(':id/move/:newParentId')
  async moveCategory(id: string, newParentId: string) {
    return await this.categoryService.moveCategory(id, newParentId);
  }

  @Patch(':id')
  updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }

  @Delete('agent/:id')
  softDeleteCategory(@Param('id') id: string) {
    return this.categoryService.softDeleteCategory(id);
  }

  @Get('restore/:id')
  restoreCategory(@Param('id') id: string) {
    return this.categoryService.restoreCategory(id);
  }
}
