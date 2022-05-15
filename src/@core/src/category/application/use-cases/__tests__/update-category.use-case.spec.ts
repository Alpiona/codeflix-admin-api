import UpdateCategoryUseCase from "../update-category.use-case";
import CategoryInMemoryRepository from "../../../infra/repository/category-in-memory.repository";
import NotFoundError from '../../../../@seedwork/errors/not-found.error';
import Category from '../../../domain/entities/category';

describe("UpdateCategoryUseCase Unit Tests", () => {
  let useCase: UpdateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new UpdateCategoryUseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    expect(() => useCase.execute({ id: "fake id", name: "fake" })).rejects.toThrow(
      new NotFoundError("Entity not found using ID fake id")
    );
  });

  it("should update a category", async () => {
    const spyUpdate = jest.spyOn(repository, "update");
    const entity = new Category({name: 'Movie'})
    repository.items=[entity]

    let output = await useCase.execute({ id: entity.id, name: "test" });
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "test",
      description: null,
      is_active: true,
      created_at: entity.created_at,
    });

    const arrange = [
      {input: { id: entity.id, name: "test", description: 'some description' }, expected: {
        id: entity.id,
        name: "test",
        description: 'some description',
        is_active: true,
        created_at: entity.created_at,
      }
    },
    {input: { id: entity.id, name: "test" }, expected: {
      id: entity.id,
      name: "test",
      description: null,
      is_active: true,
      created_at: entity.created_at,
    }},
    {input: { id: entity.id, name: "test", is_active: false }, expected: {
      id: entity.id,
      name: "test",
      description: null,
      is_active: false,
      created_at: entity.created_at,
    }},
    {input: { id: entity.id, name: "test" }, expected: {
      id: entity.id,
      name: "test",
      description: null,
      is_active: false,
      created_at: entity.created_at,
    }},
    {input: { id: entity.id, name: "test", is_active: true }, expected: {
      id: entity.id,
      name: "test",
      description: null,
      is_active: true,
      created_at: entity.created_at,
    }},
    {input:{ id: entity.id, name: "test", is_active: false, description: 'some description' }, expected:{
      id: entity.id,
      name: "test",
      description: 'some description',
      is_active: false,
      created_at: entity.created_at,
    }}
    ]

    for (const i of arrange){
      output = await useCase.execute({
        id: i.input.id,
        name: i.input.name,
        description: i.input.description,
        is_active: i.input.is_active
      });
      expect(output).toStrictEqual({
        id: entity.id,
        name: i.expected.name,
        description: i.expected.description,
        is_active: i.expected.is_active,
        created_at: i.expected.created_at
      })
    }

  })
});
