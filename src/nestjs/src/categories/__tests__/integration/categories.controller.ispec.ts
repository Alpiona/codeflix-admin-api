import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase,
} from 'core/category/application';
import { CategoryRepository } from 'core/category/domain';
import { CATEGORY_PROVIDERS } from '../../../categories/category.providers';
import { CategoriesController } from '../../../categories/categories.controller';
import { CategoriesModule } from '../../../categories/categories.module';
import { ConfigModule } from '../../../config/config.module';
import { DatabaseModule } from '../../../database/database.module';

describe('CategoriesController Integration Tests', () => {
  let controller: CategoriesController;
  let repository: CategoryRepository.Repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DatabaseModule, CategoriesModule],
    }).compile();

    controller = module.get(CategoriesController);
    repository = module.get(
      CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller['createUseCase']).toBeInstanceOf(
      CreateCategoryUseCase.UseCase,
    );
    expect(controller['deleteUseCase']).toBeInstanceOf(
      DeleteCategoryUseCase.UseCase,
    );
    expect(controller['listUseCase']).toBeInstanceOf(
      ListCategoriesUseCase.UseCase,
    );
    expect(controller['getUseCase']).toBeInstanceOf(GetCategoryUseCase.UseCase);
    expect(controller['updateUseCase']).toBeInstanceOf(
      UpdateCategoryUseCase.UseCase,
    );
  });

  it('should create a category', async () => {
    const output = await controller.create({
      name: 'Movie',
    });
    const entity = await repository.findById(output.id);

    expect(entity).toMatchObject({
      id: output.id,
      name: 'Movie',
      description: null,
      is_active: true,
      created_at: output.created_at,
    });

    expect(output.id).toBe(entity.id);
    expect(output.name).toBe('Movie');
    expect(output.description).toBeNull();
    expect(output.is_active).toBeTruthy();
    expect(output.created_at).toStrictEqual(entity.created_at);
  });
});
