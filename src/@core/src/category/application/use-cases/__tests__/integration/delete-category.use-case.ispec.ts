import { CategorySequelize } from "#category/infra";
import { NotFoundError } from "#seedwork/domain";
import { setupSequelize } from "#seedwork/infra";
import { DeleteCategoryUseCase } from "../../delete-category.use-case";

const { CategorySequelizeRepository, CategoryModel } = CategorySequelize;

describe("DeleteCategoryUseCase Integration Tests", () => {
  let useCase: DeleteCategoryUseCase.UseCase;
  let repository: CategorySequelize.CategorySequelizeRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new DeleteCategoryUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError("Category not found with ID fake id")
    );
  });

  it("should delete a category", async () => {
    const model = await CategoryModel.factory().create();

    await useCase.execute({ id: model.id });

    const noHasModel = await CategoryModel.findByPk(model.id);

    expect(noHasModel).toBeNull();
  });
});
