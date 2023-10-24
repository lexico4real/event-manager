import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import Logger from 'config/logger';

@Injectable()
export class CategoryService {
  logger: Logger = new Logger();
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.createCategory(createCategoryDto);
  }

  async getCategory(): Promise<CreateCategoryDto[]> {
    return await this.categoryRepository.getCategory();
  }

  async getCategoryById(id: number) {
    return await this.categoryRepository.getCategoryById(id);
  }

  async getSubCategory(parentId: number): Promise<Category> {
    return await this.categoryRepository.getSubCategory(parentId);
  }

  async moveCategory(id: number, newParentId: number): Promise<Category> {
    return await this.categoryRepository.moveCategory(id, newParentId);
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepository.updateCategory(id, updateCategoryDto);
  }

  async softDeleteCategory(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne(id);
    await this.categoryRepository.softDeleteCategory(category);
  }

  async restoreCategory(id: number): Promise<void> {
    const category = await this.categoryRepository.findOneWithDeleted(id);
    await this.categoryRepository.restoreCategory(category);
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.categoryRepository.findOneWithDeleted(id);
    if (category.deletedAt === null) {
      await this.categoryRepository.softDeleteCategory(category);
    } else {
      await this.categoryRepository.deletePermanently(category);
    }
  }

  async getDeletedCategory(): Promise<Category[]> {
    return await this.categoryRepository.findWithDeleted();
  }
}
