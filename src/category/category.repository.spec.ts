import { CategoryRepository } from './category.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingModule, Test } from '@nestjs/testing';
import { Category } from './entities/category.entity';
import { AddCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { HttpException } from '@nestjs/common';

describe('CategoryRepository', () => {
  let categoryRepository: CategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Category),
          useClass: CategoryRepository,
        },
      ],
    }).compile();

    categoryRepository = module.get<CategoryRepository>(CategoryRepository);
  });

  describe('addCategory', () => {
    it('should add a category', async () => {
      const addCategoryDto: AddCategoryDto = {
        label: 'some level'
      };
      const result = await categoryRepository.addCategory(addCategoryDto);
      expect(result).toBeInstanceOf(Category);
    });

    it('should handle duplicate category insertion', async () => {
      const addCategoryDto: AddCategoryDto = {
        label: 'some label',
      };
      // Ensure that adding the same category twice throws a conflict exception
      await expect(
        categoryRepository.addCategory(addCategoryDto),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('getAllCategories', () => {
    it('should return an array of categories', async () => {
      const categories = await categoryRepository.getAllCategories();
      expect(categories).toBeInstanceOf(Array);
    });
  });

  describe('fetchCategoryById', () => {
    it('should return a category by ID', async () => {
      const categoryId = 1; // Provide a valid category ID
      const category = await categoryRepository.fetchCategoryById(categoryId);
      expect(category).toBeInstanceOf(Category);
    });

    it('should handle a non-existent category', async () => {
      const invalidCategoryId = 9999; // Provide a non-existent category ID
      // Ensure that fetching a non-existent category throws a not found exception
      await expect(
        categoryRepository.fetchCategoryById(invalidCategoryId),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('updateCategory', () => {
    it('should update a category', async () => {
      const categoryId = 1; // Provide a valid category ID
      const updateCategoryDto: UpdateCategoryDto = {
        // Provide data to update
      };
      const updatedCategory = await categoryRepository.updateCategory(
        categoryId,
        updateCategoryDto,
      );
      expect(updatedCategory).toBeInstanceOf(Category);
    });

    it('should handle duplicate category update', async () => {
      const categoryId = 1; // Provide a valid category ID
      const updateCategoryDto: UpdateCategoryDto = {
        label: 'some label',
      };
      // Ensure that updating a category with the same data throws a conflict exception
      await expect(
        categoryRepository.updateCategory(categoryId, updateCategoryDto),
      ).rejects.toThrow(HttpException);
    });
  });

  // Add more test cases for other repository methods (getsubtree, moveCategory, etc.)

  // ...

  describe('deletePermanently', () => {
    it('should permanently delete a category', async () => {
      const categoryId = 1; // Provide a valid category ID
      const category = await categoryRepository.fetchCategoryById(categoryId);
      await categoryRepository.deletePermanently(category);
      // Ensure that the category is deleted and can't be found anymore
      const deletedCategory = await categoryRepository.findOneWithDeleted(
        categoryId,
      );
      expect(deletedCategory).toBeNull();
    });
  });
});
