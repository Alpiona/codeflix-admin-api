import { Category } from "#category/domain";
import { NotFoundError, UniqueEntityId } from "#seedwork/domain";
import { Sequelize } from "sequelize-typescript";
import { CategoryModel } from "./category-model";
import { CategorySequelizeRepository } from "./category-repository";

describe("CategorySequelizeRepository Unit Tests", () => {
  let sequelize: Sequelize;
  let repository: CategorySequelizeRepository;

  beforeAll(() => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      host: ":memory:",
      logging: false,
      models: [CategoryModel],
    });
  });

  beforeEach(async () => {
    repository = new CategorySequelizeRepository(CategoryModel);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should insert a new entity", async () => {
    let category = new Category({ name: "Movie" });
    await repository.insert(category);
    let model = await CategoryModel.findByPk(category.id);
    expect(model.toJSON()).toStrictEqual(category.toJSON());

    category = new Category({
      name: "Movie",
      description: "some description",
      is_active: false,
    });
    await repository.insert(category);
    model = await CategoryModel.findByPk(category.id);
    expect(model.toJSON()).toStrictEqual(category.toJSON());
  });

  it("should throw error when category not found", async () => {
    await expect(repository.findById("fake id")).rejects.toThrow(
      new NotFoundError("Category not found with ID fake id")
    );

    await expect(
      repository.findById(
        new UniqueEntityId("9e894bf4-c484-4a3e-836e-6bb1feeefb3e")
      )
    ).rejects.toThrow(
      new NotFoundError(
        "Category not found with ID 9e894bf4-c484-4a3e-836e-6bb1feeefb3e"
      )
    );
  });

  it("should find category by id", async () => {
    const category = new Category({ name: "Movie" });
    await repository.insert(category);

    let categoryFound = await repository.findById(category.id);
    expect(category.toJSON()).toStrictEqual(categoryFound.toJSON());

    categoryFound = await repository.findById(category.uniqueEntityId);
    expect(category.toJSON()).toStrictEqual(categoryFound.toJSON());
  });

  it("should return all categories", async () => {
    const entity = new Category({ name: "Movie" });
    await repository.insert(entity);
    const entities = await repository.findAll();
    expect(entities).toHaveLength(1);
    expect(JSON.stringify(entities)).toBe(JSON.stringify([entity]));
  });

  it("search", async () => {
    await CategoryModel.factory().create();
    console.log(await CategoryModel.findAll());
  });
});
