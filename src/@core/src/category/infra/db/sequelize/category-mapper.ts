import {CategoryModel} from './category-model';
import {Category } from "#category/domain";
import { UniqueEntityId } from '#seedwork/domain';


export class CategoryModelMapper {
  static toEntity(model: CategoryModel){
    const {id, ...otherData} = model.toJSON();
    return new Category(otherData, new UniqueEntityId(id));
  }
}