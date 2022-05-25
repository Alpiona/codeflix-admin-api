import { Sequelize } from "sequelize-typescript";
import { CategoryModel } from "./category-model";
import { CategoryModelMapper } from "./category-mapper";
import { LoadEntityError } from "#seedwork/domain";
import { fail } from "assert";

describe("CategoryModelMapper Unit Tests", () => {
  let sequelize: Sequelize;

  beforeAll(() => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      host: ":memory:",
      logging: false,
      models: [CategoryModel],
    });
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should throw error when category is invalid", () => {
    const model = CategoryModel.build({
      id: "17b15399-9725-41fe-ac3b-41f3b201837e",
    });
    try {
      CategoryModelMapper.toEntity(model);
      fail("The category is valid, but it needs throws a LoadEntityError");
    } catch (e) {
      expect(e).toBeInstanceOf(LoadEntityError);
      expect(e.error).toMatchObject({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });
    }
  });
});
