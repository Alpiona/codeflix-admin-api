import {
  Entity,
  EntityValidationError,
  UniqueEntityId,
} from "#seedwork/domain";
import CategoryValidatorFactory from "../validators/category.validator";
import { CategoryFakeBuilder } from "./category-fake-builder";

export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export class Category extends Entity<CategoryProperties> {
  constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
    Category.validate(props);
    super(props, id);
    this.description = this.props.description;
    this.is_active = this.props.is_active;
    this.created_at = this.props.created_at ?? new Date();
  }

  update(name: string, description: string) {
    Category.validate({ name, description });
    this.name = name;
    this.description = description;
  }

  // static validate(props: Omit<CategoryProperties, "created_at">) {
  //   ValidatorRules.values(props.name, "name").required().string();
  //   ValidatorRules.values(props.description, "description").string();
  //   ValidatorRules.values(props.is_active, "is_active").boolean();
  // }

  static validate(props: CategoryProperties) {
    const validator = CategoryValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  activate() {
    this.props.is_active = true;
  }

  deactivate() {
    this.props.is_active = false;
  }

  get name() {
    return this.props.name;
  }

  private set name(value) {
    this.props.name = value;
  }

  get description() {
    return this.props.description;
  }

  private set description(value) {
    this.props.description = value ?? null;
  }

  get is_active() {
    return this.props.is_active;
  }

  private set is_active(value) {
    this.props.is_active = value ?? true;
  }

  get created_at() {
    return this.props.created_at;
  }

  private set created_at(value) {
    this.props.created_at = value;
  }

  static fake(){
    return CategoryFakeBuilder
  }
}

export default Category;
