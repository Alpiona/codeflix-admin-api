import { UniqueEntityId } from "#seedwork/domain";
import { omit } from "lodash";
import { Category, CategoryProperties } from "./category";

describe("Category Tests", () => {
  beforeEach(() => {
    Category.validate = jest.fn();
  });
  test("Constructor of category", () => {
    let category = new Category({ name: "Movie" });

    const props = omit(category.props, "created_at");

    expect(Category.validate).toHaveBeenCalled();
    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    category = new Category({
      name: "Movie",
      description: "some description",
      is_active: true,
    });

    const created_at = new Date();

    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "some description",
      is_active: true,
      created_at,
    });

    category = new Category({
      name: "Movie",
      description: "other description",
    });

    expect(category.props).toMatchObject({
      name: "Movie",
      description: "other description",
    });

    category = new Category({
      name: "Movie",
      is_active: true,
    });

    expect(category.props).toMatchObject({
      name: "Movie",
      is_active: true,
    });
  });

  describe("id field", () => {
    type CategoryData = { props: CategoryProperties; id?: UniqueEntityId };

    const arrange: CategoryData[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      { props: { name: "Movie" }, id: new UniqueEntityId() },
    ];

    test.each(arrange)("when props is %j", (item) => {
      const category = new Category(item.props, item.id);
      expect(category.id).not.toBeNull();
      expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    });
  });

  test("getter and setter of name prop", () => {
    const category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");

    category["name"] = "other name";
    expect(category.name).toBe("other name");
  });

  test("getter and setter of description prop", () => {
    let category = new Category({ name: "Movie" });
    expect(category.description).toBeNull();

    category = new Category({ name: "Movie", description: "some description" });
    expect(category.description).toBe("some description");

    category["description"] = undefined;
    expect(category.description).toBeNull();

    category["description"] = null;
    expect(category.description).toBeNull();
  });

  test("getter and setter of is_active prop", () => {
    let category = new Category({ name: "Movie" });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: true });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: false });
    expect(category.is_active).toBeFalsy();
  });

  test("getter of created_at prop", () => {
    let category = new Category({ name: "Movie" });
    expect(category.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({ name: "Movie", created_at });
    expect(category.created_at).toBe(created_at);
  });

  test("should update a category", () => {
    const category = new Category({ name: "Movie" });
    category.update("Documentary", "some description");
    expect(Category.validate).toHaveBeenCalledTimes(2);
    expect(category.name).toBe("Documentary");
    expect(category.description).toBe("some description");
  });

  test("should activate category", () => {
    const category = new Category({ name: "Movie", is_active: false });
    category.activate();
    expect(category.is_active).toBeTruthy();
  });

  test("should deactivate category", () => {
    const category = new Category({ name: "Movie", is_active: true });
    category.deactivate();
    expect(category.is_active).toBeFalsy();
  });
});
