import {
  CreateCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase,
} from 'core/category/application';
import { SortDirection } from 'core/@seedwork/domain';
import { CategoryPresenter } from '../../presenter/category.presenter';
import { CategoriesController } from '../../categories.controller';
import { CreateCategoryDto } from '../../dto/create-category.dto';
import { UpdateCategoryDto } from '../../dto/update-category.dto';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    controller = new CategoriesController();
  });

  it('should create a category', async () => {
    const output: CreateCategoryUseCase.Output = {
      id: 'c87268b2-409e-47ad-97b8-5c59e0a44e40',
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
    };
    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };

    controller['createUseCase'] = mockCreateUseCase as any;
    const input: CreateCategoryDto = {
      name: 'Movie',
      description: 'some description',
      is_active: true,
    };

    const presenter = await controller.create(input);

    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
    expect(presenter).toBeInstanceOf(CategoryPresenter);
    expect(presenter).toStrictEqual(new CategoryPresenter(output));
  });

  it('should update a category', async () => {
    const id = 'c87268b2-409e-47ad-97b8-5c59e0a44e40';
    const output: UpdateCategoryUseCase.Output = {
      id,
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
    };
    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };

    controller['updateUseCase'] = mockCreateUseCase as any;
    const input: UpdateCategoryDto = {
      name: 'Movie',
      description: 'some description',
      is_active: true,
    };
    const presenter = await controller.update(id, input);
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith({ id, ...input });
    expect(presenter).toBeInstanceOf(CategoryPresenter);
    expect(presenter).toStrictEqual(new CategoryPresenter(output));
  });

  it('should delete a category', async () => {
    const id = 'c87268b2-409e-47ad-97b8-5c59e0a44e40';
    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve({})),
    };

    controller['deleteUseCase'] = mockCreateUseCase as any;
    await controller.remove(id);
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith({ id });
  });

  it('should get a category', async () => {
    const id = 'c87268b2-409e-47ad-97b8-5c59e0a44e40';
    const output: GetCategoryUseCase.Output = {
      id,
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
    };
    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };

    controller['getUseCase'] = mockCreateUseCase as any;
    const presenter = await controller.findOne(id);
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith({ id });
    expect(presenter).toBeInstanceOf(CategoryPresenter);
    expect(presenter).toStrictEqual(new CategoryPresenter(output));
  });

  it('should list categories', async () => {
    const id = 'c87268b2-409e-47ad-97b8-5c59e0a44e40';
    const expectedOutput: ListCategoriesUseCase.Output = {
      items: [
        {
          id,
          name: 'Movie',
          description: 'some description',
          is_active: true,
          created_at: new Date(),
        },
      ],
      current_page: 1,
      last_page: 1,
      per_page: 1,
      total: 1,
    };

    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };

    const input = {
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'desc' as SortDirection,
      filter: 'test',
    };

    controller['listUseCase'] = mockCreateUseCase as any;
    const output = await controller.search(input);
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
    expect(output).toStrictEqual(expectedOutput);
  });
});
