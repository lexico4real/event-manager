import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import Logger from 'config/logger';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { parentId } = createCategoryDto;
    const category = this.create({
      ...createCategoryDto,
    });
    if (parentId) {
      const parent = await this.getCategoryById(parentId);
      category.parent = parent;
    }
    try {
      return await this.save(category);
    } catch (error) {
      new Logger().log('error', 'error', error.message, 'categoryRepository');
      if (error.code === '23505') {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: 'category already exists',
          },
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'something went wrong',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getCategory(): Promise<Category[]> {
    const query = this.createQueryBuilder('category');
    const category = await query.getMany();
    return category;
  }

  async getCategoryById(id: string): Promise<Category> {
    if (id.length !== 36) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `invalid id: ${id}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const query = this.createQueryBuilder('category');
    query.where('category.id = :id', { id });
    const category = await query.getOne();
    if (!category) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `category with the id ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      return category;
    } catch (error) {
      console.log(error);
      new Logger().log('error', 'error', error, 'categoryRepository');
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'something went wrong',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const { label } = updateCategoryDto;
    const category = await this.getCategoryById(id);
    try {
      category.label = label || category.label;
      category.updatedAt = new Date();
      await this.update(id, {
        ...category,
      });
    } catch (error) {
      if (error.code === '23505' || error.message.includes('Duplicate entry')) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: 'category already exists',
          },
          HttpStatus.CONFLICT,
        );
      } else {
        new Logger().log('error', 'error', error.message, 'categoryRepository');
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'something went wrong',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    return category;
  }

  async getSubCategory(parentId: string): Promise<Category> {
    return this.findOne(parentId, {
      relations: ['children'],
    });
  }

  async moveCategory(id: string, newParentId: string): Promise<Category> {
    const category = await this.getCategoryById(id);
    const newParent = await this.getCategoryById(newParentId);

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

  async findOneWithDeleted(id: string): Promise<Category> {
    return await this.findOne({ id }, { withDeleted: true });
  }

  async findWithDeleted(): Promise<Category[]> {
    return await this.find({ withDeleted: true });
  }

  async deletePermanently(category: Category): Promise<void> {
    await this.remove(category);
  }
}
