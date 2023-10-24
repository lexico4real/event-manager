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
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidateId } from 'common/validate-id.decorator';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully created.',
  })
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Returns all categories.' })
  getCategory() {
    return this.categoryService.getCategory();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ValidateId()
  @ApiResponse({
    status: 200,
    description: 'Returns the category with the specified ID.',
  })
  getCategoryById(@Param('id') id: string) {
    return this.categoryService.getCategoryById(+id);
  }

  @Get('subcategory/:id')
  @ApiParam({ name: 'parentId', description: 'Parent ID' })
  @ValidateId()
  @ApiResponse({
    status: 200,
    description: 'Returns the subcategory of the specified parent category.',
  })
  async getSubCategory(@Param('parentId') parentId: string) {
    return await this.categoryService.getSubCategory(+parentId);
  }

  @Patch(':id/move/:newParentId')
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiParam({ name: 'newParentId', description: 'New Parent ID' })
  @ValidateId()
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully moved.',
  })
  async moveCategory(
    @Param('id') id: string,
    @Param('newParentId') newParentId: string,
  ) {
    return await this.categoryService.moveCategory(+id, +newParentId);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ValidateId()
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully updated.',
  })
  updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(+id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ValidateId()
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully deleted.',
  })
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(+id);
  }

  @Delete('category/:id')
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ValidateId()
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully soft-deleted.',
  })
  softDeleteCategory(@Param('id') id: string) {
    return this.categoryService.softDeleteCategory(+id);
  }

  @Get('restore/:id')
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ValidateId()
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully restored.',
  })
  restoreCategory(@Param('id') id: string) {
    return this.categoryService.restoreCategory(+id);
  }
}
