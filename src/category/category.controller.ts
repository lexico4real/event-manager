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
import { AddCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidateId } from 'common/validate-id.decorator';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully created.',
  })
  addCategory(@Body() addCategoryDto: AddCategoryDto) {
    return this.categoryService.addCategory(addCategoryDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Returns all categories.' })
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Get('subtree/:parentId')
  @ApiParam({ name: 'parentId', description: 'Parent ID' })
  @ValidateId()
  @ApiResponse({
    status: 200,
    description: 'Returns the subtree of the specified parent category.',
  })
  async getsubtree(@Param('parentId') parentId: string) {
    return await this.categoryService.getsubtree(+parentId);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ValidateId()
  @ApiResponse({
    status: 200,
    description: 'Returns the category with the specified ID.',
  })
  fetchCategoryById(@Param('id') id: string) {
    return this.categoryService.fetchCategoryById(+id);
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
  removeCategory(@Param('id') id: string) {
    return this.categoryService.removeCategory(+id);
  }

  @Delete('by/:id')
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
