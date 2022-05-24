import { CategoryRepository } from '#category/domain';
import { default as DefaultUseCase } from "#seedwork/application/use-case";
import { CategoryOutput, CategoryOutputMapper } from '../dto';

export namespace UpdateCategoryUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private categoryRepo: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.categoryRepo.findById(input.id);
      entity.update(input.name, input.description);

      if (input.is_active === true) {
        entity.activate();
      } else if (input.is_active === false) {
        entity.deactivate();
      }

      await this.categoryRepo.update(entity);

      return CategoryOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    id: string;
    name: string;
    description?: string;
    is_active?: boolean;
  };

  export type Output = CategoryOutput;
}

export default UpdateCategoryUseCase;
