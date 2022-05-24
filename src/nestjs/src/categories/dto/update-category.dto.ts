import { UpdateCategoryUseCase } from 'core/category/application';

export class UpdateCategoryDto implements UpdateCategoryUseCase.Input {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
}
