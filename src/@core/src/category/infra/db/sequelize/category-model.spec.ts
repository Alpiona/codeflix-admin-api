import { DataType, Sequelize } from "sequelize-typescript";
import { CategoryModel } from "./category-model";

describe("CategoryModel Unit Tests", () => {
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
    await sequelize.sync({
      force: true,
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("mapping props", () => {
    const attributesMap = CategoryModel.getAttributes();

    const attributes = Object.keys(attributesMap);
    expect(attributes).toStrictEqual([
      "id",
      "name",
      "description",
      "is_active",
      "created_at",
    ]);

    const arrange = [
      {
        field: "id",
        fieldName: "id",
        primaryKey: true,
        type: DataType.UUID(),
      },
      {
        field: "name",
        fieldName: "name",
        allowNull: false,
        type: DataType.STRING(255),
      },
      {
        field: "description",
        fieldName: "description",
        allowNull: true,
        type: DataType.TEXT(),
      },
      {
        field: "is_active",
        fieldName: "is_active",
        allowNull: false,
        type: DataType.BOOLEAN(),
      },
      {
        field: "created_at",
        fieldName: "created_at",
        allowNull: false,
        type: DataType.DATE(),
      },
    ];

    expect(arrange).toHaveLength(attributes.length);

    for (const attr of arrange) {
      expect(attributesMap[attr.field]).toMatchObject(attr);
    }
  });

  it("create", async () => {
    const arrange = {
      id: "589ea793-b5bb-467f-b6c6-86069b1e52f5",
      name: "test",
      is_active: true,
      created_at: new Date(),
    };

    const category = await CategoryModel.create(arrange);

    expect(category.toJSON()).toStrictEqual(arrange);
  });
});
