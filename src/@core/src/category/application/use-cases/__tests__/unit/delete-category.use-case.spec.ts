import { Category } from "#category/domain";
import { CategoryInMemoryRepository } from "#category/infra";
import { NotFoundError } from "#seedwork/domain";
import { DeleteCategoryUseCase } from "../../delete-category.use-case";

describe("DeleteCategoryUseCase Unit Tests", () => {
  let useCase: DeleteCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError("Entity not found using ID fake id")
    );
  });

  it("should delete a category", async () => {
    const items = [new Category({ name: "Movie" })];
    repository.items = items;

    const spyInsert = jest.spyOn(repository, "findById");
    await useCase.execute({ id: items[0].id });

    expect(spyInsert).toHaveBeenCalledTimes(1);
  });
});
