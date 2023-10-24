import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import Logger from 'config/logger';
import { EntityRepository, Repository } from 'typeorm';
import { AddCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

class MockLogger {
  log(level, message, ...args) {
    console.log(`[${level}] ${message}`, ...args);
  }
}

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  private logger = new MockLogger(); // Use the mock logger
  validateId(id: number) {
    if (typeof id !== 'number') {
      throw new BadRequestException('Invalid id. id must be a number.');
    }
  }
  async addCategory(addCategoryDto: AddCategoryDto): Promise<Category> {
    const { parentId } = addCategoryDto;
    const category = this.create({
      ...addCategoryDto,
    });
    if (parentId) {
      this.validateId(addCategoryDto.parentId);
      const parent = await this.fetchCategoryById(parentId);
      category.parent = parent;
    }
    try {
      return await this.save(category);
    } catch (error) {
      new Logger().log('error', 'error', error, 'categoryRepository');
      if (error.code === '23505') {
        throw new HttpException(
          {
            statusCode: HttpStatus.CONFLICT,
            error: 'category already exists',
          },
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(
          {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'something went wrong',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getAllCategories(): Promise<Category[]> {
    const query = this.createQueryBuilder('category');
    const category = await query.getMany();
    return category;
  }

  async fetchCategoryById(id: number): Promise<Category> {
    this.validateId(id);
    const query = this.createQueryBuilder('category');
    query.where('category.id = :id', { id });
    const category = await query.getOne();
    if (!category) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          error: `Not Found`,
          message: `category with the id ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      return category;
    } catch (error) {
      new Logger().log('error', 'error', error, 'categoryRepository');
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'something went wrong',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const { label } = updateCategoryDto;
    this.validateId(id);
    const category = await this.fetchCategoryById(id);
    try {
      category.label = label || category.label;
      category.updatedAt = new Date();
      await this.update(id, {
        ...category,
      });
    } catch (error) {
      new Logger().log('error', 'error', error.message, 'categoryRepository');
      if (error.code === '23505' || error.message.includes('Duplicate entry')) {
        throw new HttpException(
          {
            statusCode: HttpStatus.CONFLICT,
            error: 'category already exists',
          },
          HttpStatus.CONFLICT,
        );
      } else {
        new Logger().log('error', 'error', error.message, 'categoryRepository');
        throw new HttpException(
          {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'something went wrong',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    return category;
  }

  async getsubtree(parentId: number): Promise<Category> {
    this.validateId(parentId);
    await this.fetchCategoryById(parentId);
    return this.findOne(parentId, {
      relations: ['children'],
    });
  }

  async moveCategory(id: number, newParentId: number): Promise<Category> {
    if (id === newParentId) {
      throw new BadRequestException("A category cannot be it's own subtree");
    }
    this.validateId(newParentId);
    this.validateId(id);
    const category = await this.fetchCategoryById(id);
    const newParent = await this.fetchCategoryById(newParentId);

    if (!category || !newParent) {
      throw new BadRequestException('Category or new parent not found');
    }

    category.parent = newParent;
    return this.save(category);
  }

  async softDeleteCategory(category: Category): Promise<void> {
    if (!category) {
      throw new BadRequestException('Category not available');
    }
    category.deletedAt = new Date();
    await this.save(category);
  }

  async restoreCategory(category: Category): Promise<void> {
    if (!category) {
      throw new BadRequestException('Category not available');
    }
    category.deletedAt = null;
    await this.save(category);
  }

  async findOneWithDeleted(id: number): Promise<Category> {
    this.validateId(id);
    return await this.findOne({ id }, { withDeleted: true });
  }

  async findWithDeleted(): Promise<Category[]> {
    return await this.find({ withDeleted: true });
  }

  async deletePermanently(category: Category): Promise<void> {
    await this.remove(category);
  }
}
