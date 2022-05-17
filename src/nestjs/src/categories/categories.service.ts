import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryUseCase, ListCategoriesUseCase } from 'core/category/application';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  @Inject(CreateCategoryUseCase.UseCase)
  private createUseCase: CreateCategoryUseCase.UseCase
  @Inject(ListCategoriesUseCase.UseCase)
  private listUseCase: ListCategoriesUseCase.UseCase
  
  create(createCategoryDto: CreateCategoryUseCase.Input) {
    return this.createUseCase.execute(createCategoryDto)
  }

  findAll() {
    return this.listUseCase.execute({})
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
