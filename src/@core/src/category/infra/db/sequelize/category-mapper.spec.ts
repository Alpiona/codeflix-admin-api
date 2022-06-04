import { CategoryModel } from "./category-model";
import { CategoryModelMapper } from "./category-mapper";
import { LoadEntityError, UniqueEntityId } from "#seedwork/domain";
import { Category } from "#category/domain";
import { setupSequelize } from "#seedwork/infra";
describe("CategoryModelMapper Unit Tests", () => {
  setupSequelize({ models: [CategoryModel] });

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
          "name must be shorter than or equal to 255 characters",
          "name should not be empty",
          "name must be a string",
        ],
      });
    }
  });

  it("should throw a generic error", () => {
    const error = new Error("Generic Error");
    const spyValidate = jest
      .spyOn(Category, "validate")
      .mockImplementation(() => {
        throw error;
      });
    const model = CategoryModel.build({
      id: "71047f08-3d5f-48eb-9f09-b8e23a5ca544",
    });
    expect(() => CategoryModelMapper.toEntity(model)).toThrow(error);
    expect(spyValidate).toHaveBeenCalled();
    spyValidate.mockRestore();
  });

  it("should convert a category model to a category entity", () => {
    const created_at = new Date();
    const model = CategoryModel.build({
      id: "71047f08-3d5f-48eb-9f09-b8e23a5ca544",
      name: "some value",
      description: "some description",
      is_active: true,
      created_at,
    });
    const entity = CategoryModelMapper.toEntity(model);
    expect(entity.toJSON()).toStrictEqual(
      new Category(
        {
          name: "some value",
          description: "some description",
          is_active: true,
          created_at,
        },
        new UniqueEntityId("71047f08-3d5f-48eb-9f09-b8e23a5ca544")
      ).toJSON()
    );
  });
});
