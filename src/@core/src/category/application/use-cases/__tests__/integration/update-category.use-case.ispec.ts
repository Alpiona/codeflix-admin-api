import { Category } from "#category/domain";
import { CategoryInMemoryRepository, CategorySequelize } from "#category/infra";
import { NotFoundError } from "#seedwork/domain";
import { setupSequelize } from "#seedwork/infra";
import { UpdateCategoryUseCase } from "../../update-category.use-case";

const { CategorySequelizeRepository, CategoryModel } = CategorySequelize;

describe("UpdateCategoryUseCase Integration Tests", () => {
  let useCase: UpdateCategoryUseCase.UseCase;
  let repository: CategorySequelize.CategorySequelizeRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new UpdateCategoryUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() =>
      useCase.execute({ id: "fake id", name: "fake" })
    ).rejects.toThrow(new NotFoundError("Category not found with ID fake id"));
  });

  it("should update a category", async () => {
    const entity = Category.fake().aCategory().build()
    repository.insert(entity)

    let output = await useCase.execute({ id: entity.id, name: "test" });
    expect(output).toStrictEqual({
      id: entity.id,
      name: "test",
      description: null,
      is_active: true,
      created_at: entity.created_at,
    });

    const arrange = [
      {
        input: { id: entity.id, name: "test", description: "some description" },
        expected: {
          id: entity.id,
          name: "test",
          description: "some description",
          is_active: true,
          created_at: entity.created_at,
        },
      },
      {
        input: { id: entity.id, name: "test" },
        expected: {
          id: entity.id,
          name: "test",
          description: null,
          is_active: true,
          created_at: entity.created_at,
        },
      },
      {
        input: { id: entity.id, name: "test", is_active: false },
        expected: {
          id: entity.id,
          name: "test",
          description: null,
          is_active: false,
          created_at: entity.created_at,
        },
      },
      {
        input: { id: entity.id, name: "test" },
        expected: {
          id: entity.id,
          name: "test",
          description: null,
          is_active: false,
          created_at: entity.created_at,
        },
      },
      {
        input: { id: entity.id, name: "test", is_active: true },
        expected: {
          id: entity.id,
          name: "test",
          description: null,
          is_active: true,
          created_at: entity.created_at,
        },
      },
      {
        input: {
          id: entity.id,
          name: "test",
          is_active: false,
          description: "some description",
        },
        expected: {
          id: entity.id,
          name: "test",
          description: "some description",
          is_active: false,
          created_at: entity.created_at,
        },
      },
    ];

    for (const i of arrange) {
      output = await useCase.execute({
        id: i.input.id,
        name: i.input.name,
        description: i.input.description,
        is_active: i.input.is_active,
      });
      expect(output).toStrictEqual({
        id: entity.id,
        name: i.expected.name,
        description: i.expected.description,
        is_active: i.expected.is_active,
        created_at: i.expected.created_at,
      });
    }
  });
});
