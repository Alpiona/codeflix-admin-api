import { SearchParams, SearchResult } from "./repository-contracts";

describe("SearchParams Unit Test", () => {
  test("page prop", () => {
    const arrange = [
      { page: null, expected: 1 },
      { page: undefined, expected: 1 },
      { page: "", expected: 1 },
      { page: "fake", expected: 1 },
      { page: 0, expected: 1 },
      { page: -4, expected: 1 },
      { page: 5.5, expected: 1 },
      { page: true, expected: 1 },
      { page: false, expected: 1 },
      { page: {}, expected: 1 },
      { page: 5, expected: 5 },
    ];

    arrange.forEach((i) => {
      expect(new SearchParams({ page: i.page } as any).page).toBe(i.expected);
    });
  });

  test("per_page prop", () => {
    const params = new SearchParams();
    expect(params.per_page).toBe(15);

    const arrange = [
      { per_page: null, expected: 15 },
      { per_page: undefined, expected: 15 },
      { per_page: "", expected: 15 },
      { per_page: "fake", expected: 15 },
      { per_page: 0, expected: 15 },
      { per_page: -4, expected: 15 },
      { per_page: 5.5, expected: 15 },
      { per_page: true, expected: 15 },
      { per_page: false, expected: 15 },
      { per_page: {}, expected: 15 },
      { per_page: 5, expected: 5 },
    ];

    arrange.forEach((i) => {
      expect(new SearchParams({ per_page: i.per_page } as any).per_page).toBe(
        i.expected
      );
    });
  });

  test("sort prop", () => {
    const params = new SearchParams();
    expect(params.sort).toBeNull();

    const arrange = [
      { sort: null, expected: null },
      { sort: undefined, expected: null },
      { sort: "", expected: null },
      { sort: 0, expected: "0" },
      { sort: -4, expected: "-4" },
      { sort: 5.5, expected: "5.5" },
      { sort: true, expected: "true" },
      { sort: false, expected: "false" },
      { sort: {}, expected: "[object Object]" },
      { sort: 5, expected: "5" },
      { sort: "field", expected: "field" },
    ];

    arrange.forEach((i) => {
      expect(new SearchParams({ sort: i.sort } as any).sort).toBe(i.expected);
    });
  });

  test("sort_dir prop", () => {
    let params = new SearchParams();
    expect(params.sort_dir).toBeNull();

    params = new SearchParams({ sort: null });
    expect(params.sort_dir).toBeNull();

    params = new SearchParams({ sort: undefined });
    expect(params.sort_dir).toBeNull();

    params = new SearchParams({ sort: "" });
    expect(params.sort_dir).toBeNull();

    const arrange = [
      { sort_dir: null, expected: "asc" },
      { sort_dir: undefined, expected: "asc" },
      { sort_dir: "", expected: "asc" },
      { sort_dir: 0, expected: "asc" },
      { sort_dir: -4, expected: "asc" },
      { sort_dir: 5.5, expected: "asc" },
      { sort_dir: true, expected: "asc" },
      { sort_dir: false, expected: "asc" },
      { sort_dir: {}, expected: "asc" },
      { sort_dir: 5, expected: "asc" },
      { sort_dir: "field", expected: "asc" },
      { sort_dir: "asc", expected: "asc" },
      { sort_dir: "ASC", expected: "asc" },
      { sort_dir: "desc", expected: "desc" },
      { sort_dir: "DESC", expected: "desc" },
    ];

    arrange.forEach((i) => {
      expect(
        new SearchParams({ sort: "field", sort_dir: i.sort_dir } as any)
          .sort_dir
      ).toBe(i.expected);
    });
  });

  test("filter prop", () => {
    const params = new SearchParams();
    expect(params.filter).toBeNull();

    const arrange = [
      { filter: null, expected: null },
      { filter: undefined, expected: null },
      { filter: "", expected: null },
      { filter: 0, expected: "0" },
      { filter: -4, expected: "-4" },
      { filter: 5.5, expected: "5.5" },
      { filter: true, expected: "true" },
      { filter: false, expected: "false" },
      { filter: {}, expected: "[object Object]" },
      { filter: 5, expected: "5" },
      { filter: "field", expected: "field" },
    ];

    arrange.forEach((i) => {
      expect(new SearchParams({ filter: i.filter } as any).filter).toBe(
        i.expected
      );
    });
  });
});

describe("SearchResult Unit Test", () => {
  test("constructor props", () => {
    let resultParams = {
      items: ["entity1", "entity2"] as any,
      total: 4,
      current_page: 1,
      per_page: 2,
      sort: null as string,
      sort_dir: null as string,
      filter: null as string,
    };
    let result = new SearchResult(resultParams);
    expect(result.toJSON()).toStrictEqual({
      ...resultParams,
      last_page: 2,
    });

    resultParams = {
      items: ["entity1", "entity2"] as any,
      total: 4,
      current_page: 1,
      per_page: 2,
      sort: "name",
      sort_dir: "asc",
      filter: "test",
    };
    result = new SearchResult(resultParams);
    expect(result.toJSON()).toStrictEqual({
      ...resultParams,
      last_page: 2,
    });
  });

  it("should set last_page 1 when per_page field is greater than total field", () => {
    const resultParams = {
      items: ["entity1", "entity2"] as any,
      total: 4,
      current_page: 1,
      per_page: 15,
      sort: "name",
      sort_dir: "asc",
      filter: "test",
    };
    const result = new SearchResult(resultParams);
    expect(result.last_page).toBe(1);
  });

  it("should round up last_page when needed", () => {
    const resultParams = {
      items: ["entity1", "entity2"] as any,
      total: 101,
      current_page: 1,
      per_page: 20,
      sort: "name",
      sort_dir: "asc",
      filter: "test",
    };
    const result = new SearchResult(resultParams);
    expect(result.last_page).toBe(6);
  });
});
