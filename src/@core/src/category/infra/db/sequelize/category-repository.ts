import { NotFoundError, UniqueEntityId } from "#seedwork/domain";
import { CategoryRepository, Category } from "#category/domain";
import { CategoryModel } from './category-model';
import { CategoryModelMapper } from './category-mapper';

export class CategorySequelizeRepository implements CategoryRepository.Repository {
  constructor(private categoryModel: typeof CategoryModel) {}

  async insert(entity: Category): Promise<void> {
    await this.categoryModel.create(entity.toJSON())
  }

  async findById(id: string | UniqueEntityId): Promise<Category> {
    const _id = `${id}`
    const model = await this._get(_id)
    return CategoryModelMapper.toEntity(model)
  }
  
  async findAll(): Promise<Category[]> {
    return [];
  }

  async update(entity: Category): Promise<void> {}
  
  async delete(id: string | UniqueEntityId): Promise<void> {}
  
  sortableFields: string[] = ['name', 'created_at'];

  private async _get(id: string){
    return await this.categoryModel.findByPk(id, {rejectOnEmpty: new NotFoundError(`Category not found with ID ${id}`)})
  }

  async search(
    props: CategoryRepository.SearchParams
  ): Promise<CategoryRepository.SearchResult> {
    return 
  }
}
