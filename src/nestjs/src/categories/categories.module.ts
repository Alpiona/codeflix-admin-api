import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import {CategoryInMemoryRepository} from 'core/category/infra'
import CategoryRepository from 'core/dist/category/domain/repository/category.repository';
import {CreateCategoryUseCase, DeleteCategoryUseCase, GetCategoryUseCase, ListCategoriesUseCase, UpdateCategoryUseCase} from 'core/category/application'

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, 
    {
    provide: 'CategoryRepository', useClass: CategoryInMemoryRepository,
    },
    {
      provide: CreateCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository)=> {
        return new CreateCategoryUseCase.UseCase(categoryRepo)
      },
      inject: ['CategoryRepository']
    },
    {
      provide: DeleteCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository)=> {
        return new DeleteCategoryUseCase.UseCase(categoryRepo)
      },
      inject: ['CategoryRepository']
    },
    {
      provide: GetCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository)=> {
        return new GetCategoryUseCase.UseCase(categoryRepo)
      },
      inject: ['CategoryRepository']
    },
    {
      provide: ListCategoriesUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository)=> {
        return new ListCategoriesUseCase.UseCase(categoryRepo)
      },
      inject: ['CategoryRepository']
    },
    {
      provide: UpdateCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository)=> {
        return new UpdateCategoryUseCase.UseCase(categoryRepo)
      },
      inject: ['CategoryRepository']
    },
]
})
export class CategoriesModule {}
