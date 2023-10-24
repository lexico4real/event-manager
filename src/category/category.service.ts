import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { AddCategoryDto } from './dto/create-category.dto';
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

  async addCategory(addCategoryDto: AddCategoryDto) {
    return await this.categoryRepository.addCategory(addCategoryDto);
  }

  async getAllCategories(): Promise<AddCategoryDto[]> {
    return await this.categoryRepository.getAllCategories();
  }

  async fetchCategoryById(id: number) {
    return await this.categoryRepository.fetchCategoryById(id);
  }

  async getsubtree(parentId: number): Promise<Category> {
    return await this.categoryRepository.getsubtree(parentId);
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

  async removeCategory(id: number): Promise<void> {
    const category = await this.categoryRepository.findOneWithDeleted(id);
    if (category === undefined) {
      throw new BadRequestException(`Category with id ${id} is not found`);
    }
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
