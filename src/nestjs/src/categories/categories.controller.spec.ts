import { Test, TestingModule } from '@nestjs/testing';
import { CreateCategoryUseCase } from 'core/category/application';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    controller = new CategoriesController();
  });

  it('should create a category', () => {
    const expectedOutput: CreateCategoryUseCase.Output = {
      id: 'c87268b2-409e-47ad-97b8-5c59e0a44e40',
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date()
    }
    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(expectedOutput)
    }

    controller['createUseCase'] = mockCreateUseCase as any;
    const input: CreateCategoryDto = {
      name: "Movie",
      description: "some description",
      is_active: true
    }
    const output = controller.create(input)
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input)
    expect(output).toStrictEqual(expectedOutput);
  });

  it('should update a category', () => {
    expect(controller).toBeDefined();
  });

  it('should delete a category', () => {
    expect(controller).toBeDefined();
  });

  it('should get a category', () => {
    expect(controller).toBeDefined();
  });

  it('should list a category', () => {
    expect(controller).toBeDefined();
  });

});
