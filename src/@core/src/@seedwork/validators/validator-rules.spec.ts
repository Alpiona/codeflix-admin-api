import ValidationError from "../errors/validation-error";
import { ValidatorRules } from "./validator-rules";

type Value = {
  value: any;
  property: string;
  params?: any;
};

type ExpectedValidation = Value & {
  rule: keyof ValidatorRules;
  error?: ValidationError;
};

function assertIsValid(expected: Omit<ExpectedValidation, "error">) {
  expect(() => {
    runRule(expected);
  }).not.toThrow(Error);
}

function assertIsInvalid(expected: ExpectedValidation) {
  expect(() => {
    runRule(expected);
  }).toThrow(expected.error);
}

function runRule(expected: Omit<ExpectedValidation, "error">) {
  const validator = ValidatorRules.values(expected.value, expected.property);
  const method = validator[expected.rule];
  method.apply(validator, expected.params);
}

describe("ValidatorRules Unit Tests", () => {
  test("values method", () => {
    const validator = ValidatorRules.values("some value", "field");
    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator["value"]).toBe("some value");
    expect(validator["property"]).toBe("field");
  });

  test("required validation rule", () => {
    let arrange: Value[] = [
      { value: null, property: "field" },
      { value: undefined, property: "field" },
      { value: "", property: "field" },
    ];

    const error = new ValidationError("The field is required");

    arrange.forEach((i) => {
      assertIsInvalid({
        value: i.value,
        property: i.property,
        rule: "required",
        error,
      });
    });

    arrange = [
      { value: "test", property: "field" },
      { value: 5, property: "field" },
      { value: 0, property: "field" },
      { value: false, property: "field" },
    ];

    arrange.forEach((i) => {
      assertIsValid({
        value: i.value,
        property: i.property,
        rule: "required",
      });
    });
  });

  test("maxLength validation rule", () => {
    let arrange: Value[] = [
      { value: "absertyas", property: "field", params: [5] },
    ];

    const maxLength = 5;
    const error = new ValidationError(
      `The field must have less or equal ${maxLength} characteres`
    );

    arrange.forEach((i) => {
      assertIsInvalid({
        value: i.value,
        property: i.property,
        params: i.params,
        rule: "maxLength",
        error,
      });
    });

    arrange = [
      { value: "test", property: "field", params: [5] },
      { value: null, property: "field", params: [5] },
      { value: undefined, property: "field", params: [5] },
    ];

    arrange.forEach((i) => {
      assertIsValid({
        value: i.value,
        property: i.property,
        params: i.params,
        rule: "maxLength",
      });
    });
  });

  test("string validation rule", () => {
    let arrange: Value[] = [
      { value: 5, property: "field" },
      { value: {}, property: "field" },
      { value: false, property: "field" },
    ];

    const error = new ValidationError("The field must be string");

    arrange.forEach((i) => {
      assertIsInvalid({
        value: i.value,
        property: i.property,
        rule: "string",
        error,
      });
    });

    arrange = [
      { value: "test", property: "field" },
      { value: null, property: "field" },
      { value: undefined, property: "field" },
    ];

    arrange.forEach((i) => {
      assertIsValid({
        value: i.value,
        property: i.property,
        rule: "string",
      });
    });
  });

  test("boolean validation rule", () => {
    let arrange: Value[] = [
      { value: 5, property: "field" },
      { value: {}, property: "field" },
      { value: "true", property: "field" },
    ];

    const error = new ValidationError("The field must be boolean");

    arrange.forEach((i) => {
      assertIsInvalid({
        value: i.value,
        property: i.property,
        rule: "boolean",
        error,
      });
    });

    arrange = [
      { value: true, property: "field" },
      { value: false, property: "field" },
      { value: undefined, property: "field" },
      { value: null, property: "field" },
    ];

    arrange.forEach((i) => {
      assertIsValid({
        value: i.value,
        property: i.property,
        rule: "boolean",
      });
    });
  });

  it("should throw validate errors when combining two or more rules", () => {
    let validator = ValidatorRules.values(null, "field");
    expect(() => validator.required().string()).toThrow(
      new ValidationError("The field is required")
    );

    validator = ValidatorRules.values(5, "field");
    expect(() => validator.required().string()).toThrow(
      new ValidationError("The field must be string")
    );

    validator = ValidatorRules.values("test", "field");
    expect(() => validator.required().string().maxLength(3)).toThrow(
      new ValidationError("The field must have less or equal 3 characteres")
    );

    validator = ValidatorRules.values("true", "field");
    expect(() => validator.required().boolean()).toThrow(
      new ValidationError("The field must be boolean")
    );

    validator = ValidatorRules.values(undefined, "field");
    expect(() => validator.required().boolean()).toThrow(
      new ValidationError("The field is required")
    );
  });

  it("should validate when combining two or more rules", () => {
    let validator = ValidatorRules.values(null, "field");
    expect(() => validator.string().maxLength(5)).not.toThrow(Error);

    validator = ValidatorRules.values(undefined, "field");
    expect(() => validator.string().maxLength(5)).not.toThrow(Error);

    validator = ValidatorRules.values("test", "field");
    expect(() => validator.string().maxLength(5)).not.toThrow(Error);

    validator = ValidatorRules.values("test", "field");
    expect(() => validator.required().string().maxLength(5)).not.toThrow(Error);

    validator = ValidatorRules.values(false, "field");
    expect(() => validator.required().boolean()).not.toThrow(Error);
  });
});
