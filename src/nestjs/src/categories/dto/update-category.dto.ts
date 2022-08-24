import { UpdateCategoryUseCase } from 'core/category/application';

export class UpdateCategoryDto
  implements Omit<UpdateCategoryUseCase.Input, 'id'>
{
  name: string;
  description?: string;
  is_active?: boolean;
}
