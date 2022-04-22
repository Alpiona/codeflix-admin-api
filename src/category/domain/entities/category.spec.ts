import Category from "./category";
import { omit } from "lodash";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";

describe("Category Tests", () => {
  test("Constructor of category", () => {
    let category = new Category({ name: "Movie" });

    const props = omit(category.props, "created_at");

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

  test("id field", () => {
    const data = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      { props: { name: "Movie" }, id: new UniqueEntityId() },
    ];

    data.forEach((i) => {
      const category = new Category(i.props, i.id);
      expect(category.id).not.toBeNull();
      expect(category.id).toBeInstanceOf(UniqueEntityId);
    });
  });
});
