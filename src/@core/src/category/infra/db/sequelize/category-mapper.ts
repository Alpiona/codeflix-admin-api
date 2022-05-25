import {CategoryModel} from './category-model';
import {Category } from "#category/domain";
import { EntityValidationError, LoadEntityError, UniqueEntityId } from '#seedwork/domain';


export class CategoryModelMapper {
  static toEntity(model: CategoryModel){
    const {id, ...otherData} = model.toJSON();
    try{
      return new Category(otherData, new UniqueEntityId(id));
    } catch (e){
      if(e instanceof EntityValidationError){
        throw new LoadEntityError(e.error);
      }

      throw e;
    }
  }
}