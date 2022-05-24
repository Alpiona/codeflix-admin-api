import { CreateCategoryUseCase, GetCategoryUseCase, ListCategoriesUseCase, UpdateCategoryUseCase } from 'core/category/application';
import { SortDirection } from 'core/dist/@seedwork/domain/repository/repository-contracts';
import { CategoriesController } from './categories.controller';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    controller = new CategoriesController();
  });

  it('should create a category', async () => {
    const expectedOutput: CreateCategoryUseCase.Output = {
      id: 'c87268b2-409e-47ad-97b8-5c59e0a44e40',
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date()
    }
    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
    }

    controller['createUseCase'] = mockCreateUseCase as any;
    const input: CreateCategoryDto = {
      name: "Movie",
      description: "some description",
      is_active: true
    }
    const output = await controller.create(input)
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input)
    expect(output).toStrictEqual(expectedOutput);
  });

  it('should update a category', async () => {
    const id = 'c87268b2-409e-47ad-97b8-5c59e0a44e40'
    const expectedOutput: UpdateCategoryUseCase.Output = {
      id,
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date()
    }
    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
    }

    controller['updateUseCase'] = mockCreateUseCase as any;
    const input: UpdateCategoryDto = {
      name: "Movie",
      description: "some description",
      is_active: true
    }
    const output = await controller.update(id, input)
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith({id, ...input})
    expect(output).toStrictEqual(expectedOutput);
  });

  it('should delete a category', async () => {
    const id = 'c87268b2-409e-47ad-97b8-5c59e0a44e40'
    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve({}))
    }

    controller['deleteUseCase'] = mockCreateUseCase as any;
    await controller.remove(id)
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith({id})
  });

  it('should get a category', async() => {
    const id = 'c87268b2-409e-47ad-97b8-5c59e0a44e40'
    const expectedOutput: GetCategoryUseCase.Output = {
      id,
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date()
    }
    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
    }

    controller['getUseCase'] = mockCreateUseCase as any;
    const output = await controller.findOne(id)
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith({id})
    expect(output).toStrictEqual(expectedOutput);
  });

  it('should list categories', async() => {
    const id = 'c87268b2-409e-47ad-97b8-5c59e0a44e40'
    const expectedOutput: ListCategoriesUseCase.Output = {
      items: [{
      id,
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date()
    }],
    current_page: 1,
    last_page: 1,
    per_page: 1,
    total: 1
  }

    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
    }

    const input = {
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'desc' as SortDirection,
      filter: 'test'
    }

    controller['listUseCase'] = mockCreateUseCase as any;
    const output = await controller.search(input)
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input)
    expect(output).toStrictEqual(expectedOutput);
  });

});
